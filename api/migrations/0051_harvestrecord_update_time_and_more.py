# Generated by Django 4.1.6 on 2023-04-12 17:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0050_remove_applicationrecord_chemical_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='harvestrecord',
            name='update_time',
            field=models.DateTimeField(auto_now=True, verbose_name='Update Time'),
        ),
        migrations.AlterField(
            model_name='harvestrecord',
            name='bloom_date',
            field=models.CharField(blank=True, max_length=64, null=True, verbose_name='Bloom Date'),
        ),
        migrations.AlterField(
            model_name='harvestrecord',
            name='crop',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='hr_crop', to='api.crop', verbose_name='Crop'),
        ),
        migrations.AlterField(
            model_name='harvestrecord',
            name='har_datetime',
            field=models.CharField(blank=True, max_length=64, null=True, verbose_name='Harvest Datetime'),
        ),
        migrations.AlterField(
            model_name='harvestrecord',
            name='operator',
            field=models.CharField(blank=True, max_length=64, null=True, verbose_name='Operator'),
        ),
        migrations.AlterField(
            model_name='harvestrecord',
            name='planting_date',
            field=models.CharField(blank=True, max_length=64, null=True, verbose_name='Planting Date'),
        ),
        migrations.AlterField(
            model_name='harvestrecord',
            name='rows',
            field=models.CharField(blank=True, max_length=32, null=True, verbose_name='Rows'),
        ),
    ]