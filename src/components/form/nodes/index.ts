import cascader from "./Cascader";
import custom from "./Custom";
import date from "./Date";
import input from "./Input";
import number from "./Number";
import password from "./Password";
import search from "./Search";
import select from "./Select";
import submit from "./Submit";
import textarea from "./Textarea";
import time from "./Time";
import treeSelect from "./TreeSelect";

export const nodeMap = {
  input,
  number,
  search,
  textarea,
  select,
  treeSelect,
  time,
  password,
  cascader,
  date,
  submit,
  custom,
};

export type NodeMap = typeof nodeMap;

export type NodeType = keyof NodeMap;

export type NodeUnion = {
  [key in NodeType]: Partial<
    Omit<NodeMap[key], "render"> & {
      /**
       * 组件类型
       */
      render: key | ((...args: any[]) => any);
    }
  >;
}[NodeType];
