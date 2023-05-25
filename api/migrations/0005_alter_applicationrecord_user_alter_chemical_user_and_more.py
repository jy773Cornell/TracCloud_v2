# Generated by Django 4.1.5 on 2023-05-25 00:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_userprofile_update_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='applicationrecord',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ar_user', to='api.userprofile', verbose_name='User'),
        ),
        migrations.AlterField(
            model_name='chemical',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='chem_user', to='api.userprofile', verbose_name='User'),
        ),
        migrations.AlterField(
            model_name='crop',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='crop_user', to='api.userprofile', verbose_name='User'),
        ),
        migrations.AlterField(
            model_name='equipment',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='equip_user', to='api.userprofile', verbose_name='User'),
        ),
        migrations.AlterField(
            model_name='harvestrecord',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='hr_user', to='api.userprofile', verbose_name='User'),
        ),
        migrations.AlterField(
            model_name='operation',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='op_user', to='api.userprofile', verbose_name='User'),
        ),
        migrations.AlterField(
            model_name='purchaserecord',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='pr_user', to='api.userprofile', verbose_name='User'),
        ),
        migrations.AlterField(
            model_name='site',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='site_user', to='api.userprofile', verbose_name='User'),
        ),
    ]