from django.contrib import admin
from user_management.models import *
from api.utils.UUIDGen import gen_uuid


class UserPrivilegeAdmin(admin.ModelAdmin):
    list_display = ('uroid', 'user', 'update_time',)

    list_per_page = 10

    exclude = ["uroid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.uroid = gen_uuid("UROID")
        super().save_model(request, obj, form, change)


admin.site.register(UserPrivilege, UserPrivilegeAdmin)
