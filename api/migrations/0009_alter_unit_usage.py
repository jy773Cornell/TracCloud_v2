# Generated by Django 4.1.5 on 2023-02-17 01:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_unit_usage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='unit',
            name='usage',
            field=models.SmallIntegerField(choices=[(1, 'Site'), (2, 'Chemical')], verbose_name='Usage'),
        ),
    ]
