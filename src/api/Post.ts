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

import { ApiCreatePostDto, ApiGetPostsParams, ApiPost, ApiResponse, ApiUpdatePostDto } from "./data-contracts";
import { ContentType, RequestParams, client } from "./http-client";

/**
 * 创建文章
 *
 * @tags post
 * @name AddPost
 * @request POST:/api/v1/posts
 */
export const addPost = (data: ApiCreatePostDto, params: RequestParams = {}) => {
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
    path: `/api/v1/posts`,
    method: "POST",
    body: data,
    type: ContentType.Json,
    format: "json",
    ...params,
  });
};
/**
 * 批量查询文章
 *
 * @tags post
 * @name GetPosts
 * @request GET:/api/v1/posts
 */
export const getPosts = (query: ApiGetPostsParams, params: RequestParams = {}) => {
  return client.request<ApiResponse, any>({
    path: `/api/v1/posts`,
    method: "GET",
    query: query,
    format: "json",
    ...params,
  });
};
/**
 * 获取文章下载模板
 *
 * @tags post
 * @name GetPostTemplate
 * @request GET:/api/v1/posts/template.xlsx
 */
export const getPostTemplate = (params: RequestParams = {}) => {
  return client.request<ApiResponse, any>({
    path: `/api/v1/posts/template.xlsx`,
    method: "GET",
    format: "json",
    ...params,
  });
};
/**
 * 查询文章
 *
 * @tags post
 * @name GetPost
 * @request GET:/api/v1/posts/{id}
 */
export const getPost = (id: number, params: RequestParams = {}) => {
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
      data?: ApiPost;
    },
    any
  >({
    path: `/api/v1/posts/${id}`,
    method: "GET",
    format: "json",
    ...params,
  });
};
/**
 * 更新文章
 *
 * @tags post
 * @name UpdatePost
 * @request PATCH:/api/v1/posts/{id}
 */
export const updatePost = (id: number, data: ApiUpdatePostDto, params: RequestParams = {}) => {
  return client.request<ApiResponse, any>({
    path: `/api/v1/posts/${id}`,
    method: "PATCH",
    body: data,
    type: ContentType.Json,
    format: "json",
    ...params,
  });
};
/**
 * 删除文章
 *
 * @tags post
 * @name DelPost
 * @request DELETE:/api/v1/posts/{id}
 */
export const delPost = (id: number, params: RequestParams = {}) => {
  return client.request<ApiResponse, any>({
    path: `/api/v1/posts/${id}`,
    method: "DELETE",
    format: "json",
    ...params,
  });
};
