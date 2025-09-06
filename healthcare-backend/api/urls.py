from django.urls import path
from .views import (
    RegisterView,
    PatientListCreate, PatientDetailUpdateDelete,
    DoctorListCreate, DoctorDetailUpdateDelete,
    MappingListCreate, MappingDetailDelete, MappingByPatient
)
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('auth/register/', RegisterView.as_view()),
    path('auth/login/', TokenObtainPairView.as_view()),

    path('patients/', PatientListCreate.as_view()),
    path('patients/<int:pk>/', PatientDetailUpdateDelete.as_view()),

    path('doctors/', DoctorListCreate.as_view()),
    path('doctors/<int:pk>/', DoctorDetailUpdateDelete.as_view()),

    path('mappings/', MappingListCreate.as_view()),
    path('mappings/<int:pk>/', MappingDetailDelete.as_view()),
    path('mappings/patient/<int:patient_id>/', MappingByPatient.as_view()),
]
