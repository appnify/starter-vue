import { nodeMap, NodeMap, NodeType } from "../nodes";

type NodeUnion = {
  [key in NodeType]: Partial<
    NodeMap[key] & {
      /**
       * 组件类型
       */
      type: key;
    }
  >;
}[NodeType];

export { nodeMap };
export type { NodeMap, NodeType, NodeUnion };

