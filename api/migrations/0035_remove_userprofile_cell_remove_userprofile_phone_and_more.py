# Generated by Django 4.1.5 on 2023-06-28 23:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0034_applicationrecord_amount_pesticide_per_tank_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='cell',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='phone',
        ),
        migrations.AddField(
            model_name='userprofile',
            name='cell_phone',
            field=models.CharField(blank=True, max_length=32, null=True, verbose_name='Cell Phone'),
        ),
    ]
