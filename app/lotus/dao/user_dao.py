from dao import get_session
from sqlalchemy import text
from common.param_helper import zip_sql_result
from app.lotus.model.lotus_user_model import LotusUserModel


class UserDao:
    def get_user_by_id(self, user_id):
        with get_session() as session:
            obj = session.query(LotusUserModel).get(user_id)
        return obj

    def add(self, user_model):
        with get_session() as session:
            session.add(user_model)
        return user_model

    def get_intention_id_list(self, intention_model):
        with get_session() as session:
            sql = """SELECT lu.nickname,lu.head_photo_path,lu.sex,lu.age
                        FROM lotus_user lu
                  """
            try:
                result_proxy = session.execute(text(sql))
            except Exception as e:
                print(e)
                results = []
            else:
                results = result_proxy.fetchall()
        return zip_sql_result(results)

    def get_intention_id_list(self, id_list):
        with get_session() as session:
            sql = """SELECT lu.nickname,lu.head_photo_path,lu.sex,lu.age
                        FROM lotus_user lu
                        where id in :id_list
                  """
            result_proxy = session.execute(text(sql, id_list=tuple(id_list)))
            results = result_proxy.fetchall()
        return zip_sql_result(results)

    def update_user_info(self, user_model):
        with get_session() as session:
            sql = """
                    UPDATE lotus_user lu 
                    SET lu.nickname=:nickname
                    WHERE lu.id=:id
                          """
            try:
                result_proxy = session.execute(sql, user_model)
                result = result_proxy.rowcount
                if result > 0:
                    flag = True
                else:
                    flag = False
            except Exception as e:
                session.rollback()
                flag = False
        return flag


if __name__ == "__main__":
    UserDao().update_user_info({'id': 2, 'nickname': 'aaa7'})
