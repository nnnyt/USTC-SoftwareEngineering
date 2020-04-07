from django.urls import path, include
from . import views
from django.conf.urls import url

urlpatterns = [
    url(r'signup', views.SignupView.as_view()),
    url(r'login', views.LoginView.as_view()),
    url(r'date', views.DateView.as_view()),
]


