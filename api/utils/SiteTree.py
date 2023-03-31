def create_tree(data, parent=None):
    children = [item for item in data if item['parent'] == parent]
    if not children:
        return []

    for child in children:
        child['item'] = create_tree(data, child['sid'])
    return children


def site_tree_data(site_list, user_crop_list):
    site_list_get_view = []
    for site in site_list:
        [site.update({"crop": crop}) for crop in user_crop_list if crop["cid"] == site["crop"]]
        site_list_get_view.append(site)

    data = create_tree(site_list_get_view)
    return data
