from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

# Create your views here.


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    # you cant call this route unless you are authenticated and you have to pass jwt token
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # get user object
        user = self.request.user
        # use that user to filter, you view what you write/wrote
        return Note.objects.filter(author=user)

    # override for custom functionalities
    def perform_create(self, serializer):
        if serializer.is_valid():
            # saving serializer to make  new version of the note, author is readonly so manually pass it
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    # what you can delete
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)




# make a class based view, that will allow to implement creating a new user/registration form
class CreateUserView(generics.CreateAPIView):
    # list of all objects that we are going to be looking at , when creating the new user, to avoid duplication
    queryset = User.objects.all()
    # serializer class to tell the view what kind of data it needs to accept to create a new user
    serializer_class = UserSerializer
    # specifies who can actually call it, the view, allow both authenticated and unauthenticated
    permission_classes = [AllowAny]