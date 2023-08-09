from media.serializers.ReportSerializer import *
from media.views.ReportGenerators import *
from azure.storage.blob import BlobServiceClient
from django.conf import settings


class ReportListGetView(APIView):
    serializer_class = ReportGetSerializer
    lookup_url_kwarg = "employer_id"

    def get(self, request, format=None):
        employer_id = request.GET.get(self.lookup_url_kwarg)

        if employer_id:
            reports = Report.objects.filter(user_id=employer_id).order_by('-create_time')
            data = [self.serializer_class(report).data for report in reports]
            return Response({'Succeeded': 'Report List Fetched.', 'data': data},
                            status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid GET parameter'}, status=status.HTTP_400_BAD_REQUEST)


class ReportDownloadView(APIView):
    serializer_class = ReportGetSerializer

    def post(self, request, format=None):
        user_id = request.data.get("user_id")
        rid = request.data.get("rid")

        if user_id and rid:
            try:
                report = Report.objects.get(rid=rid, user_id=user_id)

                # Create a blob client using the blob's name.
                blob_service_client = BlobServiceClient.from_connection_string(settings.AZURE_CONNECTION_STRING)
                blob_client = blob_service_client.get_blob_client(container=settings.MEDIA_LOCATION,
                                                                  blob=report.file.name)

                # Download the blob content as bytes
                blob_data = blob_client.download_blob()
                file_content = blob_data.readall()
                content_type = 'application/octet-stream'

                response = HttpResponse(file_content, content_type=content_type)
                response['Content-Disposition'] = f'attachment; filename="{report.name}"'

                return response

            except Report.DoesNotExist:
                return Response({"error": "Report not found"}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid POST parameters'}, status=status.HTTP_400_BAD_REQUEST)


class ReportDeleteView(APIView):
    serializer_class = ReportGetSerializer

    def post(self, request, format=None):
        user_id = request.data.get("user_id")
        rid = request.data.get("rid")

        if user_id and rid:
            try:
                report = Report.objects.get(rid=rid, user_id=user_id)
                report.delete()
                return Response({'Succeeded': 'Report Deleted.'}, status=status.HTTP_200_OK)

            except Report.DoesNotExist:
                return Response({"error": "Report not found"}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid POST parameters'}, status=status.HTTP_400_BAD_REQUEST)
