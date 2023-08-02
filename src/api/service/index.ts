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
  /** 用户角色 */
  roles: Role[];
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
   * 角色用户
   * @example [1,2,3]
   */
  user: User;
}

export interface CreateUserDto {
  /**
   * 登录账号
   * @example "juetan"
   */
  username: string;
  /**
   * 用户密码
   * @example "password"
   */
  password: string;
  /**
   * 用户昵称
   * @example "绝弹"
   */
  nickname: string;
  /**
   * 用户头像
   * @example "./assets/222421415123.png "
   */
  avatar: string;
  /**
   * 用户角色
   * @example [1,2,3]
   */
  roles: Role[];
}

export interface UpdateUserDto {
  /**
   * 登录账号
   * @example "juetan"
   */
  username?: string;
  /**
   * 用户密码
   * @example "password"
   */
  password?: string;
  /**
   * 用户昵称
   * @example "绝弹"
   */
  nickname?: string;
  /**
   * 用户头像
   * @example "./assets/222421415123.png "
   */
  avatar?: string;
  /**
   * 用户角色
   * @example [1,2,3]
   */
  roles?: Role[];
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

export interface CreateRoleDto {
  name: string;
  slug: string;
  description?: string;
  permissions?: Permission[];
}

export interface UpdateRoleDto {
  name?: string;
  slug?: string;
  description?: string;
  permissions?: Permission[];
}

export interface CreatePermissionDto {
  name: string;
  slug: string;
  description: string;
}

export interface UpdatePermissionDto {
  name?: string;
  slug?: string;
  description?: string;
}

export interface CreateUploadDto {
  /** @format binary */
  file: File;
}

export type CreatePostDto = object;

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

export type UpdatePostDto = object;

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
   * 页码
   * @min 1
   * @example 1
   */
  page?: number;
  /**
   * 每页条数
   * @min 1
   * @example 10
   */
  size?: number;
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
     * 创建用户
     *
     * @tags user
     * @name AddUser
     * @request POST:/api/v1/users
     */
    addUser: (data: CreateUserDto, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data?: number;
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
     * No description
     *
     * @tags user
     * @name GetUsers
     * @summary 批量查询用户
     * @request GET:/api/v1/users
     */
    getUsers: (query: GetUsersParams, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data?: User[];
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
     * No description
     *
     * @tags user
     * @name GetUserv2
     * @summary 查询用户
     * @request GET:/api/v2/users/{id}
     */
    getUserv2: (id: number, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data?: User;
        },
        any
      >({
        path: `/api/v2/users/${id}`,
        method: "GET",
        format: "json",
        ...params,
      });
    },

    /**
     * No description
     *
     * @tags user
     * @name UpdateUser
     * @summary 更新用户
     * @request PATCH:/api/v1/users/{id}
     */
    updateUser: (id: number, data: UpdateUserDto, params: RequestParams = {}) => {
      return this.request<void, any>({
        path: `/api/v1/users/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      });
    },

    /**
     * No description
     *
     * @tags user
     * @name DeleteUser
     * @summary 删除用户
     * @request DELETE:/api/v1/users/{id}
     */
    deleteUser: (id: number, params: RequestParams = {}) => {
      return this.request<void, any>({
        path: `/api/v1/users/${id}`,
        method: "DELETE",
        ...params,
      });
    },
  };
  auth = {
    /**
     * No description
     *
     * @tags auth
     * @name Login
     * @summary 账号登录
     * @request POST:/api/v1/auth/login
     */
    login: (data: AuthUserDto, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data?: string;
        },
        void
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
  role = {
    /**
     * No description
     *
     * @tags role
     * @name AddRole
     * @summary 创建角色
     * @request POST:/api/v1/roles
     */
    addRole: (data: CreateRoleDto, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data?: number;
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
     * No description
     *
     * @tags role
     * @name GetRoles
     * @summary 批量查询角色
     * @request GET:/api/v1/roles
     */
    getRoles: (params: RequestParams = {}) => {
      return this.request<void, any>({
        path: `/api/v1/roles`,
        method: "GET",
        ...params,
      });
    },

    /**
     * No description
     *
     * @tags role
     * @name GetRole
     * @summary 查询角色
     * @request GET:/api/v1/roles/{id}
     */
    getRole: (id: string, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data?: string;
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
     * No description
     *
     * @tags role
     * @name UpdateRole
     * @summary 更新角色
     * @request PATCH:/api/v1/roles/{id}
     */
    updateRole: (id: string, data: UpdateRoleDto, params: RequestParams = {}) => {
      return this.request<void, any>({
        path: `/api/v1/roles/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      });
    },

    /**
     * No description
     *
     * @tags role
     * @name DelRole
     * @summary 删除角色
     * @request DELETE:/api/v1/roles/{id}
     */
    delRole: (id: string, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data?: string;
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
     * No description
     *
     * @tags permission
     * @name AddPermission
     * @summary 创建权限
     * @request POST:/api/v1/permissions
     */
    addPermission: (data: CreatePermissionDto, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data?: number;
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
     * No description
     *
     * @tags permission
     * @name GetPermissions
     * @summary 批量查询权限
     * @request GET:/api/v1/permissions
     */
    getPermissions: (params: RequestParams = {}) => {
      return this.request<void, any>({
        path: `/api/v1/permissions`,
        method: "GET",
        ...params,
      });
    },

    /**
     * No description
     *
     * @tags permission
     * @name GetPermission
     * @summary 查询权限
     * @request GET:/api/v1/permissions/{id}
     */
    getPermission: (id: string, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data?: string;
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
     * No description
     *
     * @tags permission
     * @name UpdatePermission
     * @summary 更新权限
     * @request PATCH:/api/v1/permissions/{id}
     */
    updatePermission: (id: string, data: UpdatePermissionDto, params: RequestParams = {}) => {
      return this.request<void, any>({
        path: `/api/v1/permissions/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      });
    },

    /**
     * No description
     *
     * @tags permission
     * @name DelPermission
     * @summary 删除权限
     * @request DELETE:/api/v1/permissions/{id}
     */
    delPermission: (id: string, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data?: string;
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
     * No description
     *
     * @tags upload
     * @name Upload
     * @summary 上传文件
     * @request POST:/api/v1/upload
     */
    upload: (data: CreateUploadDto, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data?: number;
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
     * No description
     *
     * @tags upload
     * @name GetUploads
     * @summary 批量查询
     * @request GET:/api/v1/upload
     */
    getUploads: (params: RequestParams = {}) => {
      return this.request<void, any>({
        path: `/api/v1/upload`,
        method: "GET",
        ...params,
      });
    },

    /**
     * No description
     *
     * @tags upload
     * @name GetUpload
     * @summary 查询
     * @request GET:/api/v1/upload/{id}
     */
    getUpload: (id: string, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data?: string;
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
     * No description
     *
     * @tags upload
     * @name UpdateUpload
     * @summary 更新
     * @request PATCH:/api/v1/upload/{id}
     */
    updateUpload: (id: string, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data?: string;
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
     * No description
     *
     * @tags upload
     * @name DelUpload
     * @summary 删除
     * @request DELETE:/api/v1/upload/{id}
     */
    delUpload: (id: string, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data?: string;
        },
        any
      >({
        path: `/api/v1/upload/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      });
    },
  };
  post = {
    /**
     * No description
     *
     * @tags post
     * @name AddPost
     * @summary 创建文章
     * @request POST:/api/v1/post
     */
    addPost: (data: CreatePostDto, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data?: number;
        },
        any
      >({
        path: `/api/v1/post`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      });
    },

    /**
     * No description
     *
     * @tags post
     * @name GetPosts
     * @summary 批量查询文章
     * @request GET:/api/v1/post
     */
    getPosts: (params: RequestParams = {}) => {
      return this.request<void, any>({
        path: `/api/v1/post`,
        method: "GET",
        ...params,
      });
    },

    /**
     * No description
     *
     * @tags post
     * @name GetPost
     * @summary 查询文章
     * @request GET:/api/v1/post/{id}
     */
    getPost: (id: string, params: RequestParams = {}) => {
      return this.request<
        Response & {
          data?: Post;
        },
        any
      >({
        path: `/api/v1/post/${id}`,
        method: "GET",
        format: "json",
        ...params,
      });
    },

    /**
     * No description
     *
     * @tags post
     * @name UpdatePost
     * @summary 更新文章
     * @request PATCH:/api/v1/post/{id}
     */
    updatePost: (id: string, data: UpdatePostDto, params: RequestParams = {}) => {
      return this.request<void, any>({
        path: `/api/v1/post/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      });
    },

    /**
     * No description
     *
     * @tags post
     * @name DelPost
     * @summary 删除文章
     * @request DELETE:/api/v1/post/{id}
     */
    delPost: (id: string, params: RequestParams = {}) => {
      return this.request<void, any>({
        path: `/api/v1/post/${id}`,
        method: "DELETE",
        ...params,
      });
    },
  };
}
