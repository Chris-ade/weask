from django import forms
from .models import *

class post_form(forms.Form):
  """ 
  Creates a form for posting questions
  """
  title = forms.CharField(max_length=50)
  content = forms.CharField(max_length=500, widget=forms.Textarea)
  category = forms.ChoiceField(choices=tuple(Category.objects.values_list('id', 'name')))

class answer_form(forms.Form):
  """
  Creates a form for submitting answers
  """
  content = forms.CharField(max_length=500)
  target = forms.CharField()

class search_form(forms.Form):
  query = forms.CharField()
  choices = (('q', 'Questions'), ('c', 'Categories'), ('u', 'Users'))
  filter = forms.ChoiceField(choices=choices)