# Generated by Django 4.1.5 on 2023-06-01 20:46

from django.db import migrations
import django_fsm


class Migration(migrations.Migration):

    dependencies = [
        ('workflows', '0016_alter_spraycard_state_connection'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spraycard',
            name='state',
            field=django_fsm.FSMField(choices=[('initiated', 'Initiated'), ('assigned', 'Assigned'), ('archived', 'Archived')], default='initiated', max_length=50),
        ),
    ]