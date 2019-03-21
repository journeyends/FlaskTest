from . import Base
from sqlalchemy import Column, Integer, String


class SiteModel(Base):
    __tablename__ = "cms_site"
    id = Column(Integer, primary_key=True)
    name = Column(String(200), unique=True)
    path = Column(String(200), unique=True)
    is_on = Column(Integer)
