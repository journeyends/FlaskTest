from model import Base
from sqlalchemy import Column, Integer, String, DateTime


class LotusAccountModel(Base):
    __tablename__ = "lotus_account"
    id = Column(Integer, primary_key=True)
    account = Column(String(20))
    password = Column(String(200))
    register_time = Column(DateTime)
