# Generated by Django 4.1.6 on 2023-03-17 15:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_remove_cropcategory_create_time_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductBase',
            fields=[
                ('pbid', models.CharField(max_length=48, primary_key=True, serialize=False, verbose_name='PBID')),
                ('product_id_dec', models.CharField(max_length=32, verbose_name='Product ID_DEC')),
                ('epa_reg_no_dec', models.CharField(max_length=32, verbose_name='EPA REG NO_DEC')),
                ('product_name_dec', models.CharField(max_length=128, verbose_name='Product Name_DEC')),
                ('restricted_use_dec', models.CharField(max_length=16, verbose_name='Restricted Use_DEC')),
                ('product_status_dec', models.CharField(max_length=32, verbose_name='Product Status_DEC')),
                ('company_code_dec', models.CharField(blank=True, max_length=32, null=True, verbose_name='Company Code_DEC')),
                ('company_name_dec', models.CharField(blank=True, max_length=128, null=True, verbose_name='Company Name_DEC')),
                ('pc_name_dec', models.CharField(blank=True, max_length=256, null=True, verbose_name='PC Name_DEC')),
                ('pc_pt_dec', models.CharField(blank=True, max_length=128, null=True, verbose_name='PC Pt_DEC')),
                ('product_type_dec', models.CharField(blank=True, max_length=64, null=True, verbose_name='Product Type_DEC')),
                ('product_use_dec', models.CharField(blank=True, max_length=64, null=True, verbose_name='Product Use_DEC')),
                ('epa_reg_no_epa', models.CharField(blank=True, max_length=32, null=True, verbose_name='EPA REG NO_EPA')),
                ('product_name_epa', models.CharField(blank=True, max_length=128, null=True, verbose_name='Product Name_EPA')),
                ('previous_reg_no_epa', models.CharField(blank=True, max_length=256, null=True, verbose_name='Previous Reg No_EPA')),
                ('distributor_reg_no_epa', models.CharField(blank=True, max_length=256, null=True, verbose_name='Distributor Reg No_EPA')),
                ('distributor_product_name_epa', models.CharField(blank=True, max_length=256, null=True, verbose_name='Previous Reg No_EPA')),
                ('restricted_use_epa', models.CharField(blank=True, max_length=16, null=True, verbose_name='Restricted Use_EPA')),
                ('product_status_epa', models.CharField(blank=True, max_length=32, null=True, verbose_name='Product Status_EPA')),
                ('company_code_epa', models.CharField(blank=True, max_length=32, null=True, verbose_name='Company Code_EPA')),
                ('company_name_epa', models.CharField(blank=True, max_length=128, null=True, verbose_name='Company Name_EPA')),
                ('pc_name_epa', models.CharField(blank=True, max_length=256, null=True, verbose_name='PC Name_EPA')),
                ('pc_pt_epa', models.CharField(blank=True, max_length=128, null=True, verbose_name='PC Pt_EPA')),
                ('product_type_epa', models.CharField(blank=True, max_length=64, null=True, verbose_name='Product Type_EPA')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
                ('refresh_time', models.DateTimeField(auto_now=True, verbose_name='Refresh Time')),
            ],
        ),
        migrations.AlterField(
            model_name='cropgrowthstage',
            name='crop',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='growth_stage_category', to='api.cropcategory', verbose_name='Crop'),
        ),
        migrations.AlterField(
            model_name='cropvariety',
            name='crop',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='variety_category', to='api.cropcategory', verbose_name='Crop'),
        ),
    ]