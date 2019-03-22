from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from contextlib import contextmanager

engine = create_engine("mysql+pymysql://root:123456@127.0.0.1:3306/gmerptest",
                       encoding='utf-8', echo=True)
session_class = sessionmaker(bind=engine)


@contextmanager
def get_session():
    try:
        session = session_class()
        yield session
        session.expunge_all()
        session.commit()
    except Exception as e:
        session.rollback()
        raise e
    finally:
        session.close()
