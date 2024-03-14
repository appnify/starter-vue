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

import { ApiCreatePermissionDto, ApiResponse, ApiUpdatePermissionDto } from "./data-contracts";
import { ContentType, RequestParams, client } from "./http-client";

/**
 * 创建权限
 *
 * @tags permission
 * @name AddPermission
 * @request POST:/api/v1/permissions
 */
export const addPermission = (data: ApiCreatePermissionDto, params: RequestParams = {}) => {
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
    path: `/api/v1/permissions`,
    method: "POST",
    body: data,
    type: ContentType.Json,
    format: "json",
    ...params,
  });
};
/**
 * 批量查询权限
 *
 * @tags permission
 * @name GetPermissions
 * @request GET:/api/v1/permissions
 */
export const getPermissions = (params: RequestParams = {}) => {
  return client.request<ApiResponse, any>({
    path: `/api/v1/permissions`,
    method: "GET",
    format: "json",
    ...params,
  });
};
/**
 * 查询权限
 *
 * @tags permission
 * @name GetPermission
 * @request GET:/api/v1/permissions/{id}
 */
export const getPermission = (id: string, params: RequestParams = {}) => {
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
    path: `/api/v1/permissions/${id}`,
    method: "GET",
    format: "json",
    ...params,
  });
};
/**
 * 更新权限
 *
 * @tags permission
 * @name SetPermission
 * @request PATCH:/api/v1/permissions/{id}
 */
export const setPermission = (id: string, data: ApiUpdatePermissionDto, params: RequestParams = {}) => {
  return client.request<ApiResponse, any>({
    path: `/api/v1/permissions/${id}`,
    method: "PATCH",
    body: data,
    type: ContentType.Json,
    format: "json",
    ...params,
  });
};
/**
 * 删除权限
 *
 * @tags permission
 * @name DelPermission
 * @request DELETE:/api/v1/permissions/{id}
 */
export const delPermission = (id: string, params: RequestParams = {}) => {
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
    path: `/api/v1/permissions/${id}`,
    method: "DELETE",
    format: "json",
    ...params,
  });
};
