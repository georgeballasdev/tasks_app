from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect, render
from django.views.generic import CreateView, DetailView
from .models import Project, Task

@login_required
def home(request):
    projects = request.user.projects.all()
    context = {'projects': projects}
    return render(request, 'tasks/home.html', context)

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
