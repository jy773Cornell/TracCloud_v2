from django.contrib import admin
from api.models import *
from .utils.UUIDGen import gen_uuid


class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('uid', 'user', 'type', 'self_activated', 'is_active', 'create_time',)

    list_filter = ('type', 'self_activated', 'is_active',)

    list_per_page = 10

    list_editable = ('self_activated', 'is_active',)

    exclude = ["uid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.uid = gen_uuid("UID")
        super().save_model(request, obj, form, change)


class UserTypeAdmin(admin.ModelAdmin):
    list_display = ('utid', 'name', 'is_active', 'create_time',)

    list_filter = ('is_active',)

    list_per_page = 10

    list_editable = ('name', 'is_active',)

    exclude = ["utid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.utid = gen_uuid("UTID")
        super().save_model(request, obj, form, change)


class UserRelationAdmin(admin.ModelAdmin):
    list_display = (
        'urid', 'requester', 'provider', 'type', 'added_by', 'is_resolved', 'is_active', 'create_time',)

    list_filter = ('type', 'is_resolved', 'is_active',)

    list_per_page = 10

    list_editable = ('is_active',)

    exclude = ["URID"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.urid = gen_uuid("URID")
        super().save_model(request, obj, form, change)


class UserRelationTypeAdmin(admin.ModelAdmin):
    list_display = ('urtid', 'name', 'is_active', 'create_time',)

    list_filter = ('is_active',)

    list_per_page = 10

    list_editable = ('name', 'is_active',)

    exclude = ["urtid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.urtid = gen_uuid("URTID")
        super().save_model(request, obj, form, change)


class EquipmentAdmin(admin.ModelAdmin):
    list_display = ('eid', 'user', 'name', 'owner', 'code', 'is_active', 'update_time', 'create_time',)

    list_filter = ('is_active',)

    list_per_page = 10

    list_editable = ('is_active',)

    exclude = ["eid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.eid = gen_uuid("EID")
        super().save_model(request, obj, form, change)


class EquipmentTypeAdmin(admin.ModelAdmin):
    list_display = ('etid', 'name', 'is_active', 'create_time',)

    list_filter = ('is_active',)

    list_per_page = 10

    list_editable = ('name', 'is_active',)

    exclude = ["etid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.etid = gen_uuid("ETID")
        super().save_model(request, obj, form, change)


class CropAdmin(admin.ModelAdmin):
    list_display = ('cid', 'user', 'crop', 'variety', 'growth_stage',
                    'is_active', 'update_time', 'create_time',)

    list_filter = ('crop', 'is_active',)

    list_per_page = 10

    list_editable = ('is_active',)

    exclude = ["cid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.cid = gen_uuid("CID")
        super().save_model(request, obj, form, change)


class CropCategoryAdmin(admin.ModelAdmin):
    list_display = ('ccid', 'name', 'crop_code', 'category', 'is_active', 'refresh_time',)

    list_filter = ('is_active',)

    list_per_page = 10

    list_editable = ('name', 'category', 'is_active',)

    exclude = ["ccid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.ccid = gen_uuid("CCID")
        super().save_model(request, obj, form, change)


class CropVarietyAdmin(admin.ModelAdmin):
    list_display = ('cvid', 'name', 'crop', 'is_active', 'refresh_time',)

    list_filter = ('crop', 'is_active',)

    list_per_page = 10

    list_editable = ('name', 'is_active',)

    exclude = ["cvid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.cvid = gen_uuid("CVID")
        super().save_model(request, obj, form, change)


class CropGrowthStageAdmin(admin.ModelAdmin):
    list_display = ('cgsid', 'name', 'crop', 'is_active', 'refresh_time',)

    list_filter = ('is_active',)

    list_per_page = 10

    list_editable = ('name', 'is_active',)

    exclude = ["cgsid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.cgsid = gen_uuid("CGSID")
        super().save_model(request, obj, form, change)


class SiteAdmin(admin.ModelAdmin):
    list_display = ('sid', 'user', 'name', 'type', 'crop', 'size', 'size_unit', 'parent', 'is_active', 'create_time',)

    list_filter = ('type', 'crop', 'parent', 'is_active',)

    list_per_page = 10

    list_editable = ('is_active',)

    exclude = ["sid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.sid = gen_uuid("SID")
        super().save_model(request, obj, form, change)


class SiteTypeAdmin(admin.ModelAdmin):
    list_display = ('stid', 'name', 'level', 'is_active', 'refresh_time',)

    list_filter = ('level', 'is_active',)

    list_per_page = 10

    list_editable = ('name', 'is_active',)

    exclude = ["stid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.stid = gen_uuid("STID")
        super().save_model(request, obj, form, change)


class ChemicalAdmin(admin.ModelAdmin):
    list_display = ('chemid', 'user', 'trade_name', 'epa_reg_no', 'type', 'is_active', 'create_time',)

    list_filter = ('type', 'is_active',)

    list_per_page = 10

    list_editable = ('is_active',)

    exclude = ["chemid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.chemid = gen_uuid("ChemID")
        super().save_model(request, obj, form, change)


class ChemicalProductBaseAdmin(admin.ModelAdmin):
    list_display = (
        'epa_reg_no_dec', 'product_name_dec', 'pc_name_dec', 'pc_pt_dec', 'product_type_dec', 'is_active',
        'refresh_time',)

    list_filter = ('product_type_dec', 'is_active',)

    list_per_page = 10

    list_editable = ('is_active',)

    exclude = ["chempbid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.chempbid = gen_uuid("ChemPBID")
        super().save_model(request, obj, form, change)


class OperationAdmin(admin.ModelAdmin):
    list_display = ('opid', 'user', 'type', 'datetime', 'is_active', 'create_time',)

    list_filter = ('type', 'is_active',)

    list_per_page = 10

    list_editable = ('is_active',)

    exclude = ["opid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.opid = gen_uuid("OPID")
        super().save_model(request, obj, form, change)


class OperationTypeAdmin(admin.ModelAdmin):
    list_display = ('optid', 'name', 'multiple_records', 'is_active', 'refresh_time',)

    list_filter = ('is_active',)

    list_per_page = 10

    list_editable = ('name', 'is_active',)

    exclude = ["optid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.optid = gen_uuid("OPTID")
        super().save_model(request, obj, form, change)


class PurchaseRecordAdmin(admin.ModelAdmin):
    list_display = ('prid', 'user', 'pur_datetime', 'chemical', 'is_active', 'create_time',)

    list_filter = ('is_active',)

    list_per_page = 10

    list_editable = ('is_active',)

    exclude = ["prid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.prid = gen_uuid("PRID")
        super().save_model(request, obj, form, change)


class HarvestRecordAdmin(admin.ModelAdmin):
    list_display = ('hrid', 'user', 'har_datetime', 'crop', 'site', 'is_active', 'create_time',)

    list_filter = ('is_active',)

    list_per_page = 10

    list_editable = ('is_active',)

    exclude = ["hrid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.hrid = gen_uuid("HRID")
        super().save_model(request, obj, form, change)


class ApplicationRecordAdmin(admin.ModelAdmin):
    list_display = ('arid', 'user', 'type', 'app_date', 'crop', 'site', 'is_active', 'create_time',)

    list_filter = ('is_active',)

    list_per_page = 10

    list_editable = ('is_active',)

    exclude = ["arid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.arid = gen_uuid("ARID")
        super().save_model(request, obj, form, change)


class ApplicationTypeAdmin(admin.ModelAdmin):
    list_display = ('atid', 'name', 'is_active', 'refresh_time',)

    list_filter = ('is_active',)

    list_per_page = 10

    list_editable = ('name', 'is_active',)

    exclude = ["atid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.atid = gen_uuid("ATID")
        super().save_model(request, obj, form, change)


class DecisionSupportAdmin(admin.ModelAdmin):
    list_display = ('dsid', 'name', 'is_active', 'refresh_time',)

    list_filter = ('is_active',)

    list_per_page = 10

    list_editable = ('name', 'is_active',)

    exclude = ["DSID"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.dsid = gen_uuid("DSID")
        super().save_model(request, obj, form, change)


class ApplicationTargetAdmin(admin.ModelAdmin):
    list_display = ('attid', 'name', 'code', 'is_active', 'refresh_time',)

    list_filter = ('is_active',)

    list_per_page = 10

    list_editable = ('name', 'is_active',)

    exclude = ["attid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.attid = gen_uuid("ATTID")
        super().save_model(request, obj, form, change)


class UnitAdmin(admin.ModelAdmin):
    list_display = ('unitid', 'name', 'usage', 'is_active', 'refresh_time',)

    list_filter = ('is_active',)

    list_per_page = 10

    list_editable = ('name', 'is_active',)

    exclude = ["unitid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.unitid = gen_uuid("UnitID")
        super().save_model(request, obj, form, change)


admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(UserType, UserTypeAdmin)
admin.site.register(UserRelation, UserRelationAdmin)
admin.site.register(UserRelationType, UserRelationTypeAdmin)

admin.site.register(Equipment, EquipmentAdmin)
admin.site.register(EquipmentType, EquipmentTypeAdmin)

admin.site.register(Crop, CropAdmin)
admin.site.register(CropCategory, CropCategoryAdmin)
admin.site.register(CropVariety, CropVarietyAdmin)
admin.site.register(CropGrowthStage, CropGrowthStageAdmin)

admin.site.register(Site, SiteAdmin)
admin.site.register(SiteType, SiteTypeAdmin)

admin.site.register(Chemical, ChemicalAdmin)
admin.site.register(ChemicalProductBase, ChemicalProductBaseAdmin)

admin.site.register(Operation, OperationAdmin)
admin.site.register(OperationType, OperationTypeAdmin)
admin.site.register(PurchaseRecord, PurchaseRecordAdmin)
admin.site.register(HarvestRecord, HarvestRecordAdmin)
admin.site.register(ApplicationRecord, ApplicationRecordAdmin)
admin.site.register(ApplicationType, ApplicationTypeAdmin)
admin.site.register(DecisionSupport, DecisionSupportAdmin)
admin.site.register(ApplicationTarget, ApplicationTargetAdmin)

admin.site.register(Unit, UnitAdmin)
