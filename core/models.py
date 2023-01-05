from django.db import models
from datetime import datetime
from accounts.models import *

""" 
The model class responsible for retreiving categories
"""
class Category(models.Model):
  name = models.CharField(max_length=50)
  slug = models.SlugField(max_length=20, default=None)
  description = models.TextField(max_length=100, default=None)
  created_at = models.DateTimeField(auto_now_add=True)
  
  def __str__(self):
    return self.name

  def json(self):
    return {
      'name': self.name,
      'slug': self.slug,
      'description': self.description,
    }

class Question(models.Model):
  category = models.ForeignKey(Category, default=None, on_delete=models.CASCADE)
  asked_by = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
  title = models.CharField(max_length=50)
  content = models.CharField(max_length=500)
  likes = models.ManyToManyField(User,  related_name='likes', blank=True)
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.title

  def json(self):
    return {
      'id': self.id,
      'category': self.category.name,
      'asked_by': self.asked_by.username,
      'title': self.title,
      'content': self.content,
      'likes_count': self.likes.count(),
      'liked_by': list(self.likes.values('id', 'username')),
      'created_at': self.created_at.isoformat(),
    }

class Answer(models.Model):
  question = models.ForeignKey(Question, default=None, on_delete=models.CASCADE)
  by = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
  content = models.CharField(max_length=500)
  likes = models.ManyToManyField(User, related_name='answer_likes', blank=True)
  accepted = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)
  
  class Meta:
    ordering = ('created_at',)

  def __str__(self):
    return f'#{self.id} - {self.question.title} '

  def json(self):
    return {
      'id': self.id,
      'question': self.question.name,
      'by': self.by.username,
      'content': self.content,
      'likes_count': self.likes.count(),
      'liked_by': list(self.likes.values('id', 'username')),
      'created_at': self.created_at.isoformat(),
    }