# Generated by Django 4.1.5 on 2023-07-21 14:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0039_alter_applicationrecord_applicator_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='site',
            name='crop',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='site_crop', to='api.crop', verbose_name='Crop'),
        ),
    ]
