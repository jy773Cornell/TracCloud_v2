from django.core.management.base import BaseCommand
from api.reference_data.ref_data_cache_manage import preload_ref_data


class Command(BaseCommand):
    help = 'Initializes the cache with data from the models'

    def handle(self, *args, **options):
        preload_ref_data()
        self.stdout.write(self.style.SUCCESS('Reference data preloaded into cache'))
