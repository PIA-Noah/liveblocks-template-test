# Generated by Django 5.0.6 on 2024-07-04 12:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0010_remove_userconright_chief_orgconright_chief_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='fileaccess',
            name='is_public',
        ),
        migrations.AddField(
            model_name='file',
            name='is_public',
            field=models.BooleanField(default=False),
        ),
    ]
