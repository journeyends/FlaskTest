from app.cms.controller import CMSChannelController
from app.cms.idal.i_channel_dal import IChannelDal
from common.path_helper import addPath


class ChannelBiz:
    dal = IChannelDal()()

    def getListBySiteId(self, siteId):
        dal = ChannelBiz.dal
        return dal.getListBySiteId(siteId)

    def addChannelPath(self, channelList):
        for channel in channelList:
            addPath(r'^{path}'.format(path=channel['path']), CMSChannelController)

    def getChannelList(self):
        dal = ChannelBiz.dal
        return dal.getChannelList()

    def getChannelByUrl(self, url):
        if url.find('/cms') == 0:
            path = url[4:]
        else:
            return None
        return self.getChannelByPath(path)

    def getChannelByPath(self, path):
        dal = ChannelBiz.dal
        return dal.getChannelByPath(path)

    def getById(self, id):
        dal = ChannelBiz.dal
        return dal.getById(id)
