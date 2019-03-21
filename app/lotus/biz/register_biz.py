from app.lotus.dao.register_dao import RegisterDao
from common.time_helper import getDateTime


class RegisterBiz:
    def __init__(self):
        self.dao = RegisterDao()

    def getList(self):
        return self.dao.getList()

    def getById(self, id):
        return self.dao.getById(id)

    def addRegister(self, lotusAccountModel):
        lotusAccountModel.register_time = getDateTime()
        return self.dao.add(lotusAccountModel)
