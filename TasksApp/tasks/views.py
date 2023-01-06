from django.contrib.auth.decorators import login_required
from django.shortcuts import render

@login_required
def home(request):
    projects = request.user.projects.all()
    context = {'projects': projects}
    return render(request, 'tasks/home.html', context)
