import { Constant } from "@/utils";

/**
 * 性别枚举
 */
enum Gender {
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
const GenderDict = Constant.from([
  {
    value: Gender.Man,
    label: "男",
    color: "blue",
  },
  {
    value: Gender.Famale,
    label: "女",
    color: "pink",
  },
  {
    value: Gender.Secret,
    label: "保密",
    color: "gray",
  },
]);

export { Gender, GenderDict };

