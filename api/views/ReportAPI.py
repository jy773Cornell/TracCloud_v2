from rest_framework.views import APIView
from django.http import HttpResponse


class CentralPostingView(APIView):
    def get(self, request, format=None):
        template_path = 'api/static/ReportTemplates/CentralPosting-template.xlsx'

        with open(template_path, 'rb') as f:
            template_data = f.read()

        response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        response['Content-Disposition'] = 'attachment; filename="template.xlsx"'
        response.write(template_data)

        return response
