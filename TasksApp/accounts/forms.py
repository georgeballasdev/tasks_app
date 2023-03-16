from django import forms


class LoginForm(forms.Form):
    username = forms.CharField(
        max_length=100,
        min_length=4,
        required=True,
        label='Username'
    )
    password = forms.CharField(
        min_length=6,
        required=True,
        label='Password',
        widget=forms.PasswordInput()
    )

class RegisterForm(forms.Form):
    username = forms.CharField(
        max_length=100,
        min_length=4,
        required=True,
        label='Username',
        help_text='Pick a unique username'
    )
    password = forms.CharField(
        min_length=6,
        required=True,
        label='Password',
        help_text='Pick a complex password',
        widget=forms.PasswordInput()
    )
    email = forms.EmailField(
        required=True,
        help_text='Input your email'
    )
