from app.cms.idal.i_content_dal import IContentDal


class ContentBiz:
    dal = IContentDal()()

    def getListByCondition(self, channelId, categoryId):
        dal = ContentBiz.dal
        return dal.getListByCondition(channelId, categoryId)

    def getById(self, id):
        dal = ContentBiz.dal
        return dal.getById(id)