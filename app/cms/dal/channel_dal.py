from app.cms.entity.channel_entity import ChannelModel


class ChannelDal:
    def getListBySiteId(self, siteId):
        obj = ChannelModel.query.filter_by(is_on=1, site_id=siteId)\
            .values('id', 'name', 'path', 'parent_id')
        return obj

    def getChannelList(self):
        obj = ChannelModel.query.filter_by(is_on=1).values('id', 'name', 'path', 'parent_id')
        return obj

    def getChannelByPath(self, path):
        obj = ChannelModel.query.filter_by(path=path).first()
        return obj

    def getById(self, id):
        obj = ChannelModel.query.filter_by(id=id).first()
        return obj
