from django.urls import path
from . import views

app_name = "api"

urlpatterns = [
    path('categories/', views.categories),
    path('questions/post/', views.post),
    path('questions/like/', views.like_question),
    path('questions/<slug>/<int:pk>/', views.view),
    path('questions/<slug>/', views.questions),
    path('answers/like/<int:target>/', views.like_answer),
    path('answers/post/', views.answer),
    path('answers/accept/<int:target>/', views.accept_answer),
    path('search/', views.search),
]