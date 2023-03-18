from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import MyTokenObtainPairView

urlpatterns = [
    path('', views.getRoutes),
    path('notes', views.getNotes),
    path('token', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('create_user', views.create_user ),
    path('task/important/<int:task_id>', views.update_task_importance),  # type: ignore
    path('task/important', views.important),  # type: ignore
    path('task/<str:list_type>/<int:status_task>', views.task_list),  # type: ignore
    path('task', views.create_task),  # type: ignore
    path('category', views.getCategory)
]
 