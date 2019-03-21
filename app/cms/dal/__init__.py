from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


engine = create_engine("mysql+pymysql://root:123456@127.0.0.1:3306/gmerptest",
                       encoding='utf-8', echo=True)

Session_Class = sessionmaker(bind=engine)
session = Session_Class()
