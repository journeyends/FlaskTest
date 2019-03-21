from . import Base
from sqlalchemy import Column, Integer, String


class SiteModel(Base):
    __tablename__ = "attachment"
    id = Column(Integer, primary_key=True)
    key_id = Column(Integer)
    key_name = Column(String(20))
    attach_name = Column(String(50))
    attach_path = Column(String(128))
    attach_size = Column(Integer)
