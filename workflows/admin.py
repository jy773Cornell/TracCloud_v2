from django.contrib import admin
from workflows.models import *
from django.contrib import messages
from django.db import transaction


class RegistrationAdmin(admin.ModelAdmin):
    list_display = ('rpid', 'state', 'username', 'email', 'update_time', 'create_time', 'is_active')

    list_filter = ('state', 'is_active',)

    list_per_page = 10

    actions = ['approve_registration', 'reject_registration']

    ordering = ('-state', '-create_time')

    exclude = ["prid"]

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

    list_filter = ('state', 'is_active',)

    list_per_page = 10

    ordering = ('-state', '-create_time')

    exclude = ["prpid"]


class ConnectionAdmin(admin.ModelAdmin):
    list_display = ('cpid', 'state', 'relation', 'update_time', 'create_time', 'is_active')

    list_filter = ('state', 'is_active',)

    list_per_page = 10

    ordering = ('-state', '-create_time')

    exclude = ["cpid"]


class SprayCardAdmin(admin.ModelAdmin):
    list_display = ('scpid', 'state', 'owner', 'holder', 'update_time', 'create_time', 'is_active')

    list_filter = ('state', 'is_active',)

    list_per_page = 10

    ordering = ('owner',)

    exclude = ["scpid"]


class SprayCardAssignmentAdmin(admin.ModelAdmin):
    list_display = ('scaid', 'spray_card', 'order', 'assign_to', 'assign_time', 'is_active')

    list_filter = ('is_active',)

    list_per_page = 10

    ordering = ('spray_card', '-is_active', 'order')

    exclude = ["scaid"]


admin.site.register(Registration, RegistrationAdmin)
admin.site.register(PasswordReset, PasswordResetAdmin)

admin.site.register(Connection, ConnectionAdmin)

admin.site.register(SprayCard, SprayCardAdmin)
admin.site.register(SprayCardAssignment, SprayCardAssignmentAdmin)
