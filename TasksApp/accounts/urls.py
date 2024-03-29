from django.urls import path
from . import views

app_name = 'accounts'
urlpatterns = [
    path('demo/', views.demo, name="demo"),
    path('enter/', views.enter, name='enter'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('register/', views.user_register, name='register'),
]