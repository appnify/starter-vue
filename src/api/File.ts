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

import { ApiCreateUploadDto, ApiResponse, ApiUpload } from "./data-contracts";
import { ContentType, RequestParams, client } from "./http-client";

/**
 * 上传文件
 *
 * @tags file
 * @name AddFile
 * @request POST:/api/v1/file
 */
export const addFile = (data: ApiCreateUploadDto, params: RequestParams = {}) => {
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
    path: `/api/v1/file`,
    method: "POST",
    body: data,
    type: ContentType.FormData,
    format: "json",
    ...params,
  });
};
/**
 * 批量查询
 *
 * @tags file
 * @name GetFiles
 * @request GET:/api/v1/file
 */
export const getFiles = (params: RequestParams = {}) => {
  return client.request<ApiResponse, any>({
    path: `/api/v1/file`,
    method: "GET",
    format: "json",
    ...params,
  });
};
/**
 * 查询
 *
 * @tags file
 * @name GetFile
 * @request GET:/api/v1/file/{id}
 */
export const getFile = (id: number, params: RequestParams = {}) => {
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
      data?: ApiUpload;
    },
    any
  >({
    path: `/api/v1/file/${id}`,
    method: "GET",
    format: "json",
    ...params,
  });
};
/**
 * 更新
 *
 * @tags file
 * @name SetFile
 * @request PATCH:/api/v1/file/{id}
 */
export const setFile = (id: string, params: RequestParams = {}) => {
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
    path: `/api/v1/file/${id}`,
    method: "PATCH",
    format: "json",
    ...params,
  });
};
/**
 * 删除
 *
 * @tags file
 * @name DelFile
 * @request DELETE:/api/v1/file/{id}
 */
export const delFile = (id: number, params: RequestParams = {}) => {
  return client.request<ApiResponse, any>({
    path: `/api/v1/file/${id}`,
    method: "DELETE",
    format: "json",
    ...params,
  });
};
/**
 * 查询文件是否已存在
 *
 * @tags file
 * @name GetFileByHash
 * @request GET:/api/v1/file/hash/{hash}
 */
export const getFileByHash = (hash: string, params: RequestParams = {}) => {
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
      data?: boolean;
    },
    any
  >({
    path: `/api/v1/file/hash/${hash}`,
    method: "GET",
    format: "json",
    ...params,
  });
};
