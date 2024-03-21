from django.urls import path
from . import views

from rest_framework_simplejwt.views import TokenRefreshView

app_name = "api"

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('profile/questions/', views.profile_questions, name='questions'),
    path('profile/questions/likes/', views.profile_likes, name='likes'),
    path('profile/questions/with_answers/', views.with_answers, name='with_answers'),
    path('profile/settings/', views.profile_settings, name='settings'),
    path('profile/<str:username>/', views.profile, name='profile'),
    path('categories/', views.categories),
    path('questions/', views.fetch_questions),
    path('recommended/', views.recommended),
    path('suggestions/', views.suggestions),
    path('question/post/', views.post_question),
    path('question/like/', views.like_question),
    path('question/<slug>/<int:pk>/', views.view),
    path('questions/<slug>/', views.questions),
    path('answers/like/', views.like_answer),
    path('answers/post/', views.post_answer),
    path('answers/accept/<int:target>/', views.accept_answer),
    path('search/', views.search),
]