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
      'questions_count': self.question_set.count()
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
      'category_slug': self.category.slug,
      'asked_by': self.asked_by.username,
      'asked_by_name': self.asked_by.name,
      'asked_by_avatar': self.asked_by.avatar.url,
      'title': self.title,
      'content': self.content,
      'answers_count': self.answer_set.count(),
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
      'question': self.question.title,
      'by': self.by.username,
      'by_name': self.by.name,
      'by_username': self.by.username,
      'by_avatar': self.by.avatar.url,
      'content': self.content,
      'accepted': self.accepted,
      'likes_count': self.likes.count(),
      'liked_by': list(self.likes.values('id', 'username')),
      'created_at': self.created_at.isoformat(),
    }