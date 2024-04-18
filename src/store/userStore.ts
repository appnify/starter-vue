import { Auths } from '@/config/auths'
import { MenuItem } from '@/router/menus'
import { defineStore } from 'pinia'

export interface UserStore {
  /**
   * 用户ID
   */
  id: number
  /**
   * 登录用户名
   */
  username: string
  /**
   * 用户昵称
   */
  nickname: string
  /**
   * 头像地址
   */
  avatar?: string
  /**
   * 访问令牌
   */
  token?: string
  /**
   * 刷新令牌
   */
  refreshToken?: string
  /**
   * 用户权限
   */
  auths: Auths
  /**
   * 用户菜单
   */
  menus: MenuItem[]
  /**
   * 路由缓存，存的是组件名字
   */
  caches: string[]
  /**
   * 角色ID
   */
  roleId: number
  /**
   * 角色名称
   */
  roleName: string
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserStore => {
    return {
      id: 0,
      username: 'juetan',
      nickname: '绝弹',
      avatar: 'https://github.com/juetan.png',
      roleId: 0,
      roleName: '',
      token: '',
      refreshToken: '',
      auths: {} as Auths,
      menus: [],
      caches: [],
    }
  },
  actions: {
    /**
     * 设置令牌
     */
    setToken(token: string) {
      this.token = token
    },

    /**
     * 设置访问令牌
     * @param token 令牌
     */
    setAccessToken(token?: string) {
      this.token = token
    },

    /**
     * 清除用户信息
     */
    clearUser() {
      this.$reset()
    },

    /**
     * 设置用户信息
     */
    setUser(user: Partial<UserStore>) {
      const { id, username, nickname, avatar, token: accessToken } = user
      id && (this.id = id)
      username && (this.username = username)
      nickname && (this.nickname = nickname)
      avatar && (this.avatar = avatar)
      accessToken && (this.token = accessToken)
    },

    hasAuth(auth: string, defaultValue = false) {
      return true
    },
  },
  persist: {
    key: 'app:user',
    paths: ['token', 'id'],
  },
})
