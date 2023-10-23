import { Ref } from "vue";
import { Container } from "./container";
import { Block } from "./block";

/**
 * TODO
 */
export class Editor {
  public container: Ref<Container> = {} as Ref<Container>;
  public content: Ref<Block> = {} as Ref<Block>;

  constructor() {
    // TODO
  }
}
