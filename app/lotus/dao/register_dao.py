from dao import get_session
from app.lotus.model.lotus_account_model import LotusAccountModel


class RegisterDao:
    def getById(self, id):
        with get_session() as session:
            obj = session.query(LotusAccountModel).get(id)
        return obj

    def getList(self):
        with get_session() as session:
            obj = session.query(LotusAccountModel).all()
        return obj

    def add(self, lotus_account_model):
        with get_session() as session:
            session.add(lotus_account_model)
            session.commit()
        return True

