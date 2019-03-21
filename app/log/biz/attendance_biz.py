from app.log.dao.attendance_dao import AttendanceDao


class AttendanceBiz:
    def __init__(self):
        self.dao = AttendanceDao()

    def get_list(self):
        return self.dao.get_attendance_list()

    def update_entry_dt(self):
        return self.dao.update_entry_dt()

    def update_add_dt(self):
        return self.dao.update_add_dt()
