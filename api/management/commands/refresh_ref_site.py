from django.core.management.base import BaseCommand
from api.reference_data.refresh_ref_site import refresh_ref_site


class Command(BaseCommand):
    help = 'Refresh the reference data for Crop entity'

    def handle(self, *args, **options):
        refresh_ref_site()
        self.stdout.write(self.style.SUCCESS('Crop reference data refreshed'))
