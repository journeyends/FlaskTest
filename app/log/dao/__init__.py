from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


engine = create_engine("mssql+pymssql://card:card$208@172.16.0.208/CARD",
                       encoding='utf-8', echo=True)

Session_Class = sessionmaker(bind=engine)
session = Session_Class()