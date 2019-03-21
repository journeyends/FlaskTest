from dao import get_session
from app.sys.model.attach_model import AttachModel


class AttachDao:
    def add(self, attach_model):
        with get_session() as session:
            session.add(attach_model)
            session.commit()
        return attach_model

    def getById(self, attach_id):
        with get_session() as session:
            obj = session.query(AttachModel).get(attach_id)
        return obj
