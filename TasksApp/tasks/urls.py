from django.urls import path
from . import views

app_name = 'tasks'
urlpatterns = [
    path('', views.home, name='home'),
    path('project/<int:pk>/', views.ProjectDetailView.as_view(), name='project'),
    path('new-project/', views.ProjectCreateView.as_view(), name='new_project'),
    path('ajax/add-task/<int:id>/', views.add_task, name='add_task'),
    path('ajax/remove-<str:model_name>/<int:id>/', views.remove_model, name='remove_model'),
]