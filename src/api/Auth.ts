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

import { ApiAuthUserDto, ApiLoginedUserVo } from "./data-contracts";
import { ContentType, RequestParams, client } from "./http-client";

/**
 * 账号登陆
 *
 * @tags auth
 * @name Login
 * @request POST:/api/v1/auth/login
 */
export const login = (data: ApiAuthUserDto, params: RequestParams = {}) => {
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
      data?: ApiLoginedUserVo;
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
};
