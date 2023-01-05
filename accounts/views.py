from django.shortcuts import render
from django.shortcuts import redirect
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib.auth.models import auth
from django.contrib import messages
from django.conf import settings
from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import *
from core.models import Answer
from .forms import *

def welcome(request):
  '''Logging in users
  
  Note:
      Displays the login page if the user is not currently logged in.
      Redirects to the home page of the user is logged in.

  Args:
      request (object): The current request object containing details about the current logged on user's session.

  Returns:
      HttpResponse (object): Returns a page.
  '''
  if request.user.is_authenticated:
    return redirect(reverse('core:home'))
  else:
    if request.method == 'POST':
        form = login_form(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = auth.authenticate(username=username, password=password)
            if user:
                auth.login(request, user)
                messages.success(request, f'Welcome back, #{username}')
                return redirect(reverse('core:home'))
            else:
                form = login_form(initial={'username': username, 'password': password})
                messages.error(request, 'Invalid credentials, check and try again!')
                return render(request, 'welcome/content.html', {'page_title': "Welcome", 'form': form})
        else:
            form = login_form(initial={'username': username, 'password': password})
            return render(request, 'welcome.html', {'page_title': "Welcome", 'form': form})
    else:
        form = login_form()
        return render(request, 'welcome/content.html', {'page_title': "Welcome", 'form': form})

def register(request):
  '''Registering new users
  
  Note:
      Displays the sign up page if the user is not currently logged in.
      Redirects to the home page of the user is logged in.

  Args:
      request (object): The current request object containing details about the current logged on user's session.

  Returns:
      HttpResponse (object): Redirects the user to the home page on success, or to the same page otherwise.
  '''
  if request.user.is_authenticated:
    return redirect(reverse('core:home'))
  else:
    if request.method == 'POST':
      form = signup_form(request.POST)
      if form.is_valid():
        name = form.cleaned_data['name']
        username = form.cleaned_data['username']
        email = form.cleaned_data['email']
        password = form.cleaned_data['password']
        cpass = form.cleaned_data['cpass']
        if password == cpass:
            if User.objects.filter(username=username).exists():
                messages.error(request, 'Username taken!, try agaim with something else.')
                return redirect(reverse('accounts:register'))
            else:
                user = User.objects.create_user(username=username, email=email, name=name, password=password)
                user.save()
                user_login = auth.authenticate(username=username, password=password)
                auth.login(request, user_login)
                messages.success(request, f'Welcome, @{username}')
                return redirect(reverse('accounts:settings'))
        else:
            messages.error(request, 'The password does not match')
            return redirect(reverse('accounts:register'))
        
    else:
        form = signup_form()
        return render(request, 'welcome/register.html', {'page_title': "Register an account", 'form': form})

@login_required
def logout(request):
  '''Logging out a user
  
  Note:
      Checks if the request comes from an actual logged on user, then destroys the user's session and logs them out or returns .

  Args:
      request (object): The current request object containing details about the current logged on user's session.

  Returns:
      HttpResponse (object): Redirect to the welcome / login page with a message.
  '''
  if request.user.is_authenticated:
    auth.logout(request)
    response = HttpResponse()
    response['HX-Redirect'] = reverse("accounts:welcome")
    messages.success(request, 'You have been logged out!')
  return redirect(reverse('accounts:welcome'))

@login_required
def profile(request, username):
  '''Displays a user profile
  
  Note:
      Fetch and displays the information of the provided user.

  Args:
      request (object): The current request object containing details about the current logged on user's session.
      username (string): The requested user's username

  Raises:
      DoesNotExist: If `username` does not match any registered username

  Returns:
      HttpResponse (object): Returns a page containing the requested profile.
  '''
  try:
    user_object = User.objects.get(username=username)
    context = {
      'page_title': f'{user_object.name} @({user_object.username})',
      'user': user_object,
    }
    return render(request, 'profile/content.html', context)
  except User.DoesNotExist:
    return render(request, 'errors/404.html')

@login_required
def questions(request):
  '''Fetch questions
  
  Note:
      Fetch all the current user questions.

  Args:
      request (object): The current request object containing details about the current logged on user's session.

  Returns:
      HttpResponse (object): Returns a template containing all the fetched questions.
  '''
  user = request.user
  questions = user.question_set.all
  return render(request, 'profile/questions/content.html', {'questions': questions})

@login_required
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
  return render(request, 'profile/questions/with_answers.html', {'questions': questions})

@login_required
def likes(request):
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
  return render(request, 'profile/questions/likes.html', {'questions': questions})

@login_required
def settings(request):
  '''User profile settings
  
  Note:
      Fetch the current user data.
      If the request method is POST, updates the user's data in regards to the submitted form.
      
  Args:
      request (object): The current request object containing details about the current logged on user's session.

  Returns:
      HttpResponse (object): Returns a page containing a form filled with the user's data.
  '''
  profile = request.user
  if request.method == 'POST':
    form = settings_form(request.POST, request.FILES)
    if form.is_valid():
      bio = form.cleaned_data['bio']
      location = form.cleaned_data['location']
      avatar = request.FILES.get('avatar', None)
      cover = request.FILES.get('cover', None)
      if avatar is not None:
        profile.avatar = avatar
      if cover is not None:
        profile.cover = cover
      profile.bio = bio
      profile.location = location
      profile.save()
      return redirect(reverse('accounts:settings'))
  data = {
    'bio': profile.bio, 
    'location': profile.location
  }
  context = {
    'page_title': "Settings",
    'user_profile': profile,
    'form': settings_form(initial=data)
  }
  return render(request, 'profile/settings/content.html', context)