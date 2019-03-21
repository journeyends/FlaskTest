from app.sys.dao.attach_dao import AttachDao


class AttachBiz:
    def __init__(self):
        self.dao = AttachDao()

    def addAttach(self, attach_model):
        return self.dao.add(attach_model)

    def getAttach(self, attach_id):
        return self.dao.getById(attach_id)
