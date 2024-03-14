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

import { ApiCategory, ApiCreateCategoryDto, ApiGetCategoriesParams, ApiResponse, ApiUpdateCategoryDto } from "./data-contracts";
import { ContentType, RequestParams, client } from "./http-client";

/**
 * 添加分类
 *
 * @tags category
 * @name AddCategory
 * @request POST:/api/v1/categories
 */
export const addCategory = (data: ApiCreateCategoryDto, params: RequestParams = {}) => {
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
    path: `/api/v1/categories`,
    method: "POST",
    body: data,
    type: ContentType.Json,
    format: "json",
    ...params,
  });
};
/**
 * 分页获取分类
 *
 * @tags category
 * @name GetCategories
 * @request GET:/api/v1/categories
 */
export const getCategories = (query: ApiGetCategoriesParams, params: RequestParams = {}) => {
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
      data?: ApiCategory[];
    },
    any
  >({
    path: `/api/v1/categories`,
    method: "GET",
    query: query,
    format: "json",
    ...params,
  });
};
/**
 * 添加分类
 *
 * @tags category
 * @name GetCategory
 * @request GET:/api/v1/categories/{id}
 */
export const getCategory = (id: string, params: RequestParams = {}) => {
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
      data?: ApiCategory;
    },
    any
  >({
    path: `/api/v1/categories/${id}`,
    method: "GET",
    format: "json",
    ...params,
  });
};
/**
 * 更新分类
 *
 * @tags category
 * @name SetCategory
 * @request PATCH:/api/v1/categories/{id}
 */
export const setCategory = (id: string, data: ApiUpdateCategoryDto, params: RequestParams = {}) => {
  return client.request<ApiResponse, any>({
    path: `/api/v1/categories/${id}`,
    method: "PATCH",
    body: data,
    type: ContentType.Json,
    format: "json",
    ...params,
  });
};
/**
 * 删除分类
 *
 * @tags category
 * @name DelCategory
 * @request DELETE:/api/v1/categories/{id}
 */
export const delCategory = (id: string, params: RequestParams = {}) => {
  return client.request<ApiResponse, any>({
    path: `/api/v1/categories/${id}`,
    method: "DELETE",
    format: "json",
    ...params,
  });
};
