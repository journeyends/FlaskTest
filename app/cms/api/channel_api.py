import json

from django.http import HttpResponse
from rest_framework.views import APIView

from app.cms.ibiz import IChannelBiz
from app.cms.ibiz import ISiteBiz
from common.serialize_helper import modelToJson


class CMSListChannelApi(APIView):
    def get(self, request):
        iChannelBizInstance = IChannelBiz()()
        siteId = request.GET.get("siteId")
        if siteId is not None:
            channelList = iChannelBizInstance.getListBySiteId(siteId)
        else:
            sitePath = request.GET.get("sitePath")
            if sitePath is not None:
                siteModel = ISiteBiz()().getByUrl(sitePath)
                if siteModel is not None:
                    channelList = iChannelBizInstance.getListBySiteId(siteModel.id)

        result = json.dumps(list(channelList), ensure_ascii=False)
        return HttpResponse(result)


class CMSChannelApi(APIView):
    def get(self, request):
        channelPath = request.GET.get("channelPath")
        channelId = request.GET.get("id")
        if channelId is not None:
            channelModel = IChannelBiz()().getById(channelId)
        elif channelPath is not None:
            channelModel = IChannelBiz()().getChannelByUrl(channelPath)
        if channelModel is not None:
            result = modelToJson(channelModel)
        return HttpResponse(result)
