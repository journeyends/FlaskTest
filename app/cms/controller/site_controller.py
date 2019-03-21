from django.http import HttpResponseNotFound
from django.views import View
from django.shortcuts import render
from app.cms.ibiz import ISiteBiz


class CMSListSiteController(View):
    def get(self, request):
        siteModel = ISiteBiz()().getByUrl(request.path)
        if siteModel is None:
            return HttpResponseNotFound("None")
        siteId = siteModel.id
        return render(request, 'dashboard.html', {'id': siteId})
