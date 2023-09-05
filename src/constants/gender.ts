import { extendEnum } from "@/utils";

/**
 * 性别枚举
 */
enum GenderEnum {
  /**
   * 男
   */
  Man = 1,
  /**
   * 女
   */
  Famale = 2,
  /**
   * 保密
   */
  Secret = 3,
}

/**
 * 性别
 */
const GenderDict = extendEnum(GenderEnum, [
  {
    value: GenderEnum.Man,
    label: "男",
    color: "blue",
  },
  {
    value: GenderEnum.Famale,
    label: "女",
    color: "pink",
  },
  {
    value: GenderEnum.Secret,
    label: "保密",
    color: "gray",
  },
]);

export { GenderEnum, GenderDict };
