from django.shortcuts import render, HttpResponse
from .models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, TokenSerializer
from rest_framework import status
import time
import json
EXPIRE = 60

# Create your views here.
class SignupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED, content_type="application/json")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST, content_type="application/json")

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        userobj = User.objects.filter(username=username, password=password).first()
        if not userobj:
            return Response({
                'error': 'Username or Password Error',
            })
        else:
            userobj.token = str(time.time() + EXPIRE)
            userobj.save()
            # result = {
            #     'msg': 'Login Successfully',
            #     'token': userobj.token,
            # }
            # print(json.dumps(result))
            # return HttpResponse(json.dumps(result), content_type="application/json")
            return Response({
                'msg': 'Login Successfully',
                'token': userobj.token,
            }, content_type="application/json")

class DateView(APIView):
    def post(self, request):
        date = request.data.get('date')
        token = request.data.get('token')
        userobj = User.objects.filter(token=token).first()
        if not userobj:
            return Response({
                'error': 'You are not logged in, please login.',
            }, content_type="application/json")
        else:
            if float(token) < time.time():
                return Response({
                    'msg':'Time out, please login again.',
                }, content_type="application/json")
            else:
                if date[5:] == '01-01':
                    festival = '元旦'
                elif date[5:] == '12-25':
                    festival = '圣诞节'
                elif date[5:] == '10-01':
                    festival = '国庆节'
                else :
                    return Response({

                    }, content_type="application/json")
                return Response({
                    'festival':festival,
                }, content_type="application/json")