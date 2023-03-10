# Generated by Django 4.1.5 on 2023-02-17 01:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_remove_crop_lifecycle_cropcategory_crop_code_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='SiteType',
            fields=[
                ('stid', models.CharField(max_length=48, primary_key=True, serialize=False, verbose_name='STID')),
                ('name', models.CharField(max_length=128, unique=True, verbose_name='Type Name')),
                ('level', models.SmallIntegerField(choices=[(1, 'Child'), (2, 'Parent')], verbose_name='Level')),
                ('note', models.TextField(blank=True, null=True, verbose_name='Note')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
                ('create_time', models.DateTimeField(auto_now=True, verbose_name='Create Time')),
            ],
        ),
        migrations.CreateModel(
            name='Unit',
            fields=[
                ('unitid', models.CharField(max_length=48, primary_key=True, serialize=False, verbose_name='UnitID')),
                ('unit', models.CharField(max_length=16, unique=True, verbose_name='Unit')),
                ('usage', models.CharField(max_length=32, unique=True, verbose_name='Usage')),
                ('note', models.TextField(blank=True, null=True, verbose_name='Note')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
                ('create_time', models.DateTimeField(auto_now=True, verbose_name='Create Time')),
            ],
        ),
        migrations.AddField(
            model_name='usertype',
            name='note',
            field=models.TextField(blank=True, null=True, verbose_name='Note'),
        ),
        migrations.CreateModel(
            name='Site',
            fields=[
                ('sid', models.CharField(max_length=48, primary_key=True, serialize=False, verbose_name='SID')),
                ('name', models.CharField(max_length=256, verbose_name='Site Name')),
                ('owner_name', models.CharField(blank=True, max_length=64, null=True, verbose_name='Owner Name')),
                ('crop_year', models.IntegerField(blank=True, null=True, verbose_name='Crop Year')),
                ('size', models.FloatField(blank=True, null=True, verbose_name='Size')),
                ('gps', models.CharField(blank=True, max_length=128, null=True, verbose_name='GPS')),
                ('gps_system', models.CharField(blank=True, max_length=64, null=True, verbose_name='GPS System')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
                ('create_time', models.DateTimeField(auto_now=True, verbose_name='Create Time')),
                ('crop', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='site_crop', to='api.crop', verbose_name='Crop')),
                ('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='site_site', to='api.site', verbose_name='Parent Site')),
                ('size_unit', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='site_unit', to='api.unit', verbose_name='Size Unit')),
                ('type', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='site_type', to='api.sitetype', verbose_name='Type')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='site_user', to='api.user', verbose_name='User')),
            ],
        ),
    ]
