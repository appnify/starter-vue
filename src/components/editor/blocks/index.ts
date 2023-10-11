import Date from './date';
import Text from "./text";
import Time from "./time";

export const BlockerMap = {
  [Text.type]: Text,
  [Date.type]: Date,
  [Time.type]: Time,
};

export const getBlockerRender = (type: string) => {
  return BlockerMap[type].render;
};

export default BlockerMap;
