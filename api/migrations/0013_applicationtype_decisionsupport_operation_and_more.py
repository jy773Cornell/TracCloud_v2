# Generated by Django 4.1.5 on 2023-02-18 16:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_alter_chemical_phi_alter_chemical_rei'),
    ]

    operations = [
        migrations.CreateModel(
            name='ApplicationType',
            fields=[
                ('atid', models.CharField(max_length=48, primary_key=True, serialize=False, verbose_name='ATID')),
                ('name', models.CharField(max_length=128, verbose_name='Type Name')),
                ('note', models.TextField(blank=True, null=True, verbose_name='Note')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
                ('create_time', models.DateTimeField(auto_now=True, verbose_name='Create Time')),
            ],
        ),
        migrations.CreateModel(
            name='DecisionSupport',
            fields=[
                ('dsid', models.CharField(max_length=48, primary_key=True, serialize=False, verbose_name='DSID')),
                ('name', models.CharField(max_length=128, verbose_name='Decision Support')),
                ('note', models.TextField(blank=True, null=True, verbose_name='Note')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
                ('create_time', models.DateTimeField(auto_now=True, verbose_name='Create Time')),
            ],
        ),
        migrations.CreateModel(
            name='Operation',
            fields=[
                ('opid', models.CharField(max_length=48, primary_key=True, serialize=False, verbose_name='OPID')),
                ('datetime', models.DateTimeField(auto_now=True, verbose_name='Operation Datetime')),
                ('multiple_site', models.BooleanField(default=False, verbose_name='Multiple Site')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
                ('create_time', models.DateTimeField(auto_now=True, verbose_name='Create Time')),
            ],
        ),
        migrations.CreateModel(
            name='OperationType',
            fields=[
                ('optid', models.CharField(max_length=48, primary_key=True, serialize=False, verbose_name='OPTID')),
                ('name', models.CharField(max_length=128, verbose_name='Type Name')),
                ('note', models.TextField(blank=True, null=True, verbose_name='Note')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
                ('create_time', models.DateTimeField(auto_now=True, verbose_name='Create Time')),
            ],
        ),
        migrations.CreateModel(
            name='PestsDiseases',
            fields=[
                ('pdid', models.CharField(max_length=48, primary_key=True, serialize=False, verbose_name='PDID')),
                ('name', models.CharField(max_length=128, verbose_name='Pests/Diseases')),
                ('note', models.TextField(blank=True, null=True, verbose_name='Note')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
                ('create_time', models.DateTimeField(auto_now=True, verbose_name='Create Time')),
            ],
        ),
        migrations.AlterField(
            model_name='chemical',
            name='entered_year',
            field=models.CharField(blank=True, max_length=32, null=True, verbose_name='Entered Year'),
        ),
        migrations.AlterField(
            model_name='site',
            name='crop_year',
            field=models.CharField(blank=True, max_length=32, null=True, verbose_name='Crop Year'),
        ),
        migrations.AlterField(
            model_name='site',
            name='size',
            field=models.CharField(default=1, max_length=32, verbose_name='Size'),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='PurchaseRecord',
            fields=[
                ('prid', models.CharField(max_length=48, primary_key=True, serialize=False, verbose_name='PRID')),
                ('pur_datetime', models.DateTimeField(blank=True, null=True, verbose_name='Purchase Datetime')),
                ('vendor', models.CharField(blank=True, max_length=64, null=True, verbose_name='Vendor')),
                ('amount', models.CharField(max_length=32, verbose_name='Amount')),
                ('cost_per_unit', models.CharField(max_length=32, verbose_name='Cost Per Unit')),
                ('total_cost', models.CharField(max_length=32, verbose_name='Total Cost')),
                ('note', models.TextField(blank=True, null=True, verbose_name='Note')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
                ('create_time', models.DateTimeField(auto_now=True, verbose_name='Create Time')),
                ('chemical', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='pr_chem', to='api.chemical', verbose_name='Chemical')),
                ('operator', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='pr_op_user', to='api.user', verbose_name='Operator')),
                ('opid', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='pr_op', to='api.operation', verbose_name='OPID')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='pr_user', to='api.user', verbose_name='User')),
            ],
        ),
        migrations.AddField(
            model_name='operation',
            name='type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='op_type', to='api.operationtype', verbose_name='Operation Type'),
        ),
        migrations.AddField(
            model_name='operation',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='op_user', to='api.user', verbose_name='User'),
        ),
        migrations.CreateModel(
            name='HarvestRecord',
            fields=[
                ('hrid', models.CharField(max_length=48, primary_key=True, serialize=False, verbose_name='HRID')),
                ('har_datetime', models.DateTimeField(blank=True, null=True, verbose_name='Harvest Datetime')),
                ('planting_date', models.DateField(blank=True, null=True, verbose_name='Planting Date')),
                ('bloom_date', models.DateField(blank=True, null=True, verbose_name='Bloom Date')),
                ('hr_area', models.CharField(max_length=32, verbose_name='Harvest Area')),
                ('rows', models.CharField(max_length=32, verbose_name='Rows')),
                ('tracing_no', models.CharField(blank=True, max_length=128, null=True, verbose_name='Tracking No.')),
                ('note', models.TextField(blank=True, null=True, verbose_name='Note')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
                ('create_time', models.DateTimeField(auto_now=True, verbose_name='Create Time')),
                ('area_unit', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='hr_unit', to='api.unit', verbose_name='Area Unit')),
                ('crop', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='hr_crop', to='api.crop', verbose_name='Crop')),
                ('operator', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='hr_op_user', to='api.user', verbose_name='Operator')),
                ('opid', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='hr_op', to='api.operation', verbose_name='OPID')),
                ('site', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='hr_site', to='api.site', verbose_name='Site')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='hr_user', to='api.user', verbose_name='User')),
            ],
        ),
        migrations.CreateModel(
            name='ApplicationRecord',
            fields=[
                ('arid', models.CharField(max_length=48, primary_key=True, serialize=False, verbose_name='ARID')),
                ('app_datetime', models.DateTimeField(blank=True, null=True, verbose_name='Harvest Datetime')),
                ('water_use', models.BooleanField(verbose_name='Water Use')),
                ('application_rate', models.CharField(max_length=32, verbose_name='Application Rate')),
                ('total_amount', models.CharField(max_length=32, verbose_name='Total Amount')),
                ('total_cost', models.CharField(max_length=32, verbose_name='Total Cost')),
                ('applied_area', models.CharField(max_length=32, verbose_name='Applied Area')),
                ('wind_speed', models.CharField(blank=True, max_length=32, null=True, verbose_name='Wind Speed')),
                ('wind_direction', models.SmallIntegerField(blank=True, choices=[('1', 'east'), ('2', 'north'), ('3', 'south'), ('4', 'west'), ('5', 'southwest'), ('6', 'northwest'), ('7', 'southeast'), ('8', 'northeast')], null=True, verbose_name='Wind Direction')),
                ('average_temp', models.CharField(blank=True, max_length=32, null=True, verbose_name='Average Temperature')),
                ('note', models.TextField(blank=True, null=True, verbose_name='Note')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
                ('create_time', models.DateTimeField(auto_now=True, verbose_name='Create Time')),
                ('amount_unit', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ar_amount_opu', to='api.unit', verbose_name='Amount Unit')),
                ('area_unit', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ar_area_unit', to='api.unit', verbose_name='Amount Unit')),
                ('chemical', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ar_chem', to='api.chemical', verbose_name='Chemical')),
                ('crop', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ar_crop', to='api.crop', verbose_name='Crop')),
                ('customer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ar_customer_user', to='api.user', verbose_name='Customer')),
                ('decision_support', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ar_decision_support', to='api.decisionsupport', verbose_name='Decision Support')),
                ('growth_stage', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ar_growth_stage', to='api.cropgrowthstage', verbose_name='Growth Stage')),
                ('operator', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ar_op_user', to='api.user', verbose_name='Operator')),
                ('opid', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ar_op', to='api.operation', verbose_name='OPID')),
                ('rate_unit', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ar_rate_unit', to='api.unit', verbose_name='Rate Unit')),
                ('site', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ar_site', to='api.site', verbose_name='Site')),
                ('target', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ar_pd', to='api.pestsdiseases', verbose_name='Pests/Diseases')),
                ('type', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ar_type', to='api.applicationtype', verbose_name='Application Type')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ar_user', to='api.user', verbose_name='User')),
                ('water_unit', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ar_water_unit', to='api.unit', verbose_name='Water Unit')),
            ],
        ),
    ]
