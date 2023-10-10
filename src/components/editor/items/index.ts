import Text from "./text";

export const BlockerMap = {
  [Text.initial.type]: Text,
};

export const getBlockerRender = (type: string) => {
  return BlockerMap[type].render;
}

export default BlockerMap;