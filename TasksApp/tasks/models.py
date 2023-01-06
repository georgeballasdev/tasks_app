from django.db import models
from django.contrib.auth.models import User

class Project(models.Model):
    # Status choices
    ACTIVE = 'AC'
    DONE = 'DN'
    STATUS_CHOICES = [
        (ACTIVE, 'Active'),
        (DONE, 'Done'),
    ]

    title = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=2, choices=STATUS_CHOICES, default=ACTIVE)

    def __str__(self):
        return f'{self.title}, by {self.user.username}'


class Task(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='tasks')
    text = models.TextField()

    def __str__(self):
        return f'Task {self.id}: {self.text[:10]}...'