# Generated by Django 4.1.6 on 2023-02-17 18:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_alter_chemical_restricted_use_alter_chemical_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chemical',
            name='phi',
            field=models.CharField(max_length=32, verbose_name='PHI'),
        ),
        migrations.AlterField(
            model_name='chemical',
            name='rei',
            field=models.CharField(max_length=32, verbose_name='REI'),
        ),
    ]