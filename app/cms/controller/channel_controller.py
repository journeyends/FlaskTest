from django.views import View
from django.shortcuts import render


class CMSChannelController(View):
    def get(self, request):
        print(request)
        return render(request, 'tab.html')