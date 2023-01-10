from django.urls import path
from . import views

app_name = 'tasks'
urlpatterns = [
    path('', views.home, name='home'),
    path('project/<int:pk>/', views.ProjectDetailView.as_view(), name='project'),
    path('new-project/', views.ProjectCreateView.as_view(), name='new_project'),
]