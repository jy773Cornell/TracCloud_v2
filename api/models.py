from django.db import models

'''
User Entity 
'''


class User(models.Model):
    uid = models.CharField(verbose_name="UID", primary_key=True, max_length=48)
    username = models.CharField(verbose_name="Username", unique=True, max_length=64)
    password = models.CharField(verbose_name="Password", max_length=128)
    type = models.ForeignKey(verbose_name="User Type", to="UserType", to_field="utid", related_name="user_type",
                             null=True, blank=True, on_delete=models.SET_NULL)

    name = models.CharField(verbose_name="Actual Name", null=True, blank=True, max_length=64)
    business_name = models.CharField(verbose_name="Business Name", null=True, blank=True, max_length=256)
    registration_no = models.CharField(verbose_name="Registration No.", null=True, blank=True, max_length=128)
    reg_expire_date = models.DateField(verbose_name="Registration Expire Date", null=True, blank=True)
    address = models.CharField(verbose_name="Address", null=True, blank=True, max_length=256)
    city = models.CharField(verbose_name="City", null=True, blank=True, max_length=64)
    county = models.CharField(verbose_name="County", null=True, blank=True, max_length=64)
    state = models.CharField(verbose_name="State", null=True, blank=True, max_length=64)
    zipcode = models.CharField(verbose_name="Zip Code", null=True, blank=True, max_length=16)
    country = models.CharField(verbose_name="Country", null=True, blank=True, max_length=64)
    phone = models.CharField(verbose_name="Phone Number", null=True, blank=True, max_length=16)
    cell = models.CharField(verbose_name="Cell Number", null=True, blank=True, max_length=32)
    email = models.EmailField(verbose_name="Email", null=True, blank=True)

    added_by = models.ForeignKey(verbose_name="Added By", to="User", to_field="uid", related_name="user_added_by",
                                 null=True, blank=True, on_delete=models.SET_NULL)
    self_activated = models.BooleanField(verbose_name="Self Activated", default=False)
    is_active = models.BooleanField(verbose_name="Is Active", default=False)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now=True)

    def __str__(self):
        return "{} ({})".format(self.username, self.type)


class UserType(models.Model):
    utid = models.CharField(verbose_name="UTID", primary_key=True, max_length=48)
    name = models.CharField(verbose_name="Type Name", unique=True, max_length=128)
    note = models.TextField(verbose_name="Note", null=True, blank=True)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now=True)

    def __str__(self):
        return self.name


class UserRelation(models.Model):
    urid = models.CharField(verbose_name="URID", primary_key=True, max_length=48)
    requester = models.ForeignKey(verbose_name="Requester", to="User", to_field="uid", related_name="requester_user",
                                  null=True, blank=True, on_delete=models.SET_NULL)
    provider = models.ForeignKey(verbose_name="Provider", to="User", to_field="uid", related_name="provider_user",
                                 null=True, blank=True, on_delete=models.SET_NULL)
    type = models.ForeignKey(verbose_name="Relation Type", to="UserRelationType", to_field="urtid",
                             related_name="relationtype", null=True, blank=True, on_delete=models.SET_NULL)
    added_by = models.ForeignKey(verbose_name="Added By", to="User", to_field="uid", related_name="relation_added_by",
                                 null=True, blank=True, on_delete=models.SET_NULL)
    is_resolved = models.BooleanField(verbose_name="Is Resolved", default=False)
    is_active = models.BooleanField(verbose_name="Is Active", default=False)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now=True)

    def __str__(self):
        return "Relation: {}, Requester: {}, Provider: {}".format(self.type, self.requester, self.provider)


class UserRelationType(models.Model):
    urtid = models.CharField(verbose_name="URTID", primary_key=True, max_length=48)
    name = models.CharField(verbose_name="Type Name", unique=True, max_length=128)
    note = models.TextField(verbose_name="Note", null=True, blank=True)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now=True)

    def __str__(self):
        return self.name


'''
Equipment Entity 
'''


class Equipment(models.Model):
    eid = models.CharField(verbose_name="EID", primary_key=True, max_length=48)
    user = models.ForeignKey(verbose_name="User", to="User", to_field="uid", related_name="equip_user",
                             null=True, blank=True, on_delete=models.SET_NULL)
    name = models.CharField(verbose_name="Equipment Name", max_length=64)
    type = models.ForeignKey(verbose_name="Type", to="EquipmentType", to_field="etid",
                             related_name="equip_type", null=True, blank=True, on_delete=models.SET_NULL)
    owner = models.ForeignKey(verbose_name="Owner", to="User", to_field="uid", related_name="owner_user",
                              null=True, blank=True, on_delete=models.SET_NULL)
    code = models.CharField(verbose_name="Code", null=True, blank=True, max_length=64)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now=True)

    def __str__(self):
        return self.name


class EquipmentType(models.Model):
    etid = models.CharField(verbose_name="ETID", primary_key=True, max_length=48)
    name = models.CharField(verbose_name="Type Name", max_length=32)
    note = models.TextField(verbose_name="Note", null=True, blank=True)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now=True)

    def __str__(self):
        return self.name


'''
Crop Entity
'''


class Crop(models.Model):
    cid = models.CharField(verbose_name="CID", primary_key=True, max_length=48)
    user = models.ForeignKey(verbose_name="User", to="User", to_field="uid", related_name="crop_user",
                             null=True, blank=True, on_delete=models.SET_NULL)
    crop = models.ForeignKey(verbose_name="Crop Name", to="CropCategory", to_field="ccid",
                             related_name="crop_category", null=True, blank=True, on_delete=models.SET_NULL)
    variety = models.ForeignKey(verbose_name="Variety", to="CropVariety", to_field="cvid",
                                related_name="crop_variety", null=True, blank=True, on_delete=models.SET_NULL)
    growth_stage = models.ForeignKey(verbose_name="Grow Stage", to="CropGrowthStage", to_field="cgsid",
                                     related_name="crop_growth_stage", null=True, blank=True, on_delete=models.SET_NULL)

    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now=True)

    def __str__(self):
        return "{}: {}".format(self.crop, self.variety)


class CropCategory(models.Model):
    ccid = models.CharField(verbose_name="CCID", primary_key=True, max_length=48)
    name = models.CharField(verbose_name="Crop Name", max_length=128)
    crop_code = models.CharField(verbose_name="Crop Code", max_length=16)
    category = models.CharField(verbose_name="Category Name", max_length=128)
    note = models.TextField(verbose_name="Note", null=True, blank=True)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now=True)

    def __str__(self):
        return self.name


class CropVariety(models.Model):
    cvid = models.CharField(verbose_name="CVID", primary_key=True, max_length=48)
    name = models.CharField(verbose_name="Crop Variety", max_length=128)
    crop = models.ForeignKey(verbose_name="Category", to="CropCategory", to_field="ccid",
                             related_name="variety_category", null=True, blank=True, on_delete=models.SET_NULL)
    note = models.TextField(verbose_name="Note", null=True, blank=True)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now=True)

    def __str__(self):
        return self.name


class CropGrowthStage(models.Model):
    cgsid = models.CharField(verbose_name="CGSID", primary_key=True, max_length=48)
    name = models.CharField(verbose_name="Stage Name", max_length=128)
    crop = models.ForeignKey(verbose_name="Crop Name", to="CropCategory", to_field="ccid",
                             related_name="growth_stage_category", null=True, blank=True, on_delete=models.SET_NULL)
    note = models.TextField(verbose_name="Note", null=True, blank=True)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now=True)

    def __str__(self):
        return self.name


'''
Site Entity
'''


class Site(models.Model):
    sid = models.CharField(verbose_name="SID", primary_key=True, max_length=48)
    user = models.ForeignKey(verbose_name="User", to="User", to_field="uid", related_name="site_user",
                             null=True, blank=True, on_delete=models.SET_NULL)
    name = models.CharField(verbose_name="Site Name", max_length=256)
    owner_name = models.CharField(verbose_name="Owner Name", null=True, blank=True, max_length=64)
    type = models.ForeignKey(verbose_name="Type", to="SiteType", to_field="stid", related_name="site_type",
                             null=True, blank=True, on_delete=models.SET_NULL)
    crop = models.ForeignKey(verbose_name="Crop", to="Crop", to_field="cid", related_name="site_crop",
                             null=True, blank=True, on_delete=models.SET_NULL)
    crop_year = models.IntegerField(verbose_name="Crop Year", null=True, blank=True)
    size = models.FloatField(verbose_name="Size", null=True, blank=True)
    size_unit = models.ForeignKey(verbose_name="Size Unit", to="Unit", to_field="unitid", related_name="site_unit",
                                  null=True, blank=True, on_delete=models.SET_NULL)
    gps = models.CharField(verbose_name="GPS", null=True, blank=True, max_length=128)
    gps_system = models.CharField(verbose_name="GPS System", null=True, blank=True, max_length=64)
    parent = models.ForeignKey(verbose_name="Parent Site", to="Site", to_field="sid", related_name="site_site",
                               null=True, blank=True, on_delete=models.SET_NULL)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now=True)

    def __str__(self):
        return self.name


class SiteType(models.Model):
    stid = models.CharField(verbose_name="STID", primary_key=True, max_length=48)
    name = models.CharField(verbose_name="Type Name", unique=True, max_length=128)

    level_choices = (
        (1, "Child"),
        (2, "Parent"),
    )
    level = models.SmallIntegerField(verbose_name="Level", choices=level_choices)

    note = models.TextField(verbose_name="Note", null=True, blank=True)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now=True)

    def __str__(self):
        return self.name


'''
Unit Entity
'''


class Unit(models.Model):
    unitid = models.CharField(verbose_name="UnitID", primary_key=True, max_length=48)
    unit = models.CharField(verbose_name="Unit", unique=True, max_length=16)

    usage_choices = (
        (1, "Site"),
        (2, "Chemical"),
    )
    usage = models.SmallIntegerField(verbose_name="Usage", choices=usage_choices)

    note = models.TextField(verbose_name="Note", null=True, blank=True)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now=True)

    def __str__(self):
        return self.unit
