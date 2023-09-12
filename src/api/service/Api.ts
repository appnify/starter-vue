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

export interface CreateUserDto {
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

export interface User {
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

export interface UpdateUserDto {
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

export interface AuthUserDto {
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

export interface LoginedUserVo {
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

export interface CreateLogDto {
  /**
   * 字段描述(Swagger用途)
   * @example "demo"
   */
  demo: string;
}

export interface LoginLog {
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

export interface UpdateLogDto {
  /**
   * 字段描述(Swagger用途)
   * @example "demo"
   */
  demo?: string;
}

export interface Role {
  /**
   * 角色名称
   * @example "管理员"
   */
  name: string;
  /**
   * 角色标识
   * @example "admin"
   */
  slug: string;
  /**
   * 角色描述
   * @example "拥有所有权限"
   */
  description: string;
  /**
   * 角色权限
   * @example [1,2,3]
   */
  permissions: Permission[];
  /**
   * 角色权限ID
   * @example [1,2,3]
   */
  permissionIds: number[];
  /**
   * 角色用户
   * @example [1,2,3]
   */
  user: User;
}

export interface Permission {
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
   * 权限描述
   * @example "文章列表"
   */
  description: string;
  /**
   * 权限角色
   * @example "文章列表"
   */
  roles: Role[];
}

export interface CreateRoleDto {
  name: string;
  slug: string;
  description?: string;
  permissions?: Permission[];
}

export interface UpdateRoleDto {
  permissionIds?: number[];
  name?: string;
  slug?: string;
  description?: string;
  permissions?: Permission[];
}

export interface CreatePermissionDto {
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

export interface UpdatePermissionDto {
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

export interface CreateUploadDto {
  /** @format binary */
  file: File;
}

export interface Upload {
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
   * @example "xxx"
   */
  hash: string;
  /**
   * 文件后缀
   * @example ".jpg"
   */
  extension: string;
}

export interface CreatePostDto {
  /** 文章标题 */
  title: string;
  /** 文章描述 */
  description: string;
  /** 文章内容 */
  content: string;
}

export interface Post {
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
  author: User;
}

export interface UpdatePostDto {
  /** 文章标题 */
  title?: string;
  /** 文章描述 */
  description?: string;
  /** 文章内容 */
  content?: string;
}

export interface Response {
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

export interface GetUsersParams {
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

export interface GetLogsParams {
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

export interface GetLoginLogsParams {
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

export interface GetPostsParams {
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

export namespace User {
  /**
   * @description 新增用户
   * @tags user
   * @name AddUser
   * @request POST:/api/v1/users
   */
  export namespace AddUser {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateUserDto;
    export type RequestHeaders = {};
    export type ResponseBody = Response & {
      data: number;
    };
  }
  /**
   * @description 分页/条件查询用户
   * @tags user
   * @name GetUsers
   * @request GET:/api/v1/users
   */
  export namespace GetUsers {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Response & {
      data: User[];
    };
  }
  /**
   * @description 根据ID查询用户
   * @tags user
   * @name GetUser
   * @request GET:/api/v1/users/{id}
   */
  export namespace GetUser {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Response & {
      data: User;
    };
  }
  /**
   * @description 根据ID更新用户
   * @tags user
   * @name UpdateUser
   * @request PATCH:/api/v1/users/{id}
   */
  export namespace UpdateUser {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateUserDto;
    export type RequestHeaders = {};
    export type ResponseBody = Response;
  }
  /**
   * @description 根据ID删除用户
   * @tags user
   * @name DelUser
   * @request DELETE:/api/v1/users/{id}
   */
  export namespace DelUser {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Response;
  }
}

export namespace Auth {
  /**
   * @description 账号登陆
   * @tags auth
   * @name Login
   * @request POST:/api/v1/auth/login
   */
  export namespace Login {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AuthUserDto;
    export type RequestHeaders = {};
    export type ResponseBody = Response & {
      data: LoginedUserVo;
    };
  }
}

export namespace Log {
  /**
   * @description 新增日志管理
   * @tags log
   * @name AddLog
   * @request POST:/api/v1/logs
   */
  export namespace AddLog {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = Response & {
      data: number;
    };
  }
  /**
   * @description 根据分页/过滤参数查询日志管理
   * @tags log
   * @name GetLogs
   * @request GET:/api/v1/logs
   */
  export namespace GetLogs {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Response & {
      data: LoginLog[];
    };
  }
  /**
   * No description
   * @tags log
   * @name GetLoginLogs
   * @request GET:/api/v1/logs/login
   */
  export namespace GetLoginLogs {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Response & {
      data: LoginLog[];
    };
  }
  /**
   * @description 根据ID查询日志管理
   * @tags log
   * @name GetLog
   * @request GET:/api/v1/logs/{id}
   */
  export namespace GetLog {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Response & {
      data: LoginLog;
    };
  }
  /**
   * @description 根据ID更新日志管理
   * @tags log
   * @name UpdateLog
   * @request PATCH:/api/v1/logs/{id}
   */
  export namespace UpdateLog {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = Response;
  }
  /**
   * @description 根据ID删除日志管理
   * @tags log
   * @name DelLog
   * @request DELETE:/api/v1/logs/{id}
   */
  export namespace DelLog {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Response;
  }
}

export namespace Role {
  /**
   * @description 创建角色
   * @tags role
   * @name AddRole
   * @request POST:/api/v1/roles
   */
  export namespace AddRole {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateRoleDto;
    export type RequestHeaders = {};
    export type ResponseBody = Response & {
      data: number;
    };
  }
  /**
   * @description 批量查询角色
   * @tags role
   * @name GetRoles
   * @request GET:/api/v1/roles
   */
  export namespace GetRoles {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Response;
  }
  /**
   * @description 查询角色
   * @tags role
   * @name GetRole
   * @request GET:/api/v1/roles/{id}
   */
  export namespace GetRole {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Response & {
      data: string;
    };
  }
  /**
   * @description 更新角色
   * @tags role
   * @name UpdateRole
   * @request PATCH:/api/v1/roles/{id}
   */
  export namespace UpdateRole {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateRoleDto;
    export type RequestHeaders = {};
    export type ResponseBody = Response;
  }
  /**
   * @description 删除角色
   * @tags role
   * @name DelRole
   * @request DELETE:/api/v1/roles/{id}
   */
  export namespace DelRole {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Response & {
      data: string;
    };
  }
}

export namespace Permission {
  /**
   * @description 创建权限
   * @tags permission
   * @name AddPermission
   * @request POST:/api/v1/permissions
   */
  export namespace AddPermission {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreatePermissionDto;
    export type RequestHeaders = {};
    export type ResponseBody = Response & {
      data: number;
    };
  }
  /**
   * @description 批量查询权限
   * @tags permission
   * @name GetPermissions
   * @request GET:/api/v1/permissions
   */
  export namespace GetPermissions {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Response;
  }
  /**
   * @description 查询权限
   * @tags permission
   * @name GetPermission
   * @request GET:/api/v1/permissions/{id}
   */
  export namespace GetPermission {
    export type RequestParams = {
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Response & {
      data: string;
    };
  }
  /**
   * @description 更新权限
   * @tags permission
   * @name UpdatePermission
   * @request PATCH:/api/v1/permissions/{id}
   */
  export namespace UpdatePermission {
    export type RequestParams = {
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdatePermissionDto;
    export type RequestHeaders = {};
    export type ResponseBody = Response;
  }
  /**
   * @description 删除权限
   * @tags permission
   * @name DelPermission
   * @request DELETE:/api/v1/permissions/{id}
   */
  export namespace DelPermission {
    export type RequestParams = {
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Response & {
      data: string;
    };
  }
}

export namespace Upload {
  /**
   * @description 上传文件
   * @tags upload
   * @name AddFile
   * @request POST:/api/v1/upload
   */
  export namespace AddFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateUploadDto;
    export type RequestHeaders = {};
    export type ResponseBody = Response & {
      data: number;
    };
  }
  /**
   * @description 批量查询
   * @tags upload
   * @name GetUploads
   * @request GET:/api/v1/upload
   */
  export namespace GetUploads {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Response;
  }
  /**
   * @description 查询
   * @tags upload
   * @name GetFile
   * @request GET:/api/v1/upload/{id}
   */
  export namespace GetFile {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Response & {
      data: Upload;
    };
  }
  /**
   * @description 更新
   * @tags upload
   * @name UpdateFile
   * @request PATCH:/api/v1/upload/{id}
   */
  export namespace UpdateFile {
    export type RequestParams = {
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Response & {
      data: string;
    };
  }
  /**
   * @description 删除
   * @tags upload
   * @name DelFile
   * @request DELETE:/api/v1/upload/{id}
   */
  export namespace DelFile {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Response;
  }
}

export namespace Post {
  /**
   * @description 创建文章
   * @tags post
   * @name AddPost
   * @request POST:/api/v1/posts
   */
  export namespace AddPost {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreatePostDto;
    export type RequestHeaders = {};
    export type ResponseBody = Response & {
      data: number;
    };
  }
  /**
   * @description 批量查询文章
   * @tags post
   * @name GetPosts
   * @request GET:/api/v1/posts
   */
  export namespace GetPosts {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Response;
  }
  /**
   * @description 获取文章下载模板
   * @tags post
   * @name GetPostTemplate
   * @request GET:/api/v1/posts/template.xlsx
   */
  export namespace GetPostTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Response;
  }
  /**
   * @description 查询文章
   * @tags post
   * @name GetPost
   * @request GET:/api/v1/posts/{id}
   */
  export namespace GetPost {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Response & {
      data: Post;
    };
  }
  /**
   * @description 更新文章
   * @tags post
   * @name UpdatePost
   * @request PATCH:/api/v1/posts/{id}
   */
  export namespace UpdatePost {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdatePostDto;
    export type RequestHeaders = {};
    export type ResponseBody = Response;
  }
  /**
   * @description 删除文章
   * @tags post
   * @name DelPost
   * @request DELETE:/api/v1/posts/{id}
   */
  export namespace DelPost {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Response;
  }
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set11 parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Appnify接口文档
 * @version 1.0
 * @externalDocs /openapi.json
 * @contact
 *
 * Openapi 3.0文档
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  user = {
    /**
     * 新增用户
     *
     * @tags user
     * @name AddUser
     * @request POST:/api/v1/users
     */
    addUser: (data: CreateUserDto, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data: number;
        },
        any
      >({
        path: `/api/v1/users`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      });
    },

    /**
     * 分页/条件查询用户
     *
     * @tags user
     * @name GetUsers
     * @request GET:/api/v1/users
     */
    getUsers: (query: GetUsersParams, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data: User[];
        },
        any
      >({
        path: `/api/v1/users`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      });
    },

    /**
     * 根据ID查询用户
     *
     * @tags user
     * @name GetUser
     * @request GET:/api/v1/users/{id}
     */
    getUser: (id: number, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data: User;
        },
        any
      >({
        path: `/api/v1/users/${id}`,
        method: "GET",
        format: "json",
        ...params,
      });
    },

    /**
     * 根据ID更新用户
     *
     * @tags user
     * @name UpdateUser
     * @request PATCH:/api/v1/users/{id}
     */
    updateUser: (id: number, data: UpdateUserDto, params: RequestParams = {}) => {
      return this.request<Response, any>({
        path: `/api/v1/users/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      });
    },

    /**
     * 根据ID删除用户
     *
     * @tags user
     * @name DelUser
     * @request DELETE:/api/v1/users/{id}
     */
    delUser: (id: number, params: RequestParams = {}) => {
      return this.request<Response, any>({
        path: `/api/v1/users/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      });
    },
  };
  auth = {
    /**
     * 账号登陆
     *
     * @tags auth
     * @name Login
     * @request POST:/api/v1/auth/login
     */
    login: (data: AuthUserDto, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data: LoginedUserVo;
        },
        any
      >({
        path: `/api/v1/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      });
    },
  };
  log = {
    /**
     * 新增日志管理
     *
     * @tags log
     * @name AddLog
     * @request POST:/api/v1/logs
     */
    addLog: (data: CreateLogDto, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data: number;
        },
        any
      >({
        path: `/api/v1/logs`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      });
    },

    /**
     * 根据分页/过滤参数查询日志管理
     *
     * @tags log
     * @name GetLogs
     * @request GET:/api/v1/logs
     */
    getLogs: (query: GetLogsParams, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data: LoginLog[];
        },
        any
      >({
        path: `/api/v1/logs`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      });
    },

    /**
     * No description
     *
     * @tags log
     * @name GetLoginLogs
     * @request GET:/api/v1/logs/login
     */
    getLoginLogs: (query: GetLoginLogsParams, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data: LoginLog[];
        },
        any
      >({
        path: `/api/v1/logs/login`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      });
    },

    /**
     * 根据ID查询日志管理
     *
     * @tags log
     * @name GetLog
     * @request GET:/api/v1/logs/{id}
     */
    getLog: (id: number, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data: LoginLog;
        },
        any
      >({
        path: `/api/v1/logs/${id}`,
        method: "GET",
        format: "json",
        ...params,
      });
    },

    /**
     * 根据ID更新日志管理
     *
     * @tags log
     * @name UpdateLog
     * @request PATCH:/api/v1/logs/{id}
     */
    updateLog: (id: number, data: UpdateLogDto, params: RequestParams = {}) => {
      return this.request<Response, any>({
        path: `/api/v1/logs/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      });
    },

    /**
     * 根据ID删除日志管理
     *
     * @tags log
     * @name DelLog
     * @request DELETE:/api/v1/logs/{id}
     */
    delLog: (id: number, params: RequestParams = {}) => {
      return this.request<Response, any>({
        path: `/api/v1/logs/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      });
    },
  };
  role = {
    /**
     * 创建角色
     *
     * @tags role
     * @name AddRole
     * @request POST:/api/v1/roles
     */
    addRole: (data: CreateRoleDto, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data: number;
        },
        any
      >({
        path: `/api/v1/roles`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      });
    },

    /**
     * 批量查询角色
     *
     * @tags role
     * @name GetRoles
     * @request GET:/api/v1/roles
     */
    getRoles: (params: RequestParams = {}) => {
      return this.request<Response, any>({
        path: `/api/v1/roles`,
        method: "GET",
        format: "json",
        ...params,
      });
    },

    /**
     * 查询角色
     *
     * @tags role
     * @name GetRole
     * @request GET:/api/v1/roles/{id}
     */
    getRole: (id: number, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data: string;
        },
        any
      >({
        path: `/api/v1/roles/${id}`,
        method: "GET",
        format: "json",
        ...params,
      });
    },

    /**
     * 更新角色
     *
     * @tags role
     * @name UpdateRole
     * @request PATCH:/api/v1/roles/{id}
     */
    updateRole: (id: number, data: UpdateRoleDto, params: RequestParams = {}) => {
      return this.request<Response, any>({
        path: `/api/v1/roles/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      });
    },

    /**
     * 删除角色
     *
     * @tags role
     * @name DelRole
     * @request DELETE:/api/v1/roles/{id}
     */
    delRole: (id: number, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data: string;
        },
        any
      >({
        path: `/api/v1/roles/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      });
    },
  };
  permission = {
    /**
     * 创建权限
     *
     * @tags permission
     * @name AddPermission
     * @request POST:/api/v1/permissions
     */
    addPermission: (data: CreatePermissionDto, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data: number;
        },
        any
      >({
        path: `/api/v1/permissions`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      });
    },

    /**
     * 批量查询权限
     *
     * @tags permission
     * @name GetPermissions
     * @request GET:/api/v1/permissions
     */
    getPermissions: (params: RequestParams = {}) => {
      return this.request<Response, any>({
        path: `/api/v1/permissions`,
        method: "GET",
        format: "json",
        ...params,
      });
    },

    /**
     * 查询权限
     *
     * @tags permission
     * @name GetPermission
     * @request GET:/api/v1/permissions/{id}
     */
    getPermission: (id: string, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data: string;
        },
        any
      >({
        path: `/api/v1/permissions/${id}`,
        method: "GET",
        format: "json",
        ...params,
      });
    },

    /**
     * 更新权限
     *
     * @tags permission
     * @name UpdatePermission
     * @request PATCH:/api/v1/permissions/{id}
     */
    updatePermission: (id: string, data: UpdatePermissionDto, params: RequestParams = {}) => {
      return this.request<Response, any>({
        path: `/api/v1/permissions/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      });
    },

    /**
     * 删除权限
     *
     * @tags permission
     * @name DelPermission
     * @request DELETE:/api/v1/permissions/{id}
     */
    delPermission: (id: string, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data: string;
        },
        any
      >({
        path: `/api/v1/permissions/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      });
    },
  };
  upload = {
    /**
     * 上传文件
     *
     * @tags upload
     * @name AddFile
     * @request POST:/api/v1/upload
     */
    addFile: (data: CreateUploadDto, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data: number;
        },
        any
      >({
        path: `/api/v1/upload`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      });
    },

    /**
     * 批量查询
     *
     * @tags upload
     * @name GetUploads
     * @request GET:/api/v1/upload
     */
    getUploads: (params: RequestParams = {}) => {
      return this.request<Response, any>({
        path: `/api/v1/upload`,
        method: "GET",
        format: "json",
        ...params,
      });
    },

    /**
     * 查询
     *
     * @tags upload
     * @name GetFile
     * @request GET:/api/v1/upload/{id}
     */
    getFile: (id: number, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data: Upload;
        },
        any
      >({
        path: `/api/v1/upload/${id}`,
        method: "GET",
        format: "json",
        ...params,
      });
    },

    /**
     * 更新
     *
     * @tags upload
     * @name UpdateFile
     * @request PATCH:/api/v1/upload/{id}
     */
    updateFile: (id: string, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data: string;
        },
        any
      >({
        path: `/api/v1/upload/${id}`,
        method: "PATCH",
        format: "json",
        ...params,
      });
    },

    /**
     * 删除
     *
     * @tags upload
     * @name DelFile
     * @request DELETE:/api/v1/upload/{id}
     */
    delFile: (id: number, params: RequestParams = {}) => {
      return this.request<Response, any>({
        path: `/api/v1/upload/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      });
    },
  };
  post = {
    /**
     * 创建文章
     *
     * @tags post
     * @name AddPost
     * @request POST:/api/v1/posts
     */
    addPost: (data: CreatePostDto, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data: number;
        },
        any
      >({
        path: `/api/v1/posts`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      });
    },

    /**
     * 批量查询文章
     *
     * @tags post
     * @name GetPosts
     * @request GET:/api/v1/posts
     */
    getPosts: (query: GetPostsParams, params: RequestParams = {}) => {
      return this.request<Response, any>({
        path: `/api/v1/posts`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      });
    },

    /**
     * 获取文章下载模板
     *
     * @tags post
     * @name GetPostTemplate
     * @request GET:/api/v1/posts/template.xlsx
     */
    getPostTemplate: (params: RequestParams = {}) => {
      return this.request<Response, any>({
        path: `/api/v1/posts/template.xlsx`,
        method: "GET",
        format: "json",
        ...params,
      });
    },

    /**
     * 查询文章
     *
     * @tags post
     * @name GetPost
     * @request GET:/api/v1/posts/{id}
     */
    getPost: (id: number, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data: Post;
        },
        any
      >({
        path: `/api/v1/posts/${id}`,
        method: "GET",
        format: "json",
        ...params,
      });
    },

    /**
     * 更新文章
     *
     * @tags post
     * @name UpdatePost
     * @request PATCH:/api/v1/posts/{id}
     */
    updatePost: (id: number, data: UpdatePostDto, params: RequestParams = {}) => {
      return this.request<Response, any>({
        path: `/api/v1/posts/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      });
    },

    /**
     * 删除文章
     *
     * @tags post
     * @name DelPost
     * @request DELETE:/api/v1/posts/{id}
     */
    delPost: (id: number, params: RequestParams = {}) => {
      return this.request<Response, any>({
        path: `/api/v1/posts/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      });
    },
  };
}
