from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import datetime

""" 
The model class responsible for creating a newly registered user
"""

def get_image_filename(instance, filename):
    user_id = instance.id
    return "contents/avatars/%s/%s" % (user_id, filename)

def get_cover_image_filename(instance, filename):
    user_id = instance.id
    return "contents/covers/%s/%s" % (user_id, filename)

class User(AbstractUser):
    first_name = None
    last_name = None
    name = models.TextField(max_length=25)
    bio = models.TextField(max_length=150, null=True, blank=True)
    location = models.TextField(max_length=30, null=True, blank=True)
    avatar = models.ImageField(upload_to=get_image_filename, default='default.png')
    cover = models.ImageField(upload_to=get_cover_image_filename, default='default_cover.png')
    
    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.username
    
    def stats_json(self):
      return {
        'username': self.username,
        'name': self.name,
        'avatar': self.avatar.url,
        'cover': self.cover.url,
        'total_questions': self.question_set.count(),
        'total_answers': self.answer_set.count()
      }