from django.contrib import admin
from api.models import *
from .utils.UUIDGen import gen_uuid


class UserAdmin(admin.ModelAdmin):
    list_display = ('uid', 'username', 'type', 'business_name',
                    'added_by', 'self_activated', 'is_active', 'create_time',)

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


admin.site.register(User, UserAdmin)
admin.site.register(UserType, UserTypeAdmin)
admin.site.register(UserRelation, UserRelationAdmin)
admin.site.register(UserRelationType, UserRelationTypeAdmin)
