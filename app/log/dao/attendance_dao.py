from app.log.dao import session
# from . import session
from sqlalchemy import text
from common.param_helper import zip_sql_result


class AttendanceDao:
    def get_attendance_list(self):
        sql = """SELECT top 100 * FROM Agms_entryrec WHERE Emp_no='J2714307'
        ORDER by ID Desc
              """
        result_proxy = session.execute(text(sql))
        results = result_proxy.fetchall()
        return zip_sql_result(results)

    def update_entry_dt(self):
        return None
        # sql = """update Agms_entryrec set entry_dt = :entry_dt
        #          where ID = :id """
        # result_proxy = session.execute(text(sql, id=0))
        # result = result_proxy.scalar()
        # return result

    def update_add_dt(self):
        return None


if __name__ == "__main__":
    a = AttendanceDao().get_attendance_list()
    print(a)
