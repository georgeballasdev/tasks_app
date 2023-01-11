from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect, render
from django.views.generic import CreateView, DetailView
from .models import Project, Task
from django.http.response import JsonResponse, HttpResponseNotAllowed

@login_required
def home(request):
    projects = request.user.projects.all()
    context = {'projects': projects}
    return render(request, 'tasks/home.html', context)

@login_required
def add_task(request, id):
    if request.method == 'POST':
        project = Project.objects.get(id=id)
        task_text = request.POST['task']
        new_task = Task.objects.create(project=project, text=task_text)
        return JsonResponse({'task': task_text, 'task_id': new_task.id})
    return HttpResponseNotAllowed

@login_required
def remove_project(request, id):
    if request.method == 'POST':
        project = Project.objects.get(id=id)
        project.delete()
        return JsonResponse({})
    return HttpResponseNotAllowed

@login_required
def remove_task(request, id):
    if request.method == 'POST':
        task = Task.objects.get(id=id)
        task.delete()
        return JsonResponse({})
    return HttpResponseNotAllowed

class ProjectDetailView(LoginRequiredMixin, DetailView):
    template_name = 'tasks/project.html'
    model = Project

class ProjectCreateView(LoginRequiredMixin, CreateView):
    template_name = 'tasks/new_project.html'
    model = Project
    fields = ['title']

    def form_valid(self, form):
        obj = form.save(commit=False)
        obj.user = self.request.user
        obj.save()
        return redirect('tasks:home')
