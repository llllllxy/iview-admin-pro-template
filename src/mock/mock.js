
// 用户信息
let userData = [
    {
        userId: 'admin',
        username: '管理员',
        avatar: 'http://halo.lxyccc.top/f778738c-e4f8-4870-b634-56703b4acafe_1608734603765.gif',
        email: 'f123456@qq.com',
        address: '山东省 济南市 高新区',
        roles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], // 用户拥有的角色 数组
        routeData: [
            {
                path: "/permission",
                name: "permission",
                redirect: '/permission-index',
                component: 'Main',
                hide: false,
                title: "权限测试",
                icon: "ios-switch-outline",
                singlePage: true,
                children: [
                    {
                        path: "/permission-index",
                        name: "permission-index",
                        hide: false,
                        title: "权限测试",
                        component: '/permission'
                    },
                ]
            },
            {
                path: "/form",
                name: "form",
                component: 'Main',
                hide: false,
                title: "表单页面",
                icon: "md-cube",
                children: [
                    {
                        path: "/form/basic_form",
                        name: "basic-form",
                        hide: false,
                        title: "基础表单",
                        component: '/form/basic_form'
                    },
                    {
                        path: "/form/advanced_form",
                        name: "advanced_form",
                        hide: false,
                        title: "高级表单",
                        component: '/form/advanced_form'
                    },
                ]
            },
            {
                path: "/list",
                name: "list",
                component: 'Main',
                hide: false,
                title: "列表页面",
                icon: "md-grid",
                children: [
                    {
                        path: "/list/basic_list",
                        name: "basic_list",
                        hide: false,
                        title: "基础列表",
                        component: '/list/basic_list'
                    },
                    {
                        path: "/list/user_list",
                        name: "user_list",
                        hide: false,
                        title: "用户列表",
                        component: '/list/user_list'
                    },
                    {
                        path: "/list/goods_list",
                        name: "goods_list",
                        hide: false,
                        title: "商品列表",
                        component: '/list/goods_list'
                    }
                ]
            },
            {
                path: "/search",
                name: "search",
                component: 'Main',
                hide: false,
                title: "搜索页面",
                icon: "md-search",
                children: [
                    {
                        path: "/search/search_article",
                        name: "search_article",
                        hide: false,
                        title: "搜索列表（文章）",
                        component: '/search/search_article'
                    },
                    {
                        path: "/search/search_projects",
                        name: "search_projects",
                        hide: false,
                        title: "搜索列表（项目）",
                        component: '/search/search_projects'
                    }
                ]
            },
            {
                path: "/detail",
                name: "detail",
                component: 'Main',
                hide: false,
                title: "详情页面",
                icon: "md-list-box",
                children: [
                    {
                        path: "/detail/basic_detail",
                        name: "basic_detail",
                        hide: false,
                        title: "基础详情",
                        component: '/detail/basic_detail'
                    },
                    {
                        path: "/detail/advanced_detail",
                        name: "advanced_detail",
                        hide: false,
                        title: "高级详情",
                        component: '/detail/advanced_detail'
                    }
                ]
            },
            {
                path: "/result",
                name: "result",
                component: 'Main',
                hide: false,
                title: "结果页面",
                icon: "md-checkmark-circle-outline",
                children: [
                    {
                        path: "/result/result_success",
                        name: "result_success",
                        hide: false,
                        title: "成功页面",
                        component: '/result/result_success'
                    },
                    {
                        path: "/result/result_fail",
                        name: "result_fail",
                        hide: false,
                        title: "失败页面",
                        component: '/result/result_fail'
                    }
                ]
            },
            {
                path: "/setting",
                name: "setting",
                component: 'Main',
                hide: false,
                title: "设置页面",
                icon: "md-options",
                children: [
                    {
                        path: "/setting/setting_user",
                        name: "setting_user",
                        hide: false,
                        title: "个人中心",
                        component: '/setting/setting_user'
                    },
                    {
                        path: "/setting/setting_account",
                        name: "setting_account",
                        hide: false,
                        title: "个人设置",
                        component: '/setting/setting_account'
                    }
                ]
            },
            {
                path: "/editor",
                name: "editor",
                component: 'Main',
                hide: false,
                title: "编辑器",
                icon: "ios-create-outline",
                children: [
                    {
                        path: "/editor/wangEditor",
                        name: "editor_wangEditor",
                        hide: false,
                        title: "wangEditor",
                        icon: 'ios-create-outline',
                        component: '/editor/wangEditor'
                    }
                ]
            },
            {
                path: "/city",
                name: "city",
                component: 'Main',
                hide: false,
                title: "高级组件",
                icon: "ios-paper-plane-outline",
                children: [
                    {
                        path: "/city/city",
                        name: "city_city",
                        hide: false,
                        title: "城市选择",
                        icon: 'ios-create-outline',
                        component: '/city/city'
                    },
                    {
                        path: "/qrcode/qrcode_demo",
                        name: "qrcode_demo",
                        hide: false,
                        title: "二维码生成",
                        icon: 'ios-create-outline',
                        component: '/qrcode/qrcode_demo'
                    },
                    {
                        path: "/menu/three",
                        name: "three_menu",
                        hide: false,
                        title: "三级菜单",
                        component: 'ParentView',
                        children: [
                            {
                                path: "three_menu1",
                                name: "three_menu1",
                                hide: false,
                                title: "三级菜单-1",
                                component: '/city/city'
                            },
                            {
                                path: "three_menu2",
                                name: "three_menu2",
                                hide: false,
                                title: "三级菜单-2",
                                component: '/city/city'
                            },
                        ]
                    }
                ]
            }
        ]
    },
    {
        userId: 'admin1',
        username: 'admin1',
        roles: [1, 2, 3, 4, 5,] // 用户拥有的角色 数组
    }
]


// 登录
export const login = (params) => {
    const paramsObj = JSON.parse(params.body);
    let backData = {}
    if (paramsObj.username === 'admin') {
        backData = {
            token: 'oiik292983kkslqlo9922'
        }
        if (paramsObj.password == "123456") {
            return {code: 0, data: backData, msg: '登录成功，欢迎回来！'}
        } else {
            return {code: 500, msg: '账号或密码错误！'}
        }
    } else if (paramsObj.username === 'admin1') {
        backData = {
            token: '2312312312312312312'
        }
        if (paramsObj.password == "123456") {
            return {code: 0, data: backData, msg: '登录成功，欢迎回来！'}
        } else {
            return {code: 500, msg: '账号或密码错误！'}
        }
    } else {
        return {code: 500, msg: '账号或密码错误！'}
    }
}

// 退出登录
export const logout = () => {
    return {code: 0, data: null, msg: '退出登录成功！'}
}

// 退出登录
export const getInfo = () => {
    let backData = {}
    backData.userInfo = userData[0]
    return {code: 0, data: backData, msg: '获取信息成功！'}
}

//数据占位符使用
/*
{
    "integer": "@integer(10, 30)",  //随机生成一个10～30之间的正整数
    "float": "@float(60, 100, 2, 2)",  //随机生成浮点数，参数分别为整数部分最小值和最大值、小数部分保留最小位数和最大位数
    "boolean": "@boolean",       //随机生成boolean
    "string|1-2": "@string",     //随机生成字符串
    "name":"@cname",             //随机生成名字

    "date": "@date(yyyy-MM-dd)", //按照格式随机生成时间
    "datetime": "@datetime",     //随机生成时间
    "now": "@now",               //当前时间

    "id": "@id",                 //随机生成一个 18 位身份证
    "guid": "@guid",             //随机生成一个 GUID
    "url": "@url",               //随机生成url字符串
    "email": "@email",           //随机生成邮箱
    "image": "@image(200x200)",  //随机生成一个大小为200x200的图片链接
    "title": "@title",           //随机生成一句标题，其中每个单词的首字母大写
    "upper": "@upper(@title)",   //把生随机成的标题全部转为大写
    "cparagraph": "@cparagraph", //随机生成一段中文文本
    "csentence": "@csentence",   //随机生成一段中文文本
    "range": "@range(2, 10)" ,   //返回一个内容从2开始到9的整型数组

    "region": "@region",         //随机生成地区 华中
    "province": "@province",     //随机生成省会 省
    "city": "@city",             //随机生成城市 市
    "county": "@county",         //随机生成一个（中国）县
}*/
