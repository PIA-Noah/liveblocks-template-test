# Generated by Django 5.0.6 on 2024-06-25 13:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0002_rename_changeoccur_mailbell_newchange_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='orgconright',
            old_name='nb_acct',
            new_name='nb_access',
        ),
    ]