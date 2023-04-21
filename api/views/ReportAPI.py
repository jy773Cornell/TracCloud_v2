import os
import subprocess
from tempfile import NamedTemporaryFile
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
        sheet['A1'] = "Hello"
        sheet['B1'] = "World"
        sheet['C1'] = "Test"

    def generate_response(self, workbook, file_format):
        # Save the workbook to a temporary file
        with NamedTemporaryFile(suffix='.xlsx', delete=False) as tmp_file:
            workbook.save(tmp_file.name)
            tmp_file_path = tmp_file.name

        # Use unoconv to convert the file to the requested format
        output_file_path = tmp_file_path + ('.pdf' if file_format.lower() != 'xlsx' else '')
        unoconv_cmd = f"unoconv -f {file_format} -o {output_file_path} {tmp_file_path}"
        print(unoconv_cmd)
        subprocess.run(unoconv_cmd, shell=True, check=True)

        # Read the converted file and create the response
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

        # Clean up temporary files
        os.remove(tmp_file_path)
        os.remove(output_file_path)

        return response
