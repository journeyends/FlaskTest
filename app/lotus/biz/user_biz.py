from app.lotus.dao.user_dao import UserDao
import random


class UserBiz:
    def __init__(self):
        self.dao = UserDao()

    def addUser(self, user_model):
        if user_model.account_id is None:
            user_model.account_id = 0
        return self.dao.add(user_model)

    def get_user_by_id(self, id):
        return self.dao.get_user_by_id(id)

    def get_may_list(self, intention_model):
        intention_id_list = self.dao.get_intention_id_list(intention_model)
        intention_random_id_list = random.sample(intention_id_list,
                                                 intention_model.get("count", 10))
        return self.dao.get_list_by_ids(intention_random_id_list)
