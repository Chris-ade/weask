from accounts.models import *
from core.models import *

from django.contrib.auth.password_validation import validate_password

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    questions_count = serializers.SerializerMethodField()
    answers_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'name', 'bio', 'location', 'avatar', 'cover', 'questions_count', 'answers_count', 'date_joined')

    def get_questions_count(self, instance):
        return instance.question_set.count()

    def get_answers_count(self, instance):
        return instance.answer_set.count()

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # These are claims, you can add custom claims
        token['name'] = user.name
        token['username'] = user.username
        token['email'] = user.email
        token['bio'] = user.bio
        token['location'] = user.location
        token['avatar'] = str(user.avatar)
        token['cover'] = str(user.cover)
        # ...
        return token


class RegisterSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=30, required=True)
    password = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ('email', 'username', 'name', 'password')

    def create(self, validated_data):
        user = User.objects.create(
            name=validated_data['name'],
            username=validated_data['username'],
            email=validated_data['email']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    asked_by = UserSerializer(read_only=True)
    answers_count = serializers.SerializerMethodField()
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Question
        fields = '__all__'

    def get_answers_count(self, instance):
        return instance.answer_set.count()

class AnswerSerializer(serializers.ModelSerializer):
    by = UserSerializer(read_only=True)
    question = QuestionSerializer(read_only=True)

    class Meta:
        model = Answer
        fields = '__all__'

class SettingsSerializer(serializers.ModelSerializer):
    bio = serializers.CharField(required=False, max_length=100)
    location = serializers.CharField(required=False, max_length=50)

    class Meta:
        model = User
        fields = ('bio', 'location', 'avatar', 'cover')