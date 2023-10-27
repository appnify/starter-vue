/**
 * 列表转树结构
 * @param list 数组
 * @param id ID key
 * @param pid 父级key
 * @param cid 子项key
 * @returns
 */
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

/**
 * 遍历树结构
 * @param tree 数组
 * @param fn 函数
 * @param before 是否广度遍历
 */
export function treeEach(tree: any[], fn: (item: any) => void, before = true) {
  for (const item of tree) {
    before && fn(item);
    if (item.children) {
      treeEach(item.children, fn);
    }
    !before && fn(item);
  }
}
