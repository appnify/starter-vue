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

import { ApiCreateLogDto, ApiGetLoginLogsParams, ApiGetLogsParams, ApiLoginLog, ApiResponse, ApiUpdateLogDto } from "./data-contracts";
import { ContentType, RequestParams, client } from "./http-client";

/**
 * 新增日志管理
 *
 * @tags log
 * @name AddLog
 * @request POST:/api/v1/logs
 */
export const addLog = (data: ApiCreateLogDto, params: RequestParams = {}) => {
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
    path: `/api/v1/logs`,
    method: "POST",
    body: data,
    type: ContentType.Json,
    format: "json",
    ...params,
  });
};
/**
 * 根据分页/过滤参数查询日志管理
 *
 * @tags log
 * @name GetLogs
 * @request GET:/api/v1/logs
 */
export const getLogs = (query: ApiGetLogsParams, params: RequestParams = {}) => {
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
      data?: ApiLoginLog[];
    },
    any
  >({
    path: `/api/v1/logs`,
    method: "GET",
    query: query,
    format: "json",
    ...params,
  });
};
/**
 * 分页查询登陆日志
 *
 * @tags log
 * @name GetLoginLogs
 * @request GET:/api/v1/logs/login
 */
export const getLoginLogs = (query: ApiGetLoginLogsParams, params: RequestParams = {}) => {
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
      data?: ApiLoginLog[];
    },
    any
  >({
    path: `/api/v1/logs/login`,
    method: "GET",
    query: query,
    format: "json",
    ...params,
  });
};
/**
 * 根据ID查询日志管理
 *
 * @tags log
 * @name GetLog
 * @request GET:/api/v1/logs/{id}
 */
export const getLog = (id: number, params: RequestParams = {}) => {
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
      data?: ApiLoginLog;
    },
    any
  >({
    path: `/api/v1/logs/${id}`,
    method: "GET",
    format: "json",
    ...params,
  });
};
/**
 * 根据ID更新日志管理
 *
 * @tags log
 * @name UpdateLog
 * @request PATCH:/api/v1/logs/{id}
 */
export const updateLog = (id: number, data: ApiUpdateLogDto, params: RequestParams = {}) => {
  return client.request<ApiResponse, any>({
    path: `/api/v1/logs/${id}`,
    method: "PATCH",
    body: data,
    type: ContentType.Json,
    format: "json",
    ...params,
  });
};
/**
 * 根据ID删除日志管理
 *
 * @tags log
 * @name DelLog
 * @request DELETE:/api/v1/logs/{id}
 */
export const delLog = (id: number, params: RequestParams = {}) => {
  return client.request<ApiResponse, any>({
    path: `/api/v1/logs/${id}`,
    method: "DELETE",
    format: "json",
    ...params,
  });
};
