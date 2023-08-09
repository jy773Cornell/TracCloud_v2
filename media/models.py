from django.db import models
from api.models import *
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
from django.conf import settings


class Report(models.Model):
    rid = models.CharField(verbose_name="RID", primary_key=True, max_length=48)
    user = models.ForeignKey(UserProfile, verbose_name="User", to_field="uid", related_name="document_user",
                             on_delete=models.CASCADE)
    author = models.ForeignKey(UserProfile, verbose_name="Author", to_field="uid", related_name="document_author_user",
                               null=True, blank=True, on_delete=models.SET_NULL)
    name = models.CharField(verbose_name="File Name", max_length=256)
    file = models.FileField(upload_to='reports/')
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now_add=True)

    def delete_blob(self):
        # Initialize BlobServiceClient using your connection string.
        blob_service_client = BlobServiceClient.from_connection_string(settings.AZURE_CONNECTION_STRING)

        # Create a blob client using the name of the blob (file) to be deleted.
        blob_client = blob_service_client.get_blob_client(container=settings.MEDIA_LOCATION, blob=self.file.name)

        # Delete the blob.
        blob_client.delete_blob()

    def delete(self, *args, **kwargs):
        self.delete_blob()  # Delete blob from Azure
        super(Report, self).delete(*args, **kwargs)  # Continue with default delete process
