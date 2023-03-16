from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.shortcuts import redirect, render
from .forms import LoginForm, RegisterForm


def enter(request, error=None):
    login_form = LoginForm()
    register_form = RegisterForm()
    context = {'login_form':login_form, 'register_form': register_form, 'error': error}
    return render(request, 'accounts/enter.html', context)

def user_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return redirect('tasks:home')
    return enter(request, 'Not valid credentials')
        
def user_logout(request):
    logout(request)
    return redirect('accounts:enter')

def user_register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = User.objects.create(
                username=form.cleaned_data['username'],
                password=make_password(form.cleaned_data['password']),
                email=form.cleaned_data['email']
            )
            login(request, user)
            return redirect('tasks:home')
    return enter(request, 'Not valid credentials')

def demo(request):
    user = User.objects.get(username='Demo')
    login(request, user)
    return redirect('tasks:home')