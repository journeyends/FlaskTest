def get_model_by_param_dict(model_type, model_name, param_dict):
    model = model_type()
    for attr_name in model_type.__dict__.keys():
        if not attr_name.startswith('__') and not attr_name.endswith('__'):
            print(model_name+'['+attr_name+']')
            print(param_dict.get(model_name+'['+attr_name+']'))
            setattr(model, attr_name, param_dict.get(model_name+'['+attr_name+']'))
    return model


def zip_sql_result(result_list):
    return [dict(zip(result.keys(), result)) for result in result_list]


if __name__ == "__main__":
    from app.lotus.model.lotus_user_model import LotusUserModel
    print(LotusUserModel.__dict__)
    a = get_model_by_param_dict(
        LotusUserModel,
        'user',
        {'user[nickname]': 'aaa', 'user[sex]': '12',
         'user[age]': '121', 'user[head_photo_id]': '16'})


