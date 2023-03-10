# Generated by Django 4.1.5 on 2023-03-09 15:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_alter_applicationrecord_app_datetime_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='reg_expire_date',
        ),
        migrations.RemoveField(
            model_name='user',
            name='registration_no',
        ),
        migrations.AddField(
            model_name='user',
            name='license_expire_date',
            field=models.DateField(blank=True, null=True, verbose_name='License Expire Date'),
        ),
        migrations.AddField(
            model_name='user',
            name='registration_license_no',
            field=models.CharField(blank=True, max_length=256, null=True, verbose_name='Registration No/PesticideLicense No'),
        ),
    ]
