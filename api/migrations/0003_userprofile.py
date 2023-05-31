# Generated by Django 4.1.5 on 2023-05-24 20:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0002_applicationrecord_application_status_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('uid', models.CharField(max_length=48, primary_key=True, serialize=False, verbose_name='UID')),
                ('name', models.CharField(blank=True, max_length=64, null=True, verbose_name='Actual Name')),
                ('business_name', models.CharField(blank=True, max_length=256, null=True, verbose_name='Business Name')),
                ('registration_license_no', models.CharField(blank=True, max_length=256, null=True, verbose_name='Registration No/PesticideLicense No')),
                ('license_expire_date', models.DateField(blank=True, null=True, verbose_name='License Expire Date')),
                ('address', models.CharField(blank=True, max_length=256, null=True, verbose_name='Address')),
                ('city', models.CharField(blank=True, max_length=64, null=True, verbose_name='City')),
                ('county', models.CharField(blank=True, max_length=64, null=True, verbose_name='County')),
                ('state', models.CharField(blank=True, max_length=64, null=True, verbose_name='State')),
                ('zipcode', models.CharField(blank=True, max_length=16, null=True, verbose_name='Zip Code')),
                ('country', models.CharField(blank=True, max_length=64, null=True, verbose_name='Country')),
                ('phone', models.CharField(blank=True, max_length=16, null=True, verbose_name='Phone Number')),
                ('cell', models.CharField(blank=True, max_length=32, null=True, verbose_name='Cell Number')),
                ('email', models.EmailField(blank=True, max_length=254, null=True, verbose_name='Email')),
                ('self_activated', models.BooleanField(default=False, verbose_name='Self Activated')),
                ('is_active', models.BooleanField(default=False, verbose_name='Is Active')),
                ('create_time', models.DateTimeField(auto_now=True, verbose_name='Create Time')),
                ('added_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='user_profile_added_by', to='api.user', verbose_name='Added By')),
                ('type', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='user_profile_type', to='api.usertype', verbose_name='User Type')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
