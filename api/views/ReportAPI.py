import os
import subprocess
import datetime
from tempfile import TemporaryDirectory
from io import BytesIO
from django.http import HttpResponse
from openpyxl import load_workbook
from openpyxl.styles import Font, NamedStyle
from django.core.cache import cache
from rest_framework.views import APIView
from datetime import datetime, timedelta
from api.models import *
from message.models import *
from api.utils.UUIDGen import *
from django.core.files.base import ContentFile


def save_file(file, file_name):
    file_content = file.read()
    document = Document.objects.create(
        did=gen_uuid("DID"),
        name=file_name,
        file=ContentFile(file_content, name=file_name),
    )
    document.save()


def generate_response(workbook, report_name, file_format):
    # Create a temporary directory
    with TemporaryDirectory() as tmp_dir:
        # Save the workbook to a temporary file
        file_name = f"{report_name} {datetime.now().strftime('%Y-%m-%d_%H-%M')}.{file_format.lower()}"
        tmp_file_path = os.path.join(tmp_dir, file_name)
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
            save_file(output_file, file_name)

            output_file.seek(0)
            response = HttpResponse(
                output_file.read(),
                content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' if file_format.lower() == "xlsx" else 'application/pdf'
            )
            response[
                'Content-Disposition'] = f"attachment; filename={file_name}"

    return response


class CentralPostingView(APIView):
    def post(self, request, format=None):
        # Get data and template workbook
        report_data = request.data.get("reportData")
        file_format = request.data.get("format")
        workbook_bytes = cache.get('central_posting_template')
        buffer = BytesIO(workbook_bytes)
        workbook = load_workbook(buffer)

        self.fill_data(workbook, report_data)
        response = generate_response(workbook, "Central Posting", file_format)
        return response

    def fill_data(self, workbook, report_data):
        sheet = workbook["Central Posting"]
        arial_8_font = Font(name='Arial', size=8)
        record_row = 5

        if report_data:
            user = UserProfile.objects.get(uid=report_data[0]["user"])
            business_name = user.business_name
            address = ' '.join(filter(None, [user.address_line1, user.address_line2]))

            sheet['C2'].value = business_name
            sheet['F2'].value = address

        for each_record in report_data:
            site_list = each_record["site"].split(" - ")
            for col, value in zip(['A', 'B', 'C', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'],
                                  [site_list[0], site_list[1], site_list[2],
                                   each_record["trade_name"],
                                   each_record["active_ingredient"],
                                   each_record["epa_reg_no"],
                                   each_record["start_datetime"].split(" ")[0],
                                   each_record["start_datetime"],
                                   each_record["finish_datetime"],
                                   each_record["rei"],
                                   (datetime.strptime(each_record["finish_datetime"], "%Y-%m-%d %H:%M") + timedelta(
                                       hours=int(each_record["rei"]))).strftime('%Y-%m-%d'),
                                   (datetime.strptime(each_record["finish_datetime"], "%Y-%m-%d %H:%M") + timedelta(
                                       hours=int(each_record["rei"]))).strftime('%H:%M')]):
                cell = sheet[f'{col}{record_row}']
                cell.value = value
                cell.font = arial_8_font

            record_row += 1

        worksheet = workbook.active
        worksheet.page_setup.scale = 60
