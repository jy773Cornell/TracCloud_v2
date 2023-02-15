# Generated by Django 4.1.5 on 2023-02-14 23:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_user_password'),
    ]

    operations = [
        migrations.CreateModel(
            name='EquipmentType',
            fields=[
                ('etid', models.CharField(max_length=48, primary_key=True, serialize=False, verbose_name='ETID')),
                ('name', models.CharField(max_length=32, verbose_name='Type Name')),
                ('note', models.TextField(blank=True, null=True, verbose_name='Note')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
                ('create_time', models.DateTimeField(auto_now=True, verbose_name='Create Time')),
            ],
        ),
        migrations.CreateModel(
            name='Equipment',
            fields=[
                ('eid', models.CharField(max_length=48, primary_key=True, serialize=False, verbose_name='EID')),
                ('name', models.CharField(max_length=64, verbose_name='Equipment Name')),
                ('code', models.CharField(blank=True, max_length=64, null=True, verbose_name='Code')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
                ('create_time', models.DateTimeField(auto_now=True, verbose_name='Create Time')),
                ('owner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='owner_user', to='api.user', verbose_name='Owner')),
                ('type', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='equip_type', to='api.equipmenttype', verbose_name='Type')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='equip_user', to='api.user', verbose_name='User')),
            ],
        ),
    ]