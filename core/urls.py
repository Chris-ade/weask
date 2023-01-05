from django.urls import path
from . import views

app_name = "core"

urlpatterns = [
    path('home', views.home, name='home'),
    path('explore', views.explore, name='explore'),
    path('questions/create/', views.create, name='create'),
    path('questions/post/', views.post, name='post'),
    path('questions/like/<int:target>/', views.like_question, name='like'),
    path('questions/<slug>/<int:pk>/', views.view, name='view'),
    path('questions/<slug>/', views.questions, name='questions'),
    path('answers/like/<int:target>/', views.like_answer, name='like-answer'),
    path('answers/post/', views.answer, name='post-answer'),
    path('answers/accept/<int:target>/', views.accept_answer, name='accept'),
    path('search/', views.search, name='search'),
]