from . import session
from app.cms.entity import SiteModel


class SiteDal:
    def getById(self, id):
        obj = session.query(SiteModel).get(id)
        return obj

    def getList(self):
        obj = session.query(SiteModel).all()
        return obj
