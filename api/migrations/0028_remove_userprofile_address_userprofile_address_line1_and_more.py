# Generated by Django 4.1.5 on 2023-06-27 19:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0027_remove_userprofile_license_expire_date_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='address',
        ),
        migrations.AddField(
            model_name='userprofile',
            name='address_line1',
            field=models.CharField(blank=True, max_length=128, null=True, verbose_name='Address Line1'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='address_line2',
            field=models.CharField(blank=True, max_length=128, null=True, verbose_name='Address Line2'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='pesticide_applicator_no',
            field=models.CharField(blank=True, max_length=256, null=True, verbose_name='Pesticide Certification I.D. Number'),
        ),
    ]