from django.db import models
from django.core.validators import MinLengthValidator

class Todo(models.Model):
    task_name=models.CharField(max_length=50)
    task_description=models.TextField(null=True, blank=True)
    is_completed=models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.task_name