import { InjectionKey, Ref } from "vue";
import { Block } from "./block";
import { Container } from "./container";

export interface Context {
  current: {
    block: Block;
  };
  blocks: Ref<Block[]>;
  container: Ref<Container>;
  setCurrentBlock: (block: Block) => void;
}

export const ContextKey = Symbol('ContextKey') as InjectionKey<Context>;

