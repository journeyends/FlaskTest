from model import Base
from sqlalchemy import Column, Integer, String, DateTime


class AttachModel(Base):
    __tablename__ = "attachment"
    id = Column(Integer, primary_key=True)
    key_id = Column(Integer)
    key_name = Column(String(20))
    attach_name = Column(String(50))
    attach_path = Column(String(128))
    attach_size = Column(Integer)
    attach_type = Column(String(10))
