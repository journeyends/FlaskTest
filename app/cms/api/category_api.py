from rest_framework.views import APIView
import json
from app.cms.ibiz import ICategoryBiz
from django.http import HttpResponse


class CMSCategoryListApi(APIView):
    def get(self, request):
        categoryList = None
        iCategoryBizInstance = ICategoryBiz()()
        channelId = request.GET.get("channelId")
        if channelId is not None:
            categoryList = iCategoryBizInstance.getListByChannelId(channelId)

        result = json.dumps(list(categoryList), ensure_ascii=False)
        return HttpResponse(result)
