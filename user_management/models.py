from django.db import models
from django.contrib.auth.models import User
from api.models import UserProfile


class UserPrivilege(models.Model):
    uroid = models.CharField(verbose_name="UROID", primary_key=True, max_length=48)
    user = models.ForeignKey(UserProfile, verbose_name="User", to_field="uid", related_name="role_user",
                             on_delete=models.CASCADE)

    # Business Management Privileges

    employee_c = models.BooleanField(verbose_name="Employee Create", default=False)
    employee_r = models.BooleanField(verbose_name="Employee Read", default=False)
    employee_d = models.BooleanField(verbose_name="Employee Delete", default=False)
    client_add = models.BooleanField(verbose_name="Client Add", default=False)
    client_r = models.BooleanField(verbose_name="Client Read", default=False)
    client_d = models.BooleanField(verbose_name="Client Delete", default=False)
    privilege_set = models.BooleanField(verbose_name="Privilege Set", default=False)

    # Business Data Privileges

    crop_c = models.BooleanField(verbose_name="Crop Create", default=False)
    crop_r = models.BooleanField(verbose_name="Crop Read", default=False)
    crop_u = models.BooleanField(verbose_name="Crop Update", default=False)
    crop_d = models.BooleanField(verbose_name="Crop Delete", default=False)

    site_c = models.BooleanField(verbose_name="Site Create", default=False)
    site_r = models.BooleanField(verbose_name="Site Read", default=False)
    site_u = models.BooleanField(verbose_name="Site Update", default=False)
    site_d = models.BooleanField(verbose_name="Site Delete", default=False)

    chem_c = models.BooleanField(verbose_name="ChemTable Create", default=False)
    chem_r = models.BooleanField(verbose_name="ChemTable Read", default=False)
    chem_u = models.BooleanField(verbose_name="ChemTable Update", default=False)
    chem_d = models.BooleanField(verbose_name="ChemTable Delete", default=False)

    purchase_c = models.BooleanField(verbose_name="Purchase Create", default=False)
    purchase_r = models.BooleanField(verbose_name="Purchase Read", default=False)
    purchase_u = models.BooleanField(verbose_name="Purchase Update", default=False)
    purchase_d = models.BooleanField(verbose_name="Purchase Delete", default=False)

    equip_c = models.BooleanField(verbose_name="Equipment Create", default=False)
    equip_r = models.BooleanField(verbose_name="Equipment Read", default=False)
    equip_u = models.BooleanField(verbose_name="Equipment Update", default=False)
    equip_d = models.BooleanField(verbose_name="Equipment Delete", default=False)

    spray_r = models.BooleanField(verbose_name="Spray Data Read", default=False)

    spraycard_c = models.BooleanField(verbose_name="Spray Card Create", default=False)
    spraycard_a = models.BooleanField(verbose_name="Spray Card Assign", default=False)

    update_time = models.DateTimeField(verbose_name="Update Time", auto_now=True)


full_privileges = {
    # Business Management Privileges
    "employee_c": True,
    "employee_r": True,
    "employee_d": True,
    "client_add": True,
    "client_r": True,
    "client_d": True,
    "privilege_set": True,

    # Business Data Privileges
    "crop_c": True,
    "crop_r": True,
    "crop_u": True,
    "crop_d": True,

    "site_c": True,
    "site_r": True,
    "site_u": True,
    "site_d": True,

    "chem_c": True,
    "chem_r": True,
    "chem_u": True,
    "chem_d": True,

    "purchase_c": True,
    "purchase_r": True,
    "purchase_u": True,
    "purchase_d": True,

    "equip_c": True,
    "equip_r": True,
    "equip_u": True,
    "equip_d": True,

    "spray_r": True,

    "spraycard_c": True,
    "spraycard_a": True,
}

applicator_privileges = {
    # Business Management Privileges
    "employee_c": False,
    "employee_r": True,
    "employee_d": True,
    "client_add": False,
    "client_r": True,
    "client_d": True,
    "privilege_set": False,

    # Business Data Privileges
    "crop_c": False,
    "crop_r": True,
    "crop_u": False,
    "crop_d": False,

    "site_c": False,
    "site_r": True,
    "site_u": False,
    "site_d": False,

    "chem_c": False,
    "chem_r": True,
    "chem_u": False,
    "chem_d": False,

    "purchase_c": False,
    "purchase_r": True,
    "purchase_u": False,
    "purchase_d": False,

    "equip_c": False,
    "equip_r": True,
    "equip_u": False,
    "equip_d": False,

    "spray_r": True,

    "spraycard_c": False,
    "spraycard_a": False,
}
