from accounts.models import User
from core.models import Category, Question, Answer
from django.db.models import Q
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
import json

@login_required
def categories(request):
  '''
  Return an API endpoint for all the available categories.
  '''
  category = Category.objects.all()
  if category.exists():
    data = {
      'success': True,
      'categories': [cat.json() for cat in category]
    }
  else:
    data = {
      'success': False,
      'message': 'No categories available',
    }
  return _response(data)

@login_required
def questions(request, slug):
  try:
    category = Category.objects.get(slug=slug)
    category_name = category.name
    questions = Question.objects.filter(category__slug=slug)
    if questions.exists():
      data = {
        'success': True,
        'category_name': category_name,
        'category_slug': slug,
        'questions': [q.json() for q in questions]
      }
    else:
      data = {
        'success': False,
        'category_name': category_name,
        'category_slug': slug,
        'message': 'No questions available.',
      }
    return _response(data)
  except Category.DoesNotExist:
    data = {
      'success': False,
      'message': 'Category does not exist.'
    }
    return _response(data)

@csrf_exempt
def post(request):
  '''
  Creates an endpoint for submitting a new question.
  '''
  if request.method == 'POST':
    request_body = json.loads(request.body)
    user = request.user
    title = request_body.get('title', '')
    content = request_body.get('content', '')
    category = request_body.get('category', '')
    try:
      category_obj = Category.objects.get(id=int(category))
      obj = Question.objects.create(title=title, asked_by=user, content=content, category=category_obj)
      obj.save()
      data = {
        'success': True,
        'message': 'Posted.'
      }
      return _response(data)
    except Category.DoesNotExist:
      return _abort(404, 'Requested resource does not exist.')
  return _abort(422, 'Request unprocessable')

@csrf_exempt
def like_question(request):
  '''
  Creates an endpoint for liking a question.
  '''
  if request.method == 'POST':
    request_body = json.loads(request.body)
    target = request_body.get('target', None)
    if (target is None or target == ''):
      return _abort(422, 'Request unprocessable')
    try:
      obj = Question.objects.get(id=int(target))
      user = User.objects.get(id=1)
      if not obj.likes.filter(id=user.id).exists():
        obj.likes.add(user)
        obj.save()
        data = {
          'success': True,
          'message': 'Liked',
          'liked': obj.id
        }
        return _response(data)
      obj.likes.remove(user)
      obj.save()
      data = {
          'success': True,
          'message': 'Unliked',
          'unliked': obj.id
        }
      return _response(data)
    except Question.DoesNotExist:
      return _abort(404, 'Question does not exist')
    except ValueError:
      return _abort(422, 'Request unprocessable')
  return _abort(422, 'Request unprocessable')

@login_required
def view(request, slug, pk):
  '''
  Creates an endpoint for getting a question by pk.
  '''
  try:
    category = Category.objects.get(slug=slug)
    question = Question.objects.get(id=pk, category__slug=slug)
    title = question.title[:20] + '...'
    data = {
      'success': True,
      'page_title': title,
      'category_name': category.name,
      'category_slug': slug,
      'question': [question.json()]
    }
    return _response(data)
  except Category.DoesNotExist:
    data = {
      'success': False,
      'message': 'Category does not exist',
    }
    return _response(data)
  except Question.DoesNotExist:
    data = {
      'success': False,
      'message': 'Question does not exist',
    }
    return _response(data)

@csrf_exempt
def answer(request):
  '''
  Creates an endpoint for submitting an answer.
  '''
  if request.method == 'POST':
    request_body = json.loads(request.body)
    content = request_body.get('content', '')
    target = request_body.get('target', '')
    user = request.user
    if(content is None or target is None) | (content == '' or target == ''):
      return _abort(422, 'Request unprocessable')
    try:
      question = Question.objects.get(id=int(target))
      obj = Answer.objects.create(question=question, by=user, content=content)
      obj.save()
      data = {
        'success': True,
        'message': 'Answer submitted',
        'submitted': obj.id
      }
      return _response(data)
    except Question.DoesNotExist:
      return _abort(404, 'Question does not exist.')
    except ValueError:
      return _abort(422, 'Request unprocessable')
  return _abort(422, 'Request unprocessable')

@login_required
def like_answer(request, target):
  '''
  Creates an endpoint for liking an answer.
  '''
  try:
    obj = Answer.objects.get(id=int(target))
    if not obj.likes.filter(id=request.user.id).exists():
      obj.likes.add(request.user)
      obj.save()
      data = {
        'success': True,
        'message': 'Liked',
        'liked': obj.id
      }
      return _response(data)
    obj.likes.remove(request.user)
    obj.save()
    data = {
        'success': True,
        'message': 'Unliked',
        'liked': obj.id
      }
    return _response(data)
  except Answer.DoesNotExist:
    return _abort(404, 'Answer does not exist.')

@csrf_exempt
def accept_answer(request, target):
  '''
  Creates an endpoint for accepting an answer
  '''
  if request.method == 'POST':
    request_body = json.loads(request.body)
    question = request_body.get('question', 0)
    try:
      question = Question.objects.get(id=int(question))
      if not question.answer_set.filter(accepted=1).exists():
        obj = Answer.objects.get(id=int(target), question__asked_by=request.user)
        obj.accepted = True
        obj.save()
        data = {
          'success': True,
          'message': 'Accepted'
        }
        return _response(data)
      return _abort(422, 'Request unprocessable')
    except (Question.DoesNotExist, Answer.DoesNotExist):
      return _abort(404, 'Requested resource can not be found')
  return _abort(422, 'Request unprocessable')

@csrf_exempt
def search(request):
  '''
  Creates an endpoint for searching questions, categories or users matching the search term.
  '''
  if request.method == 'POST':
    request_body = json.loads(request.body)
    query = request_body.get('query', None)
    filter = request_body.get('filter', None)
    if (query is None) | (filter is None):
      return _abort(422, 'Request unprocessable')
    if filter == 'q':
      lookups = Q(title__iexact=query) | Q(title__icontains=query)
      obj = Question.objects.filter(lookups).distinct()
      if obj.exists():
        data = {
          'success': True,
          'total_questions': obj.count(),
          'questions': [q.json() for q in obj]
        }
      else:
        data = {
          'success': False,
          'message': 'No questions found.',
        }
      return _response(data)
    elif filter == 'c':
      lookups = Q(name__iexact=query) | Q(name__icontains=query)
      obj = Category.objects.filter(lookups).distinct()
      if obj.exists():
        data = {
          'success': True,
          'total_categories': obj.count(),
          'categories': [q.json() for q in obj]
        }
      else:
        data = {
          'success': False,
          'message': 'No categories found.',
        }
      return _response(data)
    elif filter == 'u':
      lookups = Q(name__iexact=query) | Q(username__iexact=query)
      obj = User.objects.filter(lookups).distinct()
      if obj.exists():
        data = {
          'success': True,
          'total_users': obj.count(),
          'users': [q.stats_json() for q in obj]
        }
      else:
        data = {
          'success': False,
          'message': 'No users found.',
        }
      return _response(data)
  else:
    return _abort(422, 'Request unprocessable')

def _abort(code, message):
  '''
  Returns an endpoint with an error code and message
  '''
  data = {
    'success': False,
    'error': code,
    'message': message
  }
  return JsonResponse(data, json_dumps_params={'indent': 4,}, status=code)

def _response(data):
  '''
  Returns an endpoint with data
  '''
  return JsonResponse(data, json_dumps_params={'indent': 4,})