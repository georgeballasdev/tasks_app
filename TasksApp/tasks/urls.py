from django.urls import path
from . import views

app_name = 'tasks'
urlpatterns = [
    path('', views.home, name='home'),
    path('project/<int:pk>/', views.ProjectDetailView.as_view(), name='project'),
    path('new-project/', views.ProjectCreateView.as_view(), name='new_project'),
    path('ajax/add-task/<int:id>/', views.add_task, name='add_task'),
    path('ajax/remove-project/<int:id>/', views.remove_project, name='remove_project'),
    path('ajax/remove-task/<int:id>/', views.remove_task, name='remove_task'),
]