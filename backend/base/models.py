from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Notes(models.Model):
    body = models.TextField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)


class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=500)
    def __str__(self):
        return self.name

class Status(models.Model):
    status = models.CharField(max_length=100)
    def __str__(self):
        return self.status
    
class Repeat(models.Model):
    label = models.CharField(max_length=100)
    def __str__(self):
        return self.label

class Task(models.Model):
    is_myday = models.BooleanField(default=False)
    create_at = models.DateTimeField(auto_now_add=True)
    remind_day = models.DateTimeField(null=True)
    due_day = models.DateTimeField(null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    repeat = models.ForeignKey(Repeat, on_delete=models.CASCADE, null=True)
    # is_important = models.BooleanField(default=False)
    is_imported = models.BooleanField(default=False)
    status = models.ForeignKey(Status, on_delete=models.CASCADE, default=1)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    label = models.CharField(max_length=255)
    note = models.TextField(max_length=500)
    def __str__(self):
        return self.label

class Step(models.Model):
    step = models.CharField(max_length=300)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    create_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.step



