from . import Base
from sqlalchemy import Column, Integer, String


class CategoryModel(Base):
    __tablename__ = "cms_category"
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    channel_id = Column(Integer)
    parent_id = Column(Integer)
    is_on = Column(Integer)
