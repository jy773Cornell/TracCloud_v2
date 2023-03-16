import django.http
from django.db import models
from django.utils import timezone


def model_delete(query_object):
    query_object.update(is_active=False)


def request_data_transform(model_dic):
    if type(model_dic) == django.http.request.QueryDict:
        model_dic = dict(model_dic.copy())
        model_dic = {key: value[0] for key, value in model_dic.items() if value[0] != ""}
        if "csrfmiddlewaretoken" in model_dic:
            model_dic.pop("csrfmiddlewaretoken")

    return model_dic


class MyModelQuerySet(models.QuerySet):
    def update(self, **kwargs):
        kwargs['update_time'] = timezone.now()
        super().update(**kwargs)

    def delete(self):
        self.update(is_active=False)

    def hard_delete(self):
        super(MyModelQuerySet, self).delete()

    def alive(self):
        return self.filter(is_active=True)

    def dead(self):
        return self.filter(is_active=False)


class MyModelManager(models.Manager):
    def get_queryset(self):
        return MyModelQuerySet(self.model, using=self._db)
