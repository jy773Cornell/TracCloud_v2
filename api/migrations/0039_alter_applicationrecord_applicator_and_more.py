# Generated by Django 4.1.5 on 2023-07-20 00:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0038_remove_crop_growth_stage_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='applicationrecord',
            name='applicator',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ar_applicator_user', to='api.userprofile', verbose_name='Applicator'),
        ),
        migrations.AlterField(
            model_name='applicationrecord',
            name='chemical_purchase',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ar_purchase', to='api.purchaserecord', verbose_name='Chemical Purchase'),
        ),
        migrations.AlterField(
            model_name='applicationrecord',
            name='crop',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ar_crop', to='api.crop', verbose_name='Crop'),
        ),
        migrations.AlterField(
            model_name='applicationrecord',
            name='equipment',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ar_equipment', to='api.equipment', verbose_name='Equipment'),
        ),
        migrations.AlterField(
            model_name='applicationrecord',
            name='responsible_person',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ar_responsible_user', to='api.userprofile', verbose_name='Responsible Person'),
        ),
        migrations.AlterField(
            model_name='applicationrecord',
            name='site',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ar_site', to='api.site', verbose_name='Site'),
        ),
        migrations.AlterField(
            model_name='harvestrecord',
            name='crop',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='hr_crop', to='api.crop', verbose_name='Crop'),
        ),
        migrations.AlterField(
            model_name='harvestrecord',
            name='site',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='hr_site', to='api.site', verbose_name='Site'),
        ),
        migrations.AlterField(
            model_name='purchaserecord',
            name='chemical',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='pr_chem', to='api.chemical', verbose_name='Chemical'),
        ),
    ]