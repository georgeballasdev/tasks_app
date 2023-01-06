from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render
from .forms import LoginForm, RegisterForm

@login_required
def profile(request):
    return render(request, 'accounts/profile.html')

def enter(request, error=None):
    login_form = LoginForm()
    register_form = RegisterForm()
    context = {'login_form':login_form, 'register_form': register_form, 'error': error}
    return render(request, 'accounts/login.html', context)

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
        register_form = RegisterForm(request.POST)
        if register_form.is_valid():
            user = register_form.save()
            login(request, user)
            return redirect('tasks:home')
    return enter(request, 'Not valid credentials')