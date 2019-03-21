from . import Base
from sqlalchemy import Column, Integer, String, Text


class ContentModel(Base):
    __tablename__ = "cms_content"
    id = Column(Integer, primary_key=True)
    title = Column(String(200), unique=True)
    content = Column(Text)
    channel_id = Column(Integer)
    category_id = Column(Integer)
    is_on = Column(Integer)
