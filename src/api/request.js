import axios from 'axios'
import {Message, Modal} from 'view-design';
import { token, loginPage } from '@/config/config'
import router from "@/router";
import store from "@/store";

// 创建一个axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    timeout: 30000, // 请求超时时间 默认30秒
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

// 请求拦截器
service.interceptors.request.use(config => {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    if (sessionStorage.getItem(token)) {
        config.headers[token] = sessionStorage.getItem(token)
    }
    // 如果是get请求的话，则拼接上时间戳，防止浏览器缓存
    if (config.method === 'get') {
        if (config.url.indexOf('?') === -1) {
            config.url = config.url + '?t=' + new Date().getTime()
        } else {
            config.url = config.url + '&t=' + new Date().getTime()
        }
    }
    return config
}, error => {
    console.log(error)
    return Promise.reject(error)
})

// 响应拦截器（在这里要做判断，看看登录是否超时等）
service.interceptors.response.use(response => {
        const res = response.data
        const code = res.code || 0
        const msg = res.msg || '未知错误！'

        if (code !== 0) {
            // 401、402: 未登录
            if (code === 401 || code === 402) {
                Modal.confirm({
                    title: '提示',
                    content: code === 401 ? '会话已失效，是否重新登录？' : '此账号已在其他地方登录，请重新登录！',
                    onOk: () => {
                        // 清除数据，重新回到登录页面
                        store.dispatch('user/clean').then(()=> {
                            console.log('clean success')
                            router.push({
                                name: loginPage
                            }).then()
                        })
                    },
                    onCancel: () => {

                    }
                })
                return Promise.reject('登录状态已过期，请重新登录')
            } else {
                // 除去401和402之外的其他错误信息，直接弹出后端返回的错误提示即可
                Message.error({
                    content: msg || 'Error',
                    duration: 5
                })
                return Promise.reject(new Error(msg))
            }
        } else {
            return Promise.resolve(res)
        }
    },
    error => {
        let message = error.message;
        if (message === "Network Error") {
            message = "后端接口连接异常"
        } else if (message.includes("timeout")) {
            message = "系统接口请求超时"
        } else if (message.includes("Request failed with status code")) {
            message = "系统接口" + message.substr(message.length - 3) + "异常"
        }
        Message({
            message: message,
            type: 'error',
            duration: 2 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
