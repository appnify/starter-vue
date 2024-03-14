/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ApiCreateUserDto {
  /**
   * 登录账号
   * @example "juetan"
   */
  username: string;
  /**
   * 用户昵称
   * @example "绝弹"
   */
  nickname: string;
  /**
   * 用户密码
   * @example "password"
   */
  password?: string;
  /**
   * 头像ID
   * @example 1
   */
  avatarId?: number;
  /**
   * 角色ID列表
   * @example [1,2,3]
   */
  roleIds?: number[];
}

export interface ApiUser {
  /**
   * 登录账号
   * @example "juetan"
   */
  username: string;
  /**
   * 用户昵称
   * @example "绝弹"
   */
  nickname: string;
  /**
   * 用户介绍
   * @example "这个人很懒, 什么也没有留下!"
   */
  description: string;
  /**
   * 用户头像(URL)
   * @example "./assets/222421415123.png "
   */
  avatar: string;
  /**
   * 用户密码
   * @example "password"
   */
  password: string;
  /**
   * 用户邮箱
   * @example "example@mail.com"
   */
  email: string;
  /** 用户角色ID */
  roleIds: number[];
}

export interface ApiUpdateUserDto {
  id: number;
  /**
   * 登录账号
   * @example "juetan"
   */
  username?: string;
  /**
   * 用户昵称
   * @example "绝弹"
   */
  nickname?: string;
  /**
   * 用户密码
   * @example "password"
   */
  password?: string;
  /**
   * 头像ID
   * @example 1
   */
  avatarId?: number;
  /**
   * 角色ID列表
   * @example [1,2,3]
   */
  roleIds?: number[];
}

export interface ApiAuthUserDto {
  /**
   * 用户名
   * @example "admin"
   */
  username: string;
  /**
   * 用户密码
   * @example "123456"
   */
  password: string;
}

export interface ApiLoginedUserVo {
  /** 用户ID */
  id: number;
  /**
   * 访问令牌
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInVzZXJuYW1lIjoianVldGFuIiwiaWF0IjoxNjkxMTM5MjI3LCJleHAiOjE2OTExOTkyMjd9.6z7f-xfsHABbsyg401o2boKeqNQ1epPDYfEdavIcfYc"
   */
  token: string;
  /**
   * 登录账号
   * @example "juetan"
   */
  username: string;
  /**
   * 用户昵称
   * @example "绝弹"
   */
  nickname: string;
  /**
   * 用户介绍
   * @example "这个人很懒, 什么也没有留下!"
   */
  description: string;
  /**
   * 用户头像(URL)
   * @example "./assets/222421415123.png "
   */
  avatar: string;
  /**
   * 用户邮箱
   * @example "example@mail.com"
   */
  email: string;
  /** 用户角色ID */
  roleIds: number[];
}

export interface ApiCreateLogDto {
  /**
   * 字段描述(Swagger用途)
   * @example "demo"
   */
  demo: string;
}

export interface ApiLoginLog {
  /**
   * 用户昵称
   * @example "绝弹"
   */
  nickname: string;
  /**
   * 操作描述
   * @example "1"
   */
  description: string;
  /**
   * 操作状态
   * @example true
   */
  status: boolean;
  /**
   * 登陆IP
   * @example "127.0.0.1"
   */
  ip: string;
  /**
   * 登陆地址
   * @example "广东省深圳市"
   */
  addr: string;
  /**
   * 浏览器
   * @example "chrome"
   */
  browser: string;
  /**
   * 操作系统
   * @example "windows 10"
   */
  os: string;
}

export interface ApiUpdateLogDto {
  /**
   * 字段描述(Swagger用途)
   * @example "demo"
   */
  demo?: string;
}

export interface ApiPermission {
  /**
   * 权限名称
   * @example "文章列表"
   */
  name: string;
  /**
   * 权限标识
   * @example "post:list"
   */
  slug: string;
  /**
   * 权限类型
   * @example "menu"
   */
  type: "menu" | "api";
  /**
   * 权限描述
   * @example "文章列表"
   */
  description: string;
}

export interface ApiCreateRoleDto {
  name: string;
  slug: string;
  description?: string;
  permissions?: ApiPermission[];
}

export interface ApiUpdateRoleDto {
  permissionIds?: number[];
  name?: string;
  slug?: string;
  description?: string;
  permissions?: ApiPermission[];
}

export interface ApiCreatePermissionDto {
  /**
   * 权限名称
   * @example "权限名称"
   */
  name: string;
  /**
   * 权限标识
   * @example "permission:permission"
   */
  slug: string;
  /** 权限描述 */
  description?: string;
}

export interface ApiUpdatePermissionDto {
  id: number;
  /**
   * 权限名称
   * @example "权限名称"
   */
  name?: string;
  /**
   * 权限标识
   * @example "permission:permission"
   */
  slug?: string;
  /** 权限描述 */
  description?: string;
}

export interface ApiCreateUploadDto {
  /** @format binary */
  file: File;
}

export interface ApiUpload {
  /**
   * 文件名
   * @example "xxx.jpg"
   */
  name: string;
  /**
   * 文件大小
   * @example 1024
   */
  size: number;
  /**
   * 文件类型
   * @example "image/jpeg"
   */
  mimetype: string;
  /**
   * 文件路径
   * @example "/upload/2021/10/01/xxx.jpg"
   */
  path: string;
  /**
   * 文件哈希
   * @example "2afb1f8b83ef0cc564f227d75d0b6914"
   */
  hash: string;
  /**
   * 文件后缀
   * @example ".jpg"
   */
  extension: string;
}

export interface ApiCreatePostDto {
  /** 文章标题 */
  title: string;
  /** 文章描述 */
  description: string;
  /** 文章内容 */
  content: string;
}

export interface ApiPost {
  /**
   * 文章标题
   * @example "文章标题"
   */
  title: string;
  /**
   * 文章描述
   * @example "文章描述"
   */
  description: string;
  /**
   * 文章内容
   * @example "文章内容"
   */
  content: string;
  /**
   * 文章作者
   * @example "文章作者"
   */
  author: ApiUser;
}

export interface ApiUpdatePostDto {
  /** 文章标题 */
  title?: string;
  /** 文章描述 */
  description?: string;
  /** 文章内容 */
  content?: string;
}

export interface ApiCreateCategoryDto {
  /**
   * 分类名称
   * @example "待分类"
   */
  title: string;
  /**
   * 分类别名
   * @example "default"
   */
  slug: string;
  /**
   * 分类描述
   * @example "默认分类"
   */
  description?: string;
  /**
   * 分类图标
   * @example "default"
   */
  icon?: string;
  /**
   * 分类排序
   * @example 0
   */
  sort?: number;
  /**
   * 分类类型
   * @example "category"
   */
  type: object;
  /**
   * 父级分类ID
   * @example 0
   */
  parentId?: number;
}

export interface ApiCategory {
  /**
   * 分类名称
   * @example "待分类"
   */
  title: string;
  /**
   * 分类别名
   * @example "default"
   */
  slug: string;
  /**
   * 分类描述
   * @example "默认分类"
   */
  description?: string;
  /**
   * 分类图标
   * @example "default"
   */
  icon?: string;
  /**
   * 分类排序
   * @example 0
   */
  sort?: number;
  /**
   * 分类类型
   * @example "category"
   */
  type?: object;
  /**
   * 父级分类ID
   * @example 0
   */
  parentId?: number;
}

export interface ApiUpdateCategoryDto {
  id: number;
  /**
   * 分类名称
   * @example "待分类"
   */
  title?: string;
  /**
   * 分类别名
   * @example "default"
   */
  slug?: string;
  /**
   * 分类描述
   * @example "默认分类"
   */
  description?: string;
  /**
   * 分类图标
   * @example "default"
   */
  icon?: string;
  /**
   * 分类排序
   * @example 0
   */
  sort?: number;
  /**
   * 分类类型
   * @example "category"
   */
  type?: object;
  /**
   * 父级分类ID
   * @example 0
   */
  parentId?: number;
}

export interface ApiResponse {
  /**
   * 状态码
   * @format int32
   * @example 2000
   */
  code: number;
  /**
   * 提示信息
   * @example "请求成功"
   */
  message: string;
}

export interface ApiGetUsersParams {
  /**
   * 用户昵称
   * @example "绝弹"
   */
  nickname?: string;
  /**
   * 排序规则
   * @default "id:desc"
   * @pattern /^(\w+:\w+,)*\w+:\w+$/
   * @example "id:desc"
   */
  sort?: string;
  /**
   * 页码
   * @min 1
   * @example 1
   */
  page?: number;
  /**
   * 每页条数
   * @min 0
   * @example 10
   */
  size?: number;
}

export interface ApiGetLogsParams {
  /**
   * 用户名
   * @example "绝弹"
   */
  nickname?: string;
  /**
   * 排序规则
   * @default "id:desc"
   * @pattern /^(\w+:\w+,)*\w+:\w+$/
   * @example "id:desc"
   */
  sort?: string;
  /**
   * 页码
   * @min 1
   * @example 1
   */
  page?: number;
  /**
   * 每页条数
   * @min 0
   * @example 10
   */
  size?: number;
}

export interface ApiGetLoginLogsParams {
  /**
   * 用户名
   * @example "绝弹"
   */
  nickname?: string;
  /**
   * 排序规则
   * @default "id:desc"
   * @pattern /^(\w+:\w+,)*\w+:\w+$/
   * @example "id:desc"
   */
  sort?: string;
  /**
   * 页码
   * @min 1
   * @example 1
   */
  page?: number;
  /**
   * 每页条数
   * @min 0
   * @example 10
   */
  size?: number;
}

export interface ApiGetPostsParams {
  /**
   * 排序规则
   * @default "id:desc"
   * @pattern /^(\w+:\w+,)*\w+:\w+$/
   * @example "id:desc"
   */
  sort?: string;
  /**
   * 页码
   * @min 1
   * @example 1
   */
  page?: number;
  /**
   * 每页条数
   * @min 0
   * @example 10
   */
  size?: number;
}

export interface ApiGetCategoriesParams {
  /**
   * 字段描述(Swagger用途)
   * @example "示例值"
   */
  demo?: string;
  /**
   * 排序规则
   * @default "id:desc"
   * @pattern /^(\w+:\w+,)*\w+:\w+$/
   * @example "id:desc"
   */
  sort?: string;
  /**
   * 页码
   * @min 1
   * @example 1
   */
  page?: number;
  /**
   * 每页条数
   * @min 0
   * @example 10
   */
  size?: number;
}
