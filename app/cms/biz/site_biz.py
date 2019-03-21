from app.cms.idal.i_site_dal import ISiteDal


class SiteBiz:
    dal = ISiteDal()()

    def getList(self):
        dal = SiteBiz.dal
        return dal.getList()

    def getById(self, id):
        dal = SiteBiz.dal
        return dal.getById(id)

    def getSiteList(self):
        dal = SiteBiz.dal
        return dal.getSiteList()

    def getByPath(self, path):
        dal = SiteBiz.dal
        return dal.getByPath(path)

    def getByUrl(self, url):
        if url.find('/cms') == 0:
            path = url[4:]
        else:
            return None
        return self.getByPath(path)
