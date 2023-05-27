from django.contrib import admin
from workflows.models import *
from django.contrib import messages
from django.db import transaction


class RegistrationAdmin(admin.ModelAdmin):
    list_display = ('rpid', 'state', 'username', 'email', 'update_time', 'create_time', 'is_active')

    list_filter = ('state',)

    list_per_page = 10

    actions = ['approve_registration', 'reject_registration']

    ordering = ('-state', '-create_time')

    exclude = ["prid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.rpid = gen_uuid("RPID")
        super().save_model(request, obj, form, change)

    def approve_registration(self, request, queryset):
        for registration in queryset:
            try:
                with transaction.atomic():
                    registration.approve()
                    registration.save()
                self.message_user(request, f"Registration for {registration.username} has been approved.")
            except Exception as e:
                self.message_user(
                    request,
                    f"Error occurred while approving registration for {registration.username}: {str(e)}",
                    level=messages.ERROR
                )

    approve_registration.short_description = 'Approve selected Registrations'

    def reject_registration(self, request, queryset):
        for registration in queryset:
            try:
                with transaction.atomic():
                    registration.reject()
                    registration.save()
                self.message_user(request, f"Registration for {registration.username} has been rejected.")
            except Exception as e:
                self.message_user(
                    request,
                    f"Error occurred while rejecting registration for {registration.username}: {str(e)}",
                    level=messages.ERROR
                )

    reject_registration.short_description = 'Reject selected Registrations'


class PasswordResetAdmin(admin.ModelAdmin):
    list_display = ('prpid', 'state', 'user', 'update_time', 'create_time', 'is_active')

    list_filter = ('state',)

    list_per_page = 10

    ordering = ('-state', '-create_time')

    exclude = ["prpid"]

    def save_model(self, request, obj, form, change):
        if not change:
            obj.prpid = gen_uuid("PRPID")
        super().save_model(request, obj, form, change)


admin.site.register(Registration, RegistrationAdmin)
admin.site.register(PasswordReset, PasswordResetAdmin)
