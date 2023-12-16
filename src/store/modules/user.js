import {login, logout, getInfo} from '@/api/user'
import {resetRouter} from '@/router'
import {token} from '@/config/config'

const state = {
  // 用户信息数据
  userData: {},
  // 是否登陆
  isLogin: sessionStorage.getItem(token) ? true : false,
  // 角色权限集合
  roles: [],
  // 用户token
  userToken: ''
}

const mutations = {
  // 设置角色
  setRoles: (state, roles) => {
    state.roles = roles
  },
  // 设置用户数据
  setUserData(state, data) {
    state.userData = data
  },
  // 修改登陆状态
  setIsLogin(state, data) {
    state.isLogin = data
  },
  // 修改用户token
  setUserToken(state, data) {
    state.userToken = data
  }
}

const actions = {
  // 登录
  login({commit}, loginParam) {
    const {username, password} = loginParam
    return new Promise((resolve, reject) => {
      login({username: username.trim(), password: password}).then(res => {
        const {data} = res
        sessionStorage.setItem(token, data.token)
        // 设置登录状态为true
        commit('setIsLogin', true)
        commit('setUserToken', data.token)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      getInfo().then(res => {
        const userInfo = res.data.userInfo
        if (!userInfo.roles) {
          console.error('权限不能为空数组，否则路由死循环')
          reject('权限不能为空数组，否则路由死循环');
        }
        commit('setUserData', userInfo)
        commit('setRoles', userInfo.roles)
        resolve(userInfo)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 退出登录
  logout({commit, state, dispatch}) {
    return new Promise((resolve, reject) => {
      logout().then(res => {
        // 清除用户数据
        commit('setUserData', '')
        // 清楚用户权限集合
        commit('setRoles', [])
        // 设置登录状态为false
        commit('setIsLogin', false)
        // 清除token数据
        commit('setUserToken', '')
        // 清除缓存的用户数据
        sessionStorage.removeItem(token)
        // 清除缓存的多页签数据
        dispatch('tagsView/setTagsView', [], {root: true})
        // 重置路由
        resetRouter()
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 清除session数据，用于会话超时时清除数据
  clean({commit, state, dispatch}) {
    return new Promise((resolve, reject) => {
      // 清除用户数据
      commit('setUserData', '')
      // 清楚用户权限集合
      commit('setRoles', [])
      // 设置登录状态为false
      commit('setIsLogin', false)
      // 清除token数据
      commit('setUserToken', '')
      // 清除缓存的用户数据
      sessionStorage.removeItem(token)
      // 清除缓存的多页签数据
      dispatch('tagsView/setTagsView', [], {root: true})
      // 重置路由
      resetRouter()
      resolve()
    })
  },

  // 设置用户数据
  setUserData({commit}, data) {
    commit('setUserData', data);
  },

  // 修改登陆状态
  setIsLogin({commit}, data) {
    commit('setIsLogin', data);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
