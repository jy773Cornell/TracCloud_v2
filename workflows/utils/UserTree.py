from treelib import Node, Tree
from api.models import UserProfile


class UserTree:

    def __init__(self, root_id):
        self.tree = Tree()

        # Hard coded for testing

        owner_id = "UID-bc7d1fea-26d2-4147-854e-cfee84b505a9"
        manager_id = "UID-6a8b5802-ce7a-4510-8ece-739a78811e0e"
        applicator_id = "UID-07517971-1cb1-4e4e-b171-9213be3af520"

        self.tree.create_node("Owner", owner_id)
        self.tree.create_node("Manager", manager_id, parent=owner_id)
        self.tree.create_node("Applicator", applicator_id, parent=manager_id)

    def is_descendant(self, ancestor_id: str, descendant_id: str) -> bool:
        sub_tree = self.tree.subtree(ancestor_id)
        return descendant_id in sub_tree.nodes.keys()

    def subtree_to_dict(self, node_id):
        node = self.tree[node_id]
        children = self.tree.children(node_id)

        if children:
            children_dict = {child.identifier: self.subtree_to_dict(child.identifier) for child in children}
            return {"label": node.tag, "children": children_dict}
        else:
            return {"label": node.tag, "children": {}}
