# Generated by Django 4.1.5 on 2023-04-11 19:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0049_alter_applicationrecord_chemical_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='applicationrecord',
            name='chemical',
        ),
        migrations.AddField(
            model_name='applicationrecord',
            name='chemical_purchase',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ar_purchase', to='api.purchaserecord', verbose_name='Chemical Purchase'),
        ),
    ]