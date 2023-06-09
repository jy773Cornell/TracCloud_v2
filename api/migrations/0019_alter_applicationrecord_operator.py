# Generated by Django 4.1.5 on 2023-06-09 12:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_remove_applicationrecord_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='applicationrecord',
            name='operator',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ar_operator_user', to='api.userprofile', verbose_name='Operator'),
        ),
    ]
