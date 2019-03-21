from django.shortcuts import render
from django.views import View


class CMSContentController(View):
    def get(self, request, cid):
        return render(request, 'content.html', {'id': cid})
