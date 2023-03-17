from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from .serializers import NotesSerializer
from base.models import Notes
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