from django.test import TestCase
from accounts.models import *
from core.models import Category, Question, Answer

class CoreTestCase(TestCase):
  def setUp(self):
    '''
    Test: Create a new Category object.
    '''
    user = User.objects.create(username='chris_adeh', password='chris_adeh')
    category = Category.objects.create(name='Test', slug='test-category', description='A test category')
    Question.objects.create(category=category, asked_by=user, title='Nigeria in which continent?', content='Which continent is Nigeria in?')

  def test_created_category_with_slug(self):
    '''
    Test: Fetch created category with slug.
    '''
    category = Category.objects.get(slug='test-category')
    self.assertEqual(category.name, 'Test')
    self.assertEqual(category.description, 'A test category')
    
  def test_fetch_all_category(self):
    '''
    Test: Fetch all categories.
    '''
    obj = Category.objects.all()
    self.assertEqual(obj.count(), 1)
  
  def test_get_question(self):
    '''
    Test: Fetch created question with title.
    '''
    obj = Question.objects.filter(title='Nigeria in which continent?')
    self.assertIs(obj.exists(), True)