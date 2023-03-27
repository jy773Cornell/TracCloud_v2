# Generated by Django 4.1.6 on 2023-03-17 15:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0023_rename_unit_unit_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='unit',
            name='name',
            field=models.CharField(max_length=64, unique=True, verbose_name='Unit'),
        ),
        migrations.AlterField(
            model_name='unit',
            name='usage',
            field=models.CharField(max_length=64, verbose_name='Usage'),
        ),
    ]