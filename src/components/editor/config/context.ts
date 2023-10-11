import { InjectionKey, Ref } from "vue";
import { Block } from "./block";
import { Container } from "./container";

export interface Context {
  current: Ref<{
    block: Block | null;
  }>;
  blocks: Ref<Block[]>;
  container: Ref<Container>;
  setCurrentBlock: (block: Block | null) => void;
  setContainerOrigin: () => void;
  saveData: () => void;
  loadData: () => void;
}

export const ContextKey = Symbol('ContextKey') as InjectionKey<Context>;

