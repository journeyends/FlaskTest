from model import Base
from sqlalchemy import Column, Integer, String, DateTime


class LotusUserModel(Base):
    __tablename__ = "lotus_user"
    id = Column(Integer, primary_key=True)
    account_id = Column(Integer)
    nickname = Column(String(20))
    head_photo_path = Column(String(50))
    sex = Column(Integer)
    age = Column(Integer)
