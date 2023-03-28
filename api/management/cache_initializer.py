from django.core.signals import request_started
from django.dispatch import receiver
from django.core.management import call_command

command_executed = False


@receiver(request_started)
def run_command_on_startup(sender, **kwargs):
    global command_executed
    if not command_executed:
        call_command('preload_ref')
        command_executed = True
