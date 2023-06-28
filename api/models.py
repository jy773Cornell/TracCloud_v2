from django.db import models
from api.utils.ModelManager import MyModelManager
from django.contrib.auth.models import User

'''
User Entity 
'''


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    uid = models.CharField(verbose_name="UID", primary_key=True, max_length=48)
    type = models.ForeignKey(verbose_name="User Type", to="UserType", to_field="utid", related_name="user_profile_type",
                             null=True, blank=True, on_delete=models.SET_NULL)

    first_name = models.CharField(verbose_name="First Name", null=True, blank=True, max_length=64)
    last_name = models.CharField(verbose_name="Last Name", null=True, blank=True, max_length=64)
    pesticide_applicator_no = models.CharField(verbose_name="Pesticide Certification I.D. Number", null=True,
                                               blank=True, max_length=256)
    pesticide_expire_date = models.CharField(verbose_name="Pesticide Certification Expire Date", null=True, blank=True,
                                             max_length=64)
    business_name = models.CharField(verbose_name="Business Name", null=True, blank=True, max_length=256)
    address_line1 = models.CharField(verbose_name="Address Line1", null=True, blank=True, max_length=128)
    address_line2 = models.CharField(verbose_name="Address Line2", null=True, blank=True, max_length=128)
    city = models.CharField(verbose_name="City", null=True, blank=True, max_length=64)
    state = models.CharField(verbose_name="State", null=True, blank=True, max_length=64)
    zipcode = models.CharField(verbose_name="Zip Code", null=True, blank=True, max_length=16)
    county = models.CharField(verbose_name="County", null=True, blank=True, max_length=64)
    country = models.CharField(verbose_name="Country", null=True, blank=True, max_length=64)
    cell_phone = models.CharField(verbose_name="Cell Phone", null=True, blank=True, max_length=32)
    email = models.EmailField(verbose_name="Email", null=True, blank=True)

    added_by = models.ForeignKey(verbose_name="Added By", to="UserProfile", to_field="uid",
                                 related_name="user_profile_added_by",
                                 null=True, blank=True, on_delete=models.SET_NULL)
    self_activated = models.BooleanField(verbose_name="Self Activated", default=True)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    update_time = models.DateTimeField(verbose_name="Update Time", auto_now=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now_add=True)

    def __str__(self):
        return self.user.username

    objects = MyModelManager()


class UserType(models.Model):
    utid = models.CharField(verbose_name="UTID", primary_key=True, max_length=48)
    name = models.CharField(verbose_name="Type Name", unique=True, max_length=128)
    relation_type = models.ForeignKey(verbose_name="Relation Type", to="UserRelationType", to_field="urtid",
                                      related_name="relationtype", null=True, blank=True, on_delete=models.SET_NULL)
    note = models.TextField(verbose_name="Note", null=True, blank=True)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now_add=True)

    def __str__(self):
        return self.name


class UserRelation(models.Model):
    urid = models.CharField(verbose_name="URID", primary_key=True, max_length=48)
    requester = models.ForeignKey(verbose_name="Requester", to="UserProfile", to_field="uid",
                                  related_name="requester_user", null=True, blank=True, on_delete=models.CASCADE)
    provider = models.ForeignKey(verbose_name="Provider", to="UserProfile", to_field="uid",
                                 related_name="provider_user", null=True, blank=True, on_delete=models.CASCADE)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    update_time = models.DateTimeField(verbose_name="Update Time", auto_now=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now_add=True)

    def __str__(self):
        return "Requester: {}, Provider: {}".format(self.requester, self.provider)

    objects = MyModelManager()


class UserRelationType(models.Model):
    urtid = models.CharField(verbose_name="URTID", primary_key=True, max_length=48)
    name = models.CharField(verbose_name="Type Name", unique=True, max_length=128)
    note = models.TextField(verbose_name="Note", null=True, blank=True)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now_add=True)

    def __str__(self):
        return self.name


'''
Equipment Entity 
'''


class Equipment(models.Model):
    eid = models.CharField(verbose_name="EID", primary_key=True, max_length=48)
    user = models.ForeignKey(verbose_name="User", to="UserProfile", to_field="uid", related_name="equip_user",
                             null=True, blank=True, on_delete=models.CASCADE)
    name = models.CharField(verbose_name="Equipment Name", max_length=64)
    code = models.CharField(verbose_name="Code", null=True, blank=True, max_length=64)
    note = models.TextField(verbose_name="Note", null=True, blank=True)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    update_time = models.DateTimeField(verbose_name="Update Time", auto_now=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now_add=True)

    def __str__(self):
        return self.name

    objects = MyModelManager()


# class EquipmentType(models.Model):
#     etid = models.CharField(verbose_name="ETID", primary_key=True, max_length=48)
#     name = models.CharField(verbose_name="Type Name", max_length=32)
#     note = models.TextField(verbose_name="Note", null=True, blank=True)
#     is_active = models.BooleanField(verbose_name="Is Active", default=True)
#     create_time = models.DateTimeField(verbose_name="Create Time", auto_now_add=True)
#
#     def __str__(self):
#         return self.name


'''
Crop Entity
'''


class Crop(models.Model):
    cid = models.CharField(verbose_name="CID", primary_key=True, max_length=48)
    user = models.ForeignKey(verbose_name="User", to="UserProfile", to_field="uid", related_name="crop_user",
                             null=True, blank=True, on_delete=models.CASCADE)
    crop = models.ForeignKey(verbose_name="Crop Name", to="CropCategory", to_field="ccid",
                             related_name="crop_category", null=True, blank=True, on_delete=models.SET_NULL)
    variety = models.ForeignKey(verbose_name="Variety", to="CropVariety", to_field="cvid",
                                related_name="crop_variety", null=True, blank=True, on_delete=models.SET_NULL)
    growth_stage = models.ForeignKey(verbose_name="Grow Stage", to="CropGrowthStage", to_field="cgsid",
                                     related_name="crop_growth_stage", null=True, blank=True, on_delete=models.SET_NULL)

    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    update_time = models.DateTimeField(verbose_name="Update Time", auto_now=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now_add=True)

    def __str__(self):
        return "{}: {}".format(self.crop, self.variety)

    objects = MyModelManager()


class CropCategory(models.Model):
    ccid = models.CharField(verbose_name="CCID", primary_key=True, max_length=48)
    name = models.CharField(verbose_name="Crop Name", max_length=128)
    crop_code = models.CharField(verbose_name="Crop Code", max_length=16)
    category = models.CharField(verbose_name="Category Name", max_length=128)
    note = models.TextField(verbose_name="Note", null=True, blank=True)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    refresh_time = models.DateTimeField(verbose_name="Refresh Time", auto_now=True)

    def __str__(self):
        return self.name


class CropVariety(models.Model):
    cvid = models.CharField(verbose_name="CVID", primary_key=True, max_length=48)
    name = models.CharField(verbose_name="Crop Variety", max_length=128)
    crop = models.ForeignKey(verbose_name="Crop", to="CropCategory", to_field="ccid",
                             related_name="variety_category", null=True, blank=True, on_delete=models.SET_NULL)
    note = models.TextField(verbose_name="Note", null=True, blank=True)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    refresh_time = models.DateTimeField(verbose_name="Refresh Time", auto_now=True)

    def __str__(self):
        return self.name


class CropGrowthStage(models.Model):
    cgsid = models.CharField(verbose_name="CGSID", primary_key=True, max_length=48)
    name = models.CharField(verbose_name="Stage Name", max_length=128)
    crop = models.ForeignKey(verbose_name="Crop", to="CropCategory", to_field="ccid",
                             related_name="growth_stage_category", null=True, blank=True, on_delete=models.SET_NULL)
    note = models.TextField(verbose_name="Note", null=True, blank=True)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    refresh_time = models.DateTimeField(verbose_name="Refresh Time", auto_now=True)

    def __str__(self):
        return self.name


'''
Site Entity
'''


class Site(models.Model):
    sid = models.CharField(verbose_name="SID", primary_key=True, max_length=48)
    user = models.ForeignKey(verbose_name="User", to="UserProfile", to_field="uid", related_name="site_user",
                             null=True, blank=True, on_delete=models.CASCADE)
    type = models.ForeignKey(verbose_name="Type", to="SiteType", to_field="stid", related_name="site_type",
                             null=True, blank=True, on_delete=models.SET_NULL)
    name = models.CharField(verbose_name="Site Name", max_length=256)
    crop = models.ForeignKey(verbose_name="Crop", to="Crop", to_field="cid", related_name="site_crop",
                             null=True, blank=True, on_delete=models.SET_NULL)
    size = models.CharField(verbose_name="Size", null=True, blank=True, max_length=32)
    size_unit = models.ForeignKey(verbose_name="Size Unit", to="Unit", to_field="unitid", related_name="site_unit",
                                  null=True, blank=True, on_delete=models.SET_NULL)
    gps = models.CharField(verbose_name="GPS", null=True, blank=True, max_length=128)
    gps_system = models.CharField(verbose_name="GPS System", null=True, blank=True, max_length=64)
    parent = models.ForeignKey(verbose_name="Parent Site", to="Site", to_field="sid", related_name="site_site",
                               null=True, blank=True, on_delete=models.CASCADE)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    update_time = models.DateTimeField(verbose_name="Update Time", auto_now=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now_add=True)

    def __str__(self):
        return self.name

    objects = MyModelManager()


class SiteType(models.Model):
    stid = models.CharField(verbose_name="STID", primary_key=True, max_length=48)
    name = models.CharField(verbose_name="Type Name", unique=True, max_length=128)
    level = models.SmallIntegerField(verbose_name="Level")
    note = models.TextField(verbose_name="Note", null=True, blank=True)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    refresh_time = models.DateTimeField(verbose_name="Refresh Time", auto_now=True)

    def __str__(self):
        return self.name


'''
Chemical Entity
'''


class Chemical(models.Model):
    chemid = models.CharField(verbose_name="ChemID", primary_key=True, max_length=48)
    user = models.ForeignKey(verbose_name="User", to="UserProfile", to_field="uid", related_name="chem_user",
                             null=True, blank=True, on_delete=models.CASCADE)

    trade_name = models.CharField(verbose_name="Trade Name", max_length=128)
    epa_reg_no = models.CharField(verbose_name="EPA Registration No.", max_length=32)
    unit = models.ForeignKey(verbose_name="Application Unit", to="Unit", to_field="unitid", related_name="chem_unit",
                             null=True, blank=True, on_delete=models.SET_NULL)
    restricted_use = models.CharField(verbose_name="Restricted Use", max_length=16)
    active_ingredient = models.CharField(verbose_name="Active Ingredient", max_length=256)
    percent_ai = models.CharField(verbose_name="Active Ingredient Percent", max_length=128)
    rei = models.CharField(verbose_name="REI", max_length=32)
    phi = models.CharField(verbose_name="PHI", max_length=32)
    type = models.CharField(verbose_name="Product Type", max_length=128)
    company = models.CharField(verbose_name="Company", max_length=128)
    labeled_crops = models.CharField(verbose_name="Labeled Crops", null=True, blank=True, max_length=256)
    label_image = models.CharField(verbose_name="Labeled Image", null=True, blank=True, max_length=128)

    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    update_time = models.DateTimeField(verbose_name="Update Time", auto_now=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now_add=True)

    def __str__(self):
        return "{} (EPA NO. {})".format(self.trade_name, self.epa_reg_no)

    objects = MyModelManager()


class ChemicalProductBase(models.Model):
    chempbid = models.CharField(verbose_name="ChemPBID", primary_key=True, max_length=48)

    product_id_dec = models.CharField(verbose_name="Product ID_DEC", max_length=32)
    epa_reg_no_dec = models.CharField(verbose_name="EPA REG NO_DEC", max_length=32)
    product_name_dec = models.CharField(verbose_name="Product Name_DEC", max_length=256)
    restricted_use_dec = models.CharField(verbose_name="Restricted Use_DEC", max_length=16)
    product_status_dec = models.CharField(verbose_name="Product Status_DEC", max_length=32)
    company_code_dec = models.CharField(verbose_name="Company Code_DEC", null=True, blank=True, max_length=32)
    company_name_dec = models.CharField(verbose_name="Company Name_DEC", null=True, blank=True, max_length=128)
    pc_name_dec = models.TextField(verbose_name="PC Name_DEC", null=True, blank=True)
    pc_pt_dec = models.CharField(verbose_name="PC Pt_DEC", null=True, blank=True, max_length=256)
    product_type_dec = models.CharField(verbose_name="Product Type_DEC", null=True, blank=True, max_length=256)
    product_use_dec = models.CharField(verbose_name="Product Use_DEC", null=True, blank=True, max_length=256)

    epa_reg_no_epa = models.CharField(verbose_name="EPA REG NO_EPA", null=True, blank=True, max_length=32)
    product_name_epa = models.CharField(verbose_name="Product Name_EPA", null=True, blank=True, max_length=256)
    previous_reg_no_epa = models.TextField(verbose_name="Previous Reg No_EPA", null=True, blank=True)
    distributor_reg_no_epa = models.TextField(verbose_name="Distributor Reg No_EPA", null=True, blank=True)
    distributor_product_name_epa = models.TextField(verbose_name="Distributor Product Name_EPA", null=True, blank=True)
    restricted_use_epa = models.CharField(verbose_name="Restricted Use_EPA", null=True, blank=True, max_length=16)
    product_status_epa = models.CharField(verbose_name="Product Status_EPA", null=True, blank=True, max_length=32)
    company_code_epa = models.CharField(verbose_name="Company Code_EPA", null=True, blank=True, max_length=32)
    company_name_epa = models.CharField(verbose_name="Company Name_EPA", null=True, blank=True, max_length=128)
    pc_name_epa = models.TextField(verbose_name="PC Name_EPA", null=True, blank=True)
    pc_pt_epa = models.CharField(verbose_name="PC Pt_EPA", null=True, blank=True, max_length=256)
    product_type_epa = models.CharField(verbose_name="Product Type_EPA", null=True, blank=True, max_length=256)

    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    refresh_time = models.DateTimeField(verbose_name="Refresh Time", auto_now=True)


'''
Operation Entity
'''


class Operation(models.Model):
    opid = models.CharField(verbose_name="OPID", primary_key=True, max_length=48)
    user = models.ForeignKey(verbose_name="User", to="UserProfile", to_field="uid", related_name="op_user",
                             null=True, blank=True, on_delete=models.CASCADE)
    type = models.ForeignKey(verbose_name="Operation Type", to="OperationType", to_field="optid",
                             related_name="op_type", null=True, blank=True, on_delete=models.SET_NULL)

    STATE_CHOICES = [
        ('initiated', 'Initiated'),
        ('pending', 'Pending'),
        ('withdrew', 'Withdrew'),
        ('completed', 'Completed'),
    ]
    state = models.CharField(max_length=20, choices=STATE_CHOICES, default='initiated')

    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    update_time = models.DateTimeField(verbose_name="Update Time", auto_now=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now_add=True)

    objects = MyModelManager()


class OperationType(models.Model):
    optid = models.CharField(verbose_name="OPTID", primary_key=True, max_length=48)
    name = models.CharField(verbose_name="Type Name", max_length=128)
    multiple_records = models.BooleanField(verbose_name="Multiple Records", default=False)
    note = models.TextField(verbose_name="Note", null=True, blank=True)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    refresh_time = models.DateTimeField(verbose_name="Refresh Time", auto_now=True)

    def __str__(self):
        return self.name


class PurchaseRecord(models.Model):
    prid = models.CharField(verbose_name="PRID", primary_key=True, max_length=48)
    user = models.ForeignKey(verbose_name="User", to="UserProfile", to_field="uid", related_name="pr_user",
                             null=True, blank=True, on_delete=models.CASCADE)
    opid = models.ForeignKey(verbose_name="OPID", to="Operation", to_field="opid", related_name="pr_op",
                             null=True, blank=True, on_delete=models.CASCADE)
    pur_datetime = models.CharField(verbose_name="Purchase Datetime", null=True, blank=True, max_length=64)
    amount = models.CharField(verbose_name="Amount", max_length=32)
    total_cost = models.CharField(verbose_name="Total Cost", max_length=32)
    cost_per_unit = models.CharField(verbose_name="Cost Per Applied Unit", max_length=32)
    chemical = models.ForeignKey(verbose_name="Chemical", to="Chemical", to_field="chemid",
                                 related_name="pr_chem", null=True, blank=True, on_delete=models.SET_NULL)
    note = models.TextField(verbose_name="Note", null=True, blank=True)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    update_time = models.DateTimeField(verbose_name="Update Time", auto_now=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now_add=True)

    def __str__(self):
        return "{} ({})".format(self.chemical, self.pur_datetime)

    objects = MyModelManager()


class HarvestRecord(models.Model):
    hrid = models.CharField(verbose_name="HRID", primary_key=True, max_length=48)
    user = models.ForeignKey(verbose_name="User", to="UserProfile", to_field="uid", related_name="hr_user",
                             null=True, blank=True, on_delete=models.CASCADE)
    opid = models.ForeignKey(verbose_name="OPID", to="Operation", to_field="opid", related_name="hr_op",
                             null=True, blank=True, on_delete=models.CASCADE)
    crop = models.ForeignKey(verbose_name="Crop", to="Crop", to_field="cid", related_name="hr_crop",
                             null=True, blank=True, on_delete=models.SET_NULL)
    site = models.ForeignKey(verbose_name="Site", to="Site", to_field="sid", related_name="hr_site",
                             null=True, blank=True, on_delete=models.SET_NULL)
    hr_area = models.CharField(verbose_name="Harvest Area", max_length=32)
    area_unit = models.ForeignKey(verbose_name="Area Unit", to="Unit", to_field="unitid",
                                  related_name="hr_unit", null=True, blank=True, on_delete=models.SET_NULL)
    rows = models.CharField(verbose_name="Rows", null=True, blank=True, max_length=32)
    planting_date = models.CharField(verbose_name="Planting Date", null=True, blank=True, max_length=64)
    bloom_date = models.CharField(verbose_name="Bloom Date", null=True, blank=True, max_length=64)
    har_datetime = models.CharField(verbose_name="Harvest Datetime", null=True, blank=True, max_length=64)
    operator = models.CharField(verbose_name="Operator", null=True, blank=True, max_length=64)
    tracing_no = models.CharField(verbose_name="Tracking No.", null=True, blank=True, max_length=128)

    note = models.TextField(verbose_name="Note", null=True, blank=True)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    update_time = models.DateTimeField(verbose_name="Update Time", auto_now=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now_add=True)

    def __str__(self):
        return "{} ({})".format(self.site, self.har_datetime)

    objects = MyModelManager()


class ApplicationRecord(models.Model):
    arid = models.CharField(verbose_name="ARID", primary_key=True, max_length=48)
    user = models.ForeignKey(verbose_name="User", to="UserProfile", to_field="uid", related_name="ar_user",
                             null=True, blank=True, on_delete=models.CASCADE)
    opid = models.ForeignKey(verbose_name="OPID", to="Operation", to_field="opid", related_name="ar_op",
                             null=True, blank=True, on_delete=models.CASCADE)
    crop = models.ForeignKey(verbose_name="Crop", to="Crop", to_field="cid", related_name="ar_crop",
                             null=True, blank=True, on_delete=models.SET_NULL)
    start_datetime = models.CharField(verbose_name="Start Datetime", null=True, blank=True, max_length=64)
    finish_datetime = models.CharField(verbose_name="Finish Datetime", null=True, blank=True, max_length=64)
    site = models.ForeignKey(verbose_name="Site", to="Site", to_field="sid", related_name="ar_site",
                             null=True, blank=True, on_delete=models.SET_NULL)
    partial_treatment = models.BooleanField(verbose_name="Partial Treatment", default=False)
    target = models.ForeignKey(verbose_name="Application Target", to="ApplicationTarget", to_field="attid",
                               related_name="ar_pd", null=True, blank=True, on_delete=models.SET_NULL)
    decision_support = models.ForeignKey(verbose_name="Decision Support", to="DecisionSupport", to_field="dsid",
                                         related_name="ar_decision_support", null=True, blank=True,
                                         on_delete=models.SET_NULL)
    chemical_purchase = models.ForeignKey(verbose_name="Chemical Purchase", to="PurchaseRecord", to_field="prid",
                                          related_name="ar_purchase", null=True, blank=True, on_delete=models.SET_NULL)
    harvestable_date = models.CharField(verbose_name="Harvestable Date", null=True, blank=True, max_length=64)
    equipment = models.ForeignKey(verbose_name="Equipment", to="Equipment", to_field="eid",
                                  related_name="ar_equipment", null=True, blank=True, on_delete=models.SET_NULL)
    amount_pesticide_per_tank = models.CharField(verbose_name="Amount Pesticide per Tank", null=True, blank=True,
                                                 max_length=64)
    gallons_water_rate = models.CharField(verbose_name="Gallons Water Rate", null=True, blank=True, max_length=32)
    application_rate = models.CharField(verbose_name="Application Rate", null=True, blank=True, max_length=32)
    applied_area = models.CharField(verbose_name="Applied Area", null=True, blank=True, max_length=32)
    area_unit = models.ForeignKey(verbose_name="Area Unit", to="Unit", to_field="unitid", related_name="ar_area_unit",
                                  null=True, blank=True, on_delete=models.SET_NULL)
    total_amount = models.CharField(verbose_name="Total Amount", null=True, blank=True, max_length=32)
    total_cost = models.CharField(verbose_name="Total Cost", null=True, blank=True, max_length=32)
    applicator = models.ForeignKey(verbose_name="Applicator", to="UserProfile", to_field="uid",
                                   related_name="ar_applicator_user", null=True, blank=True, on_delete=models.SET_NULL)
    responsible_person = models.ForeignKey(verbose_name="Responsible Person", to="UserProfile", to_field="uid",
                                           related_name="ar_responsible_user", null=True, blank=True,
                                           on_delete=models.SET_NULL)
    rate_unit = models.ForeignKey(verbose_name="Rate Unit", to="Unit", to_field="unitid",
                                  related_name="ar_rate_unit", null=True, blank=True, on_delete=models.SET_NULL)
    amount_unit = models.ForeignKey(verbose_name="Amount Unit", to="Unit", to_field="unitid",
                                    related_name="ar_amount_opu", null=True, blank=True, on_delete=models.SET_NULL)
    wind_speed = models.CharField(verbose_name="Wind Speed", null=True, blank=True, max_length=32)
    wind_direction = models.CharField(verbose_name="Wind Direction", null=True, blank=True, max_length=32)
    average_temp = models.CharField(verbose_name="Average Temperature", null=True, blank=True, max_length=32)
    note = models.TextField(verbose_name="Note", null=True, blank=True)

    is_active = models.BooleanField(verbose_name="Is Active", default=False)
    update_time = models.DateTimeField(verbose_name="Update Time", auto_now=True)
    create_time = models.DateTimeField(verbose_name="Create Time", auto_now_add=True)

    objects = MyModelManager()


class ApplicationType(models.Model):
    atid = models.CharField(verbose_name="ATID", primary_key=True, max_length=48)
    name = models.CharField(verbose_name="Type Name", max_length=128)
    note = models.TextField(verbose_name="Note", null=True, blank=True)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    refresh_time = models.DateTimeField(verbose_name="Refresh Time", auto_now=True)

    def __str__(self):
        return self.name


class DecisionSupport(models.Model):
    dsid = models.CharField(verbose_name="DSID", primary_key=True, max_length=48)
    name = models.CharField(verbose_name="Decision Support", max_length=128)
    note = models.TextField(verbose_name="Note", null=True, blank=True)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    refresh_time = models.DateTimeField(verbose_name="Refresh Time", auto_now=True)

    def __str__(self):
        return self.name


class ApplicationTarget(models.Model):
    attid = models.CharField(verbose_name="ATTID", primary_key=True, max_length=48)
    name = models.CharField(verbose_name="Application Target", max_length=128)
    code = models.CharField(verbose_name="Target Code ", null=True, blank=True, max_length=16)
    crop = models.ForeignKey(verbose_name="Crop", to="CropCategory", to_field="ccid",
                             related_name="application_category", null=True, blank=True, on_delete=models.SET_NULL)
    note = models.TextField(verbose_name="Note", null=True, blank=True)
    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    refresh_time = models.DateTimeField(verbose_name="Refresh Time", auto_now=True)

    def __str__(self):
        return self.name


'''
Unit Entity
'''


class Unit(models.Model):
    unitid = models.CharField(verbose_name="UnitID", primary_key=True, max_length=48)
    name = models.CharField(verbose_name="Unit", unique=True, max_length=64)
    usage = models.CharField(verbose_name="Usage", max_length=64)
    note = models.TextField(verbose_name="Note", null=True, blank=True)

    is_active = models.BooleanField(verbose_name="Is Active", default=True)
    refresh_time = models.DateTimeField(verbose_name="Refresh Time", auto_now=True)

    def __str__(self):
        return self.name
