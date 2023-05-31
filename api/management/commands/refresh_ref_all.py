from django.core.management.base import BaseCommand
from api.reference_data.refresh_ref_application import refresh_ref_application
from api.reference_data.refresh_ref_chemical_product_base import refresh_ref_chemical_product_base
from api.reference_data.refresh_ref_crop import refresh_ref_crop
from api.reference_data.refresh_ref_site import refresh_ref_site
from api.reference_data.refresh_ref_unit import refresh_ref_unit


class Command(BaseCommand):
    help = 'Refresh all the reference data for Trac Cloud'

    def handle(self, *args, **options):
        refresh_ref_crop()
        refresh_ref_unit()
        refresh_ref_site()
        refresh_ref_application()
        refresh_ref_chemical_product_base()
        self.stdout.write(self.style.SUCCESS('All reference data refreshed'))
