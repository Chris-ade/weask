from accounts.models import User
from core.models import Category, Question, Answer
from django.db.models import Q
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

from .utils import response
from api.serializers import *

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fetch_questions(request):
    user = request.user
    questions = Question.objects.filter(asked_by=user).order_by('-created_at')[:10]
    if questions.exists():
      data = {
        'success': True,
        'questions': [q.json() for q in questions]
      }
    else:
      data = {
        'success': False,
        'message': 'No questions available.',
      }
    return response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def recommended(request):
    user = request.user
    lookups = Q(asked_by=user) | Q(answer__by=user)
    recommended = Question.objects.exclude(lookups).order_by('?')[:5]
    if recommended.exists():
        data = {
            'success': True,
            'questions': [q.json for q in recommended]
        }
    else:
        data = {
            'success': False,
        }
    return response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def suggestions(request):
    suggestions = Category.objects.order_by('?')[:5]
    if suggestions.exists():
        data = {
            'success': True,
            'categories': [c.json() for c in suggestions]
        }
    else:
        data = {
            'success': False,
        }
    return response(data)
  
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request, username):
  '''
  Returns the requested user information.
  '''
  try:
      user = User.objects.get(username=username)
      user_data = UserSerializer(user).data
      return response({'success': True, 'user': user_data}, 200)
  except User.DoesNotExist:
      return response({'success': False, 'message': 'An account with that username does not exist.'}, 404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def categories(request):
  '''
  Return an API endpoint for all the available categories.
  '''
  category = Category.objects.all()
  if category.exists():
      data = {'success': True, 'categories': CategorySerializer(category, many=True).data}
      return response(data, 200)
  else:
      data = {'success': False, 'message': 'No categories available'}
      return response(data, 404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def questions(request, slug):
  try:
    categories = Category.objects.all()
    category = Category.objects.get(slug=slug)
    category_name = category.name
    questions = Question.objects.filter(category__slug=slug)
    if questions.exists():
      data = {
        'success': True,
        'category_name': category_name,
        'category_slug': slug,
        'categories': CategorySerializer(categories, many=True).data,
        'questions': [q.json() for q in questions]
      }
    else:
      data = {
        'success': False,
        'category_name': category_name,
        'category_slug': slug,
        'categories': CategorySerializer(categories, many=True).data,
        'message': 'No questions available.',
      }
    return response(data)
  except Category.DoesNotExist:
    data = {
      'success': False,
      'message': 'Category does not exist.'
    }
    return response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_questions(request):
  '''Fetch questions
  
  Note:
      Fetch all the current user questions.

  Args:
      request (object): The current request object containing details about the current logged on user's session.

  Returns:
      HttpResponse (object): Returns a template containing all the fetched questions.
  '''
  user = request.user
  questions = user.question_set.all()
  questions_data = QuestionSerializer(questions, many=True).data
  return response({'success': True, 'questions': questions_data}, 200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def with_answers(request):
  '''Fetch answers
  
  Note:
      Fetch all the current user answers to questions.

  Args:
      request (object): The current request object containing details about the current logged on user's session.

  Returns:
      HttpResponse (object): Returns a template containing all the fetched answers with the questions on which they are submitted.
  '''
  user = request.user
  questions = Answer.objects.filter(by=user)
  questions_data = AnswerSerializer(questions, many=True).data
  return response({'success': True, 'questions': questions_data}, 200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_likes(request):
  '''Fetch all likes
  
  Note:
      Fetch all the questions which the current user liked.

  Args:
      request (object): The current request object containing details about the current logged on user's session.

  Returns:
      HttpResponse (object): Returns a template containing all the fetched questions.
  '''
  user = request.user
  questions = user.question_set.filter(likes=request.user)
  questions_data = QuestionSerializer(questions, many=True).data
  return response({'success': True, 'questions': questions_data}, 200)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def profile_settings(request):
  '''User profile settings
  
  Note:
      Fetch the current user data.
      If the request method is POST, updates the user's data in regards to the submitted form.
      
  Args:
      request (object): The current request object containing details about the current logged on user's session.

  Returns:
      HttpResponse (object): Returns a page containing a form filled with the user's data.
  '''
  user = request.user
  serializer = SettingsSerializer(data=request.data)
  if serializer.is_valid():
      bio = serializer.validated_data['bio']
      location = serializer.validated_data['location']

      avatar = request.FILES.get('avatar', None)
      cover = request.FILES.get('cover', None)

      if avatar is not None:
          user.avatar = avatar
      if cover is not None:
          user.cover = cover
      
      user.bio = bio
      user.location = location
      user.save()
      
      data = {
        'bio': user.bio,
        'location': user.location
      }
      return response({'success': True, 'message': 'Profile updated.'}, 200)
  else:
    return response({'success': False, 'message': serializer.errors}, 400)

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_question(request):
  '''
  Creates an endpoint for submitting a new question.
  '''
  if request.method == 'POST':
    user = request.user
    title = request.data.get('title', '')
    content = request.data.get('content', '')
    category = request.data.get('category', '')

    try:
      category_obj = Category.objects.get(slug=category)
      obj = Question.objects.create(title=title, asked_by=user, content=content, category=category_obj)
      obj.save()
      
      data = {
        'success': True,
        'message': 'Posted.'
      }
      return response(data)
    except Category.DoesNotExist:
      return response({'success': False}, 404)
  return response({'success': False, 'message': 'An error occurred!'}, 400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_question(request):
    '''
    Creates an endpoint for liking a question.
    '''
    target = request.data.get('target', None)
    if (target is None or target == ''):
        return response(422)
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
            return response(data)
        obj.likes.remove(user)
        obj.save()
        data = {
            'success': True,
            'message': 'Unliked',
            'unliked': obj.id
        }
        return response(data)
    except Question.DoesNotExist:
        return response(404)
    except ValueError:
        return response(422)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view(request, slug, pk):
  '''
  Creates an endpoint for getting a question by pk.
  '''
  try:
    category = Category.objects.get(slug=slug)
    question = Question.objects.get(id=pk, category__slug=slug)
    answers = question.answer_set.all()
    title = question.title[:20] + '...'
    data = {
      'success': True,
      'page_title': title,
      'category_name': category.name,
      'category_slug': slug,
      'question': [question.json()],
      'answers': [ans.json() for ans in answers]
    }
    return response(data, 200)
  except Category.DoesNotExist:
    data = {
      'success': False,
      'message': 'Category does not exist',
    }
    return response(data, 404)
  except Question.DoesNotExist:
    data = {
      'success': False,
      'message': 'Question does not exist',
    }
    return response(data, 404)

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_answer(request):
    '''
    Creates an endpoint for submitting an answer.
    '''
    content = request.data.get('content', None)
    target = request.data.get('target', None)
    user = request.user
    
    if (content is None or target is None):
        return response({'success': False, 'message': 'An error occurred!'}, 400)
    
    try:
        question = Question.objects.get(id=int(target))
        obj = Answer.objects.create(question=question, by=user, content=content)
        obj.save()
        data = {
            'success': True,
            'message': 'Answer submitted',
            'submitted': obj.id
        }
        return response(data)
    except Question.DoesNotExist:
        return response({'success': False, 'message': 'Question does not exist.'}, 404)
    except ValueError:
        return response({'success': False, 'message': 'An error occurred!'}, 400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_answer(request):
    '''
    Creates an endpoint for liking an answer.
    '''
    target = request.data.get('target', None)
    
    if (target is None):
        return response({'success': False, 'message': 'An error occurred!'}, 400)

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
            return response(data)
        obj.likes.remove(request.user)
        obj.save()
        data = {
            'success': True,
            'message': 'Unliked',
            'liked': obj.id
        }
        return response(data)
    except Answer.DoesNotExist:
        return response({'success': True, 'message': 'Answer does not exist.'}, 404)

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
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def search(request):
    '''
    Creates an endpoint for searching questions, categories or users matching the search term.
    '''
    query = request.data.get('query', None)
    filter = request.data.get('filter', None)

    if (query is None):
        return response({'success': False, 'message': 'The search query can\'t be empty.'})
    elif (filter is None):
        return response({'success': False, 'message': 'No option was selected.'})
    
    if filter == 'q':
        lookups = Q(title__iexact=query) | Q(title__icontains=query)
        obj = Question.objects.filter(lookups).distinct()
        
        if obj.exists():
            data = {
              'success': True,
              'result_count': obj.count(),
              'questions': [q.json() for q in obj],
              'context': 'questions'
            }
        else:
            data = {'success': False}
        return response(data)

    elif filter == 'c':
        lookups = Q(name__iexact=query) | Q(name__icontains=query)
        obj = Category.objects.filter(lookups).distinct()
        if obj.exists():
            data = {
              'success': True,
              'result_count': obj.count(),
              'categories': [q.json() for q in obj],
              'context': 'categories'
            }
        else:
            data = {'success': False}
        return response(data)
    
    elif filter == 'u':
        lookups = Q(name__iexact=query) | Q(username__iexact=query)
        obj = User.objects.filter(lookups).distinct()
        if obj.exists():
            data = {
              'success': True,
              'result_count': obj.count(),
              'users': [q.stats_json() for q in obj],
              'context': 'users'
            }
        else:
            data = {'success': False}
        return response(data)
  
    else:
        return response({'success': False, 'message': 'An error occurred!'})