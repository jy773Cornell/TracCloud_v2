# Generated by Django 4.1.5 on 2023-06-28 14:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0030_delete_equipmenttype_remove_equipment_owner_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='site',
            name='crop_year',
        ),
        migrations.RemoveField(
            model_name='site',
            name='owner_name',
        ),
    ]
