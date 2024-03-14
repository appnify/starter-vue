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

import { ApiCreateRoleDto, ApiResponse, ApiUpdateRoleDto } from "./data-contracts";
import { ContentType, RequestParams, client } from "./http-client";

/**
 * 创建角色
 *
 * @tags role
 * @name AddRole
 * @request POST:/api/v1/roles
 */
export const addRole = (data: ApiCreateRoleDto, params: RequestParams = {}) => {
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
    path: `/api/v1/roles`,
    method: "POST",
    body: data,
    type: ContentType.Json,
    format: "json",
    ...params,
  });
};
/**
 * 批量查询角色
 *
 * @tags role
 * @name GetRoles
 * @request GET:/api/v1/roles
 */
export const getRoles = (params: RequestParams = {}) => {
  return client.request<ApiResponse, any>({
    path: `/api/v1/roles`,
    method: "GET",
    format: "json",
    ...params,
  });
};
/**
 * 查询角色
 *
 * @tags role
 * @name GetRole
 * @request GET:/api/v1/roles/{id}
 */
export const getRole = (id: number, params: RequestParams = {}) => {
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
      data?: string;
    },
    any
  >({
    path: `/api/v1/roles/${id}`,
    method: "GET",
    format: "json",
    ...params,
  });
};
/**
 * 更新角色
 *
 * @tags role
 * @name UpdateRole
 * @request PATCH:/api/v1/roles/{id}
 */
export const updateRole = (id: number, data: ApiUpdateRoleDto, params: RequestParams = {}) => {
  return client.request<ApiResponse, any>({
    path: `/api/v1/roles/${id}`,
    method: "PATCH",
    body: data,
    type: ContentType.Json,
    format: "json",
    ...params,
  });
};
/**
 * 删除角色
 *
 * @tags role
 * @name DelRole
 * @request DELETE:/api/v1/roles/{id}
 */
export const delRole = (id: number, params: RequestParams = {}) => {
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
      data?: string;
    },
    any
  >({
    path: `/api/v1/roles/${id}`,
    method: "DELETE",
    format: "json",
    ...params,
  });
};
