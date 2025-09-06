from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from .models import Patient, Doctor, Mapping
from .serializers import RegisterSerializer, PatientSerializer, DoctorSerializer, MappingSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class PatientListCreate(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PatientSerializer

    def get_queryset(self):
        return Patient.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class PatientDetailUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PatientSerializer
    queryset = Patient.objects.all()

class DoctorListCreate(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DoctorSerializer
    queryset = Doctor.objects.all()

class DoctorDetailUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DoctorSerializer
    queryset = Doctor.objects.all()

class MappingListCreate(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = MappingSerializer
    queryset = Mapping.objects.all()

class MappingDetailDelete(generics.RetrieveDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = MappingSerializer
    queryset = Mapping.objects.all()

class MappingByPatient(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = MappingSerializer

    def get_queryset(self):
        patient_id = self.kwargs['patient_id']
        return Mapping.objects.filter(patient__id=patient_id)
