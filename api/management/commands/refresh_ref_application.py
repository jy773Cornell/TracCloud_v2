from django.core.management.base import BaseCommand
from api.reference_data.refresh_ref_application import refresh_ref_application


class Command(BaseCommand):
    help = 'Refresh the reference data for Crop entity'

    def handle(self, *args, **options):
        refresh_ref_application()
        self.stdout.write(self.style.SUCCESS('Application reference data refreshed'))
