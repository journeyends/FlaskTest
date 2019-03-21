from . import Base
from sqlalchemy import Column, Integer, String


class ChannelModel(Base):
    __tablename__ = "cms_channel"
    id = Column(Integer, primary_key=True)
    name = Column(String(30))
    path = Column(String(30))
    site_id = Column(Integer)
    parent_id = Column(Integer)
    is_on = Column(Integer)
