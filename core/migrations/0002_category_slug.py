# Generated by Django 4.1.3 on 2022-12-12 11:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='slug',
            field=models.SlugField(default=None, max_length=20),
            preserve_default=False,
        ),
    ]
