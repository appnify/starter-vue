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

import { ApiCreateUserDto, ApiGetUsersParams, ApiResponse, ApiUpdateUserDto, ApiUser } from "./data-contracts";
import { ContentType, RequestParams, client } from "./http-client";

/**
 * 新增用户
 *
 * @tags user
 * @name AddUser
 * @request POST:/api/v1/users
 */
export const addUser = (data: ApiCreateUserDto, params: RequestParams = {}) => {
  return client.request<
    {
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
};
/**
 * 分页/条件查询用户
 *
 * @tags user
 * @name GetUsers
 * @request GET:/api/v1/users
 */
export const getUsers = (query: ApiGetUsersParams, params: RequestParams = {}) => {
  return client.request<
    {
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
      data?: ApiUser[];
    },
    any
  >({
    path: `/api/v1/users`,
    method: "GET",
    query: query,
    format: "json",
    ...params,
  });
};
/**
 * 根据ID查询用户
 *
 * @tags user
 * @name GetUser
 * @request GET:/api/v1/users/{id}
 */
export const getUser = (id: number, params: RequestParams = {}) => {
  return client.request<
    {
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
      data?: ApiUser;
    },
    any
  >({
    path: `/api/v1/users/${id}`,
    method: "GET",
    format: "json",
    ...params,
  });
};
/**
 * 根据ID更新用户
 *
 * @tags user
 * @name UpdateUser
 * @request PATCH:/api/v1/users/{id}
 */
export const updateUser = (id: number, data: ApiUpdateUserDto, params: RequestParams = {}) => {
  return client.request<ApiResponse, any>({
    path: `/api/v1/users/${id}`,
    method: "PATCH",
    body: data,
    type: ContentType.Json,
    format: "json",
    ...params,
  });
};
/**
 * 根据ID删除用户
 *
 * @tags user
 * @name DelUser
 * @request DELETE:/api/v1/users/{id}
 */
export const delUser = (id: number, params: RequestParams = {}) => {
  return client.request<ApiResponse, any>({
    path: `/api/v1/users/${id}`,
    method: "DELETE",
    format: "json",
    ...params,
  });
};
