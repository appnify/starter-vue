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
