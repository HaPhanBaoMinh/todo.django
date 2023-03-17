from rest_framework.serializers import ModelSerializer
from base.models  import Notes, Task, Category

class NotesSerializer(ModelSerializer):
    class Meta:
        model = Notes
        fields = '__all__'

class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'