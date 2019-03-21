from app.cms.entity.category_entity import CategoryModel


class CategoryDal:
    def getListByChannelId(self, channelId):
        obj = CategoryModel.query.filter_by(is_on=1, channel_id=channelId)\
            .values('id', 'name', 'channel_id', 'parent_id')
        return obj
