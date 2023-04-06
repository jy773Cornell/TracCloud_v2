# Generated by Django 4.1.5 on 2023-04-06 14:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0044_remove_applicationrecord_growth_stage'),
    ]

    operations = [
        migrations.AddField(
            model_name='applicationrecord',
            name='equipment',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ar_equipment', to='api.equipment', verbose_name='Equipment'),
        ),
    ]