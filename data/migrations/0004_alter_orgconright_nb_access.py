# Generated by Django 5.0.6 on 2024-06-25 13:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0003_rename_nb_acct_orgconright_nb_access'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orgconright',
            name='nb_access',
            field=models.IntegerField(verbose_name='maximum of access'),
        ),
    ]