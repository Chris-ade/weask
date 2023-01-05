from django.shortcuts import render
from django.shortcuts import redirect
from django.urls import reverse
from django.template.loader import render_to_string
from django.db.models import Q
from django.contrib import messages
from django.conf import settings
from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import *
from .forms import *
import random

@login_required
def home(request):
  '''Home
  
  Note:
      Presents the current user dashboard.

  Args:
      request (object): The current request object containing details about the current logged on user's session.

  Returns:
      HttpResponse (object): Returns a page containing the dashboard.
  '''
  user = request.user
  questions = Question.objects.filter(asked_by=user)[:10]
  lookups = Q(asked_by=user) | Q(answer__by=user)
  recommended = Question.objects.exclude(lookups).order_by('?')[:5]
  suggestions = Category.objects.order_by('?')[:5]
  context = {
    'page_title': 'Home',
    'questions': questions,
    'recommended': recommended,
    'suggestions': suggestions
  }
  return render(request, 'core/content.html', context)

@login_required
def explore(request):
  '''Explore
  
  Note:
      Fetch all the available categories.

  Args:
      request (object): The current request object containing details about the current logged on user's session.

  Returns:
      HttpResponse (object): Returns a page containing the categories.
  '''
  category = Category.objects.all
  return render(request, 'core/categories/content.html', {'categories': category, 'page_title': 'Categories'})

@login_required
def questions(request, slug):
  '''Questions
  
  Note:
      Retreives all the questions under a category.

  Args:
      request (object): The current request object containing details about the current logged on user's session.
      slug (string): The category slug in which questions should be retreived.

  Raises:
      DoesNotExist: if `slug` doesn't match any category.

  Returns:
      HttpResponse (object): Returns a page containing the questions if successful or returns a 404 error page.
  '''
  try:
    categories = Category.objects.all
    category = Category.objects.get(slug=slug)
    category_name = category.name
    questions = Question.objects.filter(category__slug=slug)
    return render(request, 'core/questions/content.html', {'page_title': category_name,'questions': questions, 'categories': categories, 'page_slug': slug})
  except Category.DoesNotExist:
    return render(request, 'errors/404.html')

@login_required
def create(request):
  '''Create
  
  Note:
      Presents a page with a form for asking questions.

  Args:
      request (object): The current request object containing details about the current logged on user's session.

  Returns:
      HttpResponse (object): Returns a page.
  '''
  form = post_form()
  context = {
    'page_title': 'Ask a question',
    'form': form,
  }
  return render(request, 'core/partials/create.html', context)

@login_required
def post(request):
  '''Post question
  
  Note:
      Submits a question.

  Args:
      request (object): The current request object containing details about the current logged on user's session.

  Raises:
      DoesNotExist: if the submitted form category doesn't match any category. 

  Returns:
      JsonResponse (object): Returns a JSON object containing the created question if successful or a JSON object with an error code otherwise.
  '''
  if request.method == 'POST':
    form = post_form(request.POST)
    if form.is_valid():
      user = request.user
      title = form.cleaned_data['title']
      content = form.cleaned_data['content']
      category = form.cleaned_data['category']
      try:
        category_obj = Category.objects.get(id=int(category))
        obj = Question.objects.create(title=title, asked_by=user, content=content, category=category_obj)
        obj.save()
        return JsonResponse({'status': 200, 'message': 'Posted!'})
      except Category.DoesNotExist:
        return JsonResponse({'status': 400, 'message': 'An error occurred!'}, status=400)
    return JsonResponse({'status': 400, 'message': 'Invalid form!'}, status=400)
  return JsonResponse({'status': 400}, status=400)

@login_required
def like_question(request, target):
  '''Like questions
  
  Note:
      Likes a question.

  Args:
      request (object): The current request object containing details about the current logged on user's session.
      target (int): The question pk. 

  Raises:
      DoesNotExist: if the submitted form category doesn't match any category. 

  Returns:
      HttpResponse (object): Returns a template containing the liked question to re-render if successful or a JSON object with an error code otherwise.
  '''
  if request.method == 'POST':
    view = request.POST['view']
    view = int(view)
  else:
    view = 0
  try:
    obj = Question.objects.get(id=int(target))
    if not obj.likes.filter(id=request.user.id).exists():
      obj.likes.add(request.user)
      obj.save()
      if view == 1:
        return render(request, 'core/questions/partials/view.html', {'question': obj})
      return render(request, 'core/questions/partials/question.html', {'question': obj})
    obj.likes.remove(request.user)
    obj.save()
    if view == 1:
      return render(request, 'core/questions/partials/view.html', {'question': obj})
    return render(request, 'core/questions/partials/question.html', {'question': obj})
  except Question.DoesNotExist:
    return JsonResponse({'status': 400}, status=400)

@login_required
def view(request, slug, pk):
  '''View question
  
  Note:
      Renders a question full view.

  Args:
      request (object): The current request object containing details about the current logged on user's session.
      slug (string): The category slug.
      pk (int): The question pk.

  Raises:
      Category.DoesNotExist: if `slug` doesn't match any category. 
      Question.DoesNotExist: if `pk` doesn't match any question. 

  Returns:
      HttpResponse (object): Returns a page containing the requested question if successful or returns a 404 error page otherwise.
  '''
  try:
    categories = Category.objects.all
    category = Category.objects.get(slug=slug)
    question = Question.objects.get(id=pk, category__slug=slug)
    form = answer_form()
    title = question.title[:20] + '...'
    if question.answer_set.filter(accepted=1).exists():
      has_accepted = True
    else:
      has_accepted = False
    return render(request, 'core/questions/view/content.html', {'question': question, 'categories': categories, 'page_title': title, 'form': form, 'has_accepted': has_accepted})
  except (Category.DoesNotExist, Question.DoesNotExist):
    return render(request, 'errors/404.html')

@login_required
def answer(request):
  '''Post answer
  
  Note:
      Submits an answer if request method is POST or a JsonResponse with an error code.

  Args:
      request (object): The current request object containing details about the current logged on user's session.

  Raises:
      DoesNotExist: if the `target` doesn't match any question. 

  Returns:
      HttpResponse (object): Returns a template containing the submitted answer if successful or a JsonResponse with an error code otherwise.
  '''
  if request.method == 'POST':
    form = answer_form(request.POST)
    if form.is_valid():
      content = form.cleaned_data['content']
      target = form.cleaned_data['target']
      user = request.user
      try:
        question = Question.objects.get(id=int(target))
        obj = Answer.objects.create(question=question, by=user, content=content)
        obj.save()
        return render(request, 'core/questions/partials/answer.html', {'answer': obj})
      except Question.DoesNotExist:
        return JsonResponse({'status': 400}, status=400)
    return JsonResponse({'status': 400, 'message': 'Invalid form!'}, status=400)
  return JsonResponse({'status': 400}, status=400)

@login_required
def like_answer(request, target):
  '''Like answer
  
  Note:
      Likes an answer.

  Args:
      request (object): The current request object containing details about the current logged on user's session
      target (int): The answer pk.

  Raises:
      DoesNotExist: if the submitted form category doesn't match any category. 

  Returns:
      HttpResponse (object): Returns a template containing the liked answer to re-render if successful or a JsonResponse with an error code otherwise.
  '''
  try:
    obj = Answer.objects.get(id=int(target))
    if not obj.likes.filter(id=request.user.id).exists():
      obj.likes.add(request.user)
      obj.save()
      return render(request, 'core/questions/partials/answer.html', {'answer': obj})
    obj.likes.remove(request.user)
    obj.save()
    return render(request, 'core/questions/partials/answer.html', {'answer': obj})
  except Answer.DoesNotExist:
    return JsonResponse({'status': 400}, status=400)

@login_required
def accept_answer(request, target):
  '''Accept answer
  
  Note:
      Accepts an answer.

  Args:
      request (object): The current request object containing details about the current logged on user's session.
      target (int): The answer pk.

  Raises:
      Question.DoesNotExist: if the submitted form `question` doesn't match any question.
      Answer.DoesNotExist: if `target` doesn't match any answer.

  Returns:
      HttpResponse (object): Returns a page  containing the accepted answer if successful or a JsonResponse with an error code otherwise.
  '''
  if request.method == 'POST':
    question = request.POST.get('question', 0)
    try:
      question = Question.objects.get(id=int(question))
      if not question.answer_set.filter(accepted=1).exists():
        obj = Answer.objects.get(id=int(target), question__asked_by=request.user)
        obj.accepted = True
        obj.save()
        return render(request, 'core/questions/partials/answer.html', {'answer': obj, 'has_accepted': True})
      return JsonResponse({'status': 400}, status=400)
    except (Question.DoesNotExist, Answer.DoesNotExist):
      return JsonResponse({'status': 400}, status=400)
  return JsonResponse({'status': 400}, status=400)

@login_required
def search(request):
  '''Search
  
  Note:
      Searches for questions, categories or users if request method is POST or returns the search page otherwise.

  Args:
      request (object): The current request object containing details about the current logged on user's session.

  Returns:
      HttpResponse (object): Returns a template containing the search result if successful or a JsonResponse with an error code.
  '''
  if request.method == 'POST':
    form = search_form(request.POST)
    if form.is_valid():
      query = form.cleaned_data['query']
      filter = form.cleaned_data['filter']
      if filter == 'q':
        lookups = Q(title__iexact=query) | Q(title__icontains=query)
        obj = Question.objects.filter(lookups).distinct()
        html = render_to_string('core/questions/partials/search_result.html', {'questions': obj, 'no_results': obj.count(), 'context': 'questions'})
        return JsonResponse({'status': 200, 'html': html})
      elif filter == 'c':
        lookups = Q(name__iexact=query) | Q(name__icontains=query)
        obj = Category.objects.filter(lookups).distinct()
        html = render_to_string('core/questions/partials/search_result.html', {'categories': obj, 'no_results': obj.count(), 'context': 'categories'})
        return JsonResponse({'status': 200, 'html': html})
      elif filter == 'u':
        lookups = Q(name__iexact=query) | Q(username__iexact=query)
        obj = User.objects.filter(lookups).distinct()
        html = render_to_string('core/questions/partials/search_result.html', {'users': obj, 'no_results': obj.count(), 'context': 'users'})
        return JsonResponse({'status': 200, 'html': html})
    return JsonResponse({'status': 403}, status=403)
  else:
    context = {
      'page_title': 'Search',
      'form': search_form(),
    }
    return render(request, 'core/search/content.html', context)