from django.contrib import admin

# Register your models here.
from.models import Notes, Task, Status, Category, Step

admin.site.register(Notes)
admin.site.register(Category)
admin.site.register(Status)
admin.site.register(Task)
admin.site.register(Step)