export const listToTree = (list: any[], id = "id", pid = "parentId", cid = "children") => {
  const map = list.reduce((res, v) => ((res[v[id]] = v), res), {});
  return list.filter((item) => {
    const parent = map[item[pid]];
    if (parent) {
      !parent[cid] && (parent[cid] = []);
      parent[cid].push(item);
    }
    return !item[pid];
  });
};

export function treeEach(tree: any[], fn: (item: any) => void) {
  for (const item of tree) {
    fn(item);
    if (item.children) {
      treeEach(item.children, fn);
    }
  }
}
