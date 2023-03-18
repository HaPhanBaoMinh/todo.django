from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status 
from django.contrib.auth.models import User

from .serializers import NotesSerializer, TaskSerializer, CategorySerializer
from base.models import Notes, Task

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    try:
        serializer_class = MyTokenObtainPairSerializer
    except Exception as e:
        print(e)

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]
    return JsonResponse(routes, safe=False)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user;
    notes = user.notes_set.all();
    serializer = NotesSerializer(notes, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if not username or not password or not email:
        return Response({'error': 'Please provide username, password and email.'},
            status=status.HTTP_400_BAD_REQUEST)
    try:
        # Create the user object
        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()

        return Response({'success': 'User created successfully!'}, status=status.HTTP_201_CREATED)

    except:
        return Response({'error': 'Unable to create user. Please try again.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def task_list(request, list_type=None, status_task = 1):
    # api/task - GET
    # get all task imcomplete 
    if request.method == 'GET':
        tasks = ''
        # get current user
        user = request.user
        # get tasks for this user
        if list_type == 'my-day':
            tasks = Task.objects.filter(user=user, status=status_task, is_myday=True) 
        if list_type == 'plan':
            tasks = Task.objects.filter(user=user, status=status_task, due_day__isnull=False) 
        if list_type == 'all':
            tasks = Task.objects.filter(user=user, status=status_task)
        if list_type != 'my-day' and list_type != 'all' and list_type != 'plan':
            return HttpResponse("Wrong path")

        # serialize tasks data
        serializer = TaskSerializer(tasks, many=True)
        # return serialized data as response
        return Response(serializer.data)
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_task(request):
    # serialize the data
    serializer = TaskSerializer(data=request.data)

    # validate the serializer data
    if serializer.is_valid():
        # save the data with the current user
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def important(request):
    user = request.user
    tasks = Task.objects.filter(user=user, status=1, is_important=True)
    # serialize tasks data
    serializer = TaskSerializer(tasks, many=True)
    # return serialized data as response
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_task_importance(request, task_id):
    # retrieve the task based on its ID
    try:
        task = Task.objects.get(id=task_id)
    except Task.DoesNotExist:
        return Response({"message": "Task does not exist"}, status=status.HTTP_404_NOT_FOUND)

    # check if the current user owns the task
    if task.user != request.user:
        return Response({"message": "You do not have permission to update this task"}, status=status.HTTP_403_FORBIDDEN)
    # update the task's is_important value based on the request data
    serializer = TaskSerializer(task, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCategory(request):
    user = request.user
    category = user.category_set.all()
    serializer = CategorySerializer(category, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_task(request, task_id):
    user = request.user
    try:
        task = Task.objects.get(id=task_id, user=user)
        task.delete()
        Response({"message": "Task deleted"}, status=status.HTTP_200_OK)
    except Task.DoesNotExist:
        Response({"message": "Task does not exist"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
