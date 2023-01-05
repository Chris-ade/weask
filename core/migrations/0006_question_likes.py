# Generated by Django 4.1.3 on 2022-12-18 06:18

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0005_alter_answers_created_at_alter_category_created_at_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='likes',
            field=models.ManyToManyField(default=None, related_name='likes', to=settings.AUTH_USER_MODEL),
        ),
    ]
