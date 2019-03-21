from app.cms.idal.i_category_dal import ICategoryDal


class CategoryBiz:
    dal = ICategoryDal()()

    def getListByChannelId(self, channelId):
        dal = CategoryBiz.dal
        return dal.getListByChannelId(channelId)
