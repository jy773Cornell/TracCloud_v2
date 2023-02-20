# Generated by Django 4.1.6 on 2023-02-17 18:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_chemical'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chemical',
            name='restricted_use',
            field=models.BooleanField(default=False, verbose_name='Restricted Use'),
        ),
        migrations.AlterField(
            model_name='chemical',
            name='type',
            field=models.CharField(max_length=128, verbose_name='Product Type'),
        ),
    ]