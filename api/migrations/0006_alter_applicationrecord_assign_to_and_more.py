# Generated by Django 4.1.5 on 2023-05-25 00:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_applicationrecord_user_alter_chemical_user_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='applicationrecord',
            name='assign_to',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assign_user', to='api.userprofile', verbose_name='User'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='added_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='user_profile_added_by', to='api.userprofile', verbose_name='Added By'),
        ),
        migrations.AlterField(
            model_name='userrelation',
            name='added_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='relation_added_by', to='api.userprofile', verbose_name='Added By'),
        ),
        migrations.AlterField(
            model_name='userrelation',
            name='provider',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='provider_user', to='api.userprofile', verbose_name='Provider'),
        ),
        migrations.AlterField(
            model_name='userrelation',
            name='requester',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='requester_user', to='api.userprofile', verbose_name='Requester'),
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]
