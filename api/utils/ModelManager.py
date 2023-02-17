def model_delete(query_object):
    query_object.update(is_active=False)


def request_data_transform(query_dict):
    model_dic = dict(query_dict.copy())
    model_dic = {key: value[0] for key, value in model_dic.items() if value[0] != ""}
    if "csrfmiddlewaretoken" in model_dic:
        model_dic.pop("csrfmiddlewaretoken")

    return model_dic
