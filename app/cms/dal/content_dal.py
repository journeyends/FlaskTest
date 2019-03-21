from app.cms.entity.content_entity import ContentModel
from . import session


class ContentDal:
    def getListByCondition(self, channelId, categoryId):
        search_dict = dict()
        search_dict['is_on'] = 1
        if channelId is not None and int(channelId) > 0:
            search_dict['channel_id'] = int(channelId)
        if categoryId is not None and int(categoryId) > 0:
            search_dict['category_id'] = int(categoryId)

        obj = ContentModel.query.filter_by(**search_dict) \
            .values('id', 'title', 'channel_id', 'category_id')
        return obj

    def getById(self, id):
        obj = session.query(ContentModel).get(id)
        return obj
