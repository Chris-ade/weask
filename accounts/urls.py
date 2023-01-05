from django.urls import path
from . import views

app_name = "accounts"

urlpatterns = [
    path('', views.welcome),
    path('welcome', views.welcome, name='welcome'),
    path('register', views.register, name='register'),
    path('accounts/settings/', views.settings, name='settings'),
    path('accounts/logout/', views.logout, name='logout'),
    path('profile/questions/', views.questions, name='questions'),
    path('profile/questions/likes/', views.likes, name='likes'),
    path('profile/questions/with_answers/', views.with_answers, name='with_answers'),
    path('profile/<username>/', views.profile, name='profile'),
]