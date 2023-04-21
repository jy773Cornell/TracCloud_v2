import os
import subprocess
from tempfile import TemporaryDirectory
from io import BytesIO
from django.http import HttpResponse
from openpyxl import load_workbook
from django.core.cache import cache
from rest_framework.views import APIView


class CentralPostingView(APIView):
    def post(self, request, format=None):
        # Get data and template workbook
        report_data = request.data.get("reportData")
        file_format = request.data.get("format")
        workbook_bytes = cache.get('central_posting_template')
        buffer = BytesIO(workbook_bytes)
        workbook = load_workbook(buffer)

        self.fill_data(workbook, report_data)
        response = self.generate_response(workbook, file_format)
        return response

    def fill_data(self, workbook, report_data):
        # Fill in data
        sheet = workbook["Central Posting"]
        sheet['A5'] = "Hello"
        record_row = 5
        for each_record in report_data:
            pass


    def generate_response(self, workbook, file_format):
        # Create a temporary directory
        with TemporaryDirectory() as tmp_dir:
            # Save the workbook to a temporary file
            tmp_file_name = 'temp.xlsx'
            tmp_file_path = os.path.join(tmp_dir, tmp_file_name)
            workbook.save(tmp_file_path)

            if file_format == "pdf":
                # Use unoconv to convert the file to the requested format
                output_file_path = os.path.join(tmp_dir, "temp.pdf")
                command = ['unoconv', '-f', 'pdf', tmp_file_path]
                subprocess.run(command, check=True, env=os.environ.copy())
            else:
                output_file_path = tmp_file_path

            # Read the converted file and create the response
            if not os.path.exists(output_file_path):
                raise FileNotFoundError(f"Output file not created: {output_file_path}")

            with open(output_file_path, 'rb') as output_file:
                if file_format.lower() == 'xlsx':
                    response = HttpResponse(
                        output_file.read(),
                        content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    )
                    response['Content-Disposition'] = 'attachment; filename="template_with_data.xlsx"'
                else:
                    response = HttpResponse(
                        output_file.read(),
                        content_type='application/pdf'
                    )
                    response['Content-Disposition'] = 'attachment; filename="template_with_data.pdf"'

        return response
