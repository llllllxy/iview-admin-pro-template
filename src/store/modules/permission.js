import {constantRoutes} from '@/router'
import {indexPage} from '@/config/config'

import Main from "@/components/main/main";
import ParentView from "@/components/parent-view/parent-view";


/**
 * 通过递归动态生成异步路由表
 * @param routerMap
 */
const filterAsyncRoutes = (routerMap) => {
  return routerMap.map(item => {
    const {path, name, redirect, component, icon, singlePage, title, notCache, hide, children} = item

    const currentRouter = {
      meta: {}
    }
    currentRouter['path'] = path;
    currentRouter['name'] = name;
    currentRouter['redirect'] = redirect;
    if (component === 'Main') {
      currentRouter['component'] = Main
    } else if (component === 'ParentView') {
      currentRouter['component'] = ParentView
    } else {
      currentRouter['component'] = loadView(component)
    }
    if (icon) {
      currentRouter['meta']['icon'] = icon
    }
    if (title) {
      currentRouter['meta']['title'] = title
    }
    if (singlePage) {
      currentRouter['meta']['singlePage'] = singlePage
    }
    if (notCache) {
      currentRouter['meta']['notCache'] = notCache
    } else {
      currentRouter['meta']['notCache'] = false
    }
    if (hide) {
      currentRouter['meta']['hide'] = hide
    }
    if (children && children instanceof Array && children.length > 0) {
      currentRouter['children'] = filterAsyncRoutes(children)
    }
    return currentRouter
  })
}


const loadView = (component) => {
  return (resolve) => require([`@/views${component}`], resolve)
}


/**
 * @param {Array} routers 路由列表数组
 * @param homeName 首页路由
 * @description 用于找到路由列表中name为home的对象
 */
const getHomeRoute = (routers, homeName = 'home') => {
  let i = -1
  let len = routers.length
  let homeRoute = {}
  while (++i < len) {
    let item = routers[i]
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children, homeName)
      if (res.name) return res
    } else {
      if (item.name === homeName) homeRoute = item
    }
  }
  return homeRoute
}


/**
 * 获取面包屑列表
 * @param {Array} route 当前路由metched
 * @param {Array} homeRoute 首页路由
 * @returns {Array}
 */
const getBreadCrumbList = (route, homeRoute) => {
  let homeItem = { ...homeRoute, icon: homeRoute.meta.icon }
  let routeMetched = route.matched
  if (routeMetched.some(item => item.name === homeRoute.name)) return [homeItem]
  let res = routeMetched.filter(item => {
    return item.meta === undefined || !item.meta.hide
  }).map(item => {
    let meta = { ...item.meta }
    if (meta.title && typeof meta.title === 'function') {
      meta.__titleIsFunction__ = true
      meta.title = meta.title(route)
    }
    let obj = {
      icon: (item.meta && item.meta.icon) || '',
      name: item.name,
      meta: meta
    }
    return obj
  })
  res = res.filter(item => {
    return !item.meta.hide
  })
  return [{ ...homeItem, to: homeRoute.path }, ...res]
}


const state = {
  // 所有有权限的路由
  routes: [],
  // 异步路由
  addRoutes: [],
  // 面包屑
  breadCrumbList: [],
  // home主页的路由
  homeRoute: {}
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_BREAD_CRUMB: (state, route) => {
    state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
  },
  SET_HOME_ROUTE: (state, routes) => {
    state.homeRoute = getHomeRoute(routes, indexPage)
  },
}

const actions = {
  generateRoutes({ commit }, routeData) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(routeData)
      const route404 = {
        name: '404错误页',
        path: '*',
        redirect: '/404',
        meta: {
          hide: true
        }
      }
      accessedRoutes.push(route404);
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
