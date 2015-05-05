from django.conf import settings
from django.shortcuts import render

# Create your views here.
def landing(request):
    if settings.PRODUCTION == False:
        template =  'dev/landing.html'
    else:
        template =  'build/landing.html'

    return render(request, template, {"foo": "bar"})