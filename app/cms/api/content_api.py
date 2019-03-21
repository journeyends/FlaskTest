from django.http import HttpResponse
from rest_framework.views import APIView
import json

from app.cms.ibiz import IContentBiz
from common.attr_helper import getTime
from common.filter_helper import filterContent
from common.param_helper import getDictByPostRequest
from common.serialize_helper import modelToJson


class CMSContentApi(APIView):
    @getTime
    def post(self, request):
        obj = getDictByPostRequest(request)
        obj['content'] = filterContent(obj['content'])
        return HttpResponse({'status': 2})

    def get(self, request):
        contentModel = None
        id = request.GET.get("id")
        if id is not None:
            contentModel = IContentBiz()().getById(id)
        result = modelToJson(contentModel)
        return HttpResponse(result)


class CMSContentListApi(APIView):
    def get(self, request):
        iContentBizInstance = IContentBiz()()
        channelId = request.GET.get("channelId")
        categoryId = request.GET.get("categoryId")
        contentList = iContentBizInstance.getListByCondition(channelId, categoryId)
        result = json.dumps(list(contentList), ensure_ascii=False)
        return HttpResponse(result)
