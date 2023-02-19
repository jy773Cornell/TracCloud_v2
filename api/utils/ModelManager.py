import django.http
def model_delete(query_object):
    query_object.update(is_active=False)


def request_data_transform(model_dic):
    if type(model_dic) == django.http.request.QueryDict:
        model_dic = dict(model_dic.copy())
        model_dic = {key: value[0] for key, value in model_dic.items() if value[0] != ""}
        if "csrfmiddlewaretoken" in model_dic:
            model_dic.pop("csrfmiddlewaretoken")

    return model_dic
