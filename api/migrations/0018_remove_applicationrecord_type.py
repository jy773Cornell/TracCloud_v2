# Generated by Django 4.1.5 on 2023-06-02 18:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_remove_operation_datetime'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='applicationrecord',
            name='type',
        ),
    ]
