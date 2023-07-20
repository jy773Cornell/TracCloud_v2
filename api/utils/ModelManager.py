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

        related_fields = [
            'requester_user', 'provider_user',
            'equip_user', 'crop_user', 'site_user', 'chem_user',
            'site_crop', 'site_site',
            'op_user',
            'pr_user', 'pr_op',
            'hr_user', 'hr_op',
            'ar_user', 'ar_op',
            'pr_chem',
            'hr_crop', 'hr_site',
            'ar_crop', 'ar_site', 'ar_purchase', 'ar_equipment', 'ar_applicator_user',
            'ar_responsible_user'
        ]

        # Update each related model
        for obj in self:
            for field in related_fields:
                if hasattr(obj, field):
                    getattr(obj, field).all().update(is_active=False)

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
