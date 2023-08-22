# Generated by Django 4.1.5 on 2023-08-16 18:17

from django.db import migrations
import django_fsm


class Migration(migrations.Migration):

    dependencies = [
        ('workflows', '0020_rename_connection_request_connection_relation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='connection',
            name='state',
            field=django_fsm.FSMField(choices=[('initiated', 'Initiated'), ('pending', 'Pending'), ('connected', 'Connected'), ('rejected', 'Rejected'), ('archived', 'Archived')], default='initiated', max_length=50),
        ),
    ]