# Generated by Django 4.1.5 on 2023-08-10 15:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('workflows', '0019_registration_type'),
    ]

    operations = [
        migrations.RenameField(
            model_name='connection',
            old_name='connection_request',
            new_name='relation',
        ),
    ]
