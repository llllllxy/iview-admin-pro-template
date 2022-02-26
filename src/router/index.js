import Vue from 'vue'
import Router from 'vue-router'
import Main from "@/components/main/main";
import ParentView from "@/components/parent-view/parent-view";

Vue.use(Router)

/**
 meta: {
    hide: false, 是否在左侧菜单显示 不显示请设为 true
    title: "列表页面", 菜单标题
    icon: "md-grid", 图标
    roleId: 1, 菜单权限id 不填写等同于不需要权限校验
    singlePage:, true 单页 非嵌套栏目显示
    notCache: true  禁止缓存
 }
 */

// 不需要权限校验的静态路由
export const constantRoutes = [
    {
        path: "/login",
        name: "login",
        meta: {
            hide: true,
            title: "登录"
        },
        component: () => import("@/views/login/login")
    },
    {
        path: "/",
        name: "Dashboard",
        redirect: '/master_workplace',
        component: Main,
        meta: {
            hide: true,
            title: "Dashboard",
            icon: "md-speedometer",
        },
        children: [
            {
                path: "/master_workplace",
                name: "master_workplace",
                meta: {
                    hide: true,
                    title: "首页"
                },
                component: () => import("@/views/Dashboard/master_workplace")
            },
            {
                path: "/workplace",
                name: "workplace",
                meta: {
                    hide: true,
                    title: "工作台",
                    permission: ['admin']
                },
                component: () => import("@/views/Dashboard/workplace")
            },
        ]
    },
    {
        path: "/brief",
        name: "brief",
        component: Main,
        meta: {
            hide: false,
            title: "简叙",
            icon: "md-heart-outline",
            singlePage: true
        },
        children: [
            {
                path: "/brief/brief",
                name: "brief_brief",
                meta: {
                    hide: false,
                    title: "简叙",
                    icon: 'md-heart-outline'
                },
                component: () => import("@/views/brief/brief")
            }
        ]
    },
    {
        path: '/401',
        name: 'exception_401',
        meta: {
            hide: true
        },
        component: () => import("@/views/exception/401")
    }, {
        path: '/500',
        name: 'exception_500',
        meta: {
            hide: true
        },
        component: () => import("@/views/exception/500")
    }, {
        path: '/404',
        name: 'exception_404',
        meta: {
            hide: true
        },
        component: () => import("@/views/exception/404")
    }
]


const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}


// 解决跳转同一个路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router
