from django.contrib import admin
from api.utils.UUIDGen import gen_uuid
from media.models import *


class ReportAdmin(admin.ModelAdmin):
    list_display = ('rid', 'name', 'user', 'author', 'file', 'is_active', 'create_time',)

    list_per_page = 10

    ordering = ['-create_time']

    exclude = ["rid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.did = gen_uuid("RID")
        super().save_model(request, obj, form, change)


admin.site.register(Report, ReportAdmin)
