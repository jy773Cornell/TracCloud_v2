from django.db import models
from django.db.models.manager import BaseManager
from .UUIDGen import gen_uuid


class MyQuerySet(models.query.QuerySet):

    # Override the delete method to a logic deletion,
    # which only sets invalid status instead of deleting data form database

    def delete(self):
        del_query = self._chain()
        del_query.update(is_active=False)


class MyModelManager(BaseManager.from_queryset(MyQuerySet)):
    prefix = ""

    def prefix(self, prefix):
        self.prefix = prefix

    def create(self, **obj_data):
        
        # Create UUID with prefix as the primary key

        obj_data[self.prefix.lower()] = gen_uuid(self.prefix)

        # Call the super method which does the actual creation

        return super().create(**obj_data)
