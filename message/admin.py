from django.contrib import admin
from message.models import *
from api.utils.UUIDGen import gen_uuid


class MessageAdmin(admin.ModelAdmin):
    list_display = ('mid', 'type', 'author', 'recipient', 'text', 'is_read', 'create_time',)

    list_filter = ('type',)

    list_per_page = 10

    ordering = ['-create_time']

    exclude = ["mid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.mid = gen_uuid("MID")
        super().save_model(request, obj, form, change)


class MessageTypeAdmin(admin.ModelAdmin):
    list_display = ('mtid', 'name', 'note', 'is_active', 'create_time',)

    list_per_page = 10

    ordering = ['-create_time']

    exclude = ["mtid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.mtid = gen_uuid("MTID")
        super().save_model(request, obj, form, change)


class DocumentAdmin(admin.ModelAdmin):
    list_display = ('did', 'name', 'file', 'is_active', 'create_time',)

    list_per_page = 10

    ordering = ['-create_time']

    exclude = ["did"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.did = gen_uuid("DID")
        super().save_model(request, obj, form, change)


admin.site.register(Message, MessageAdmin)
admin.site.register(MessageType, MessageTypeAdmin)
admin.site.register(Document, DocumentAdmin)
