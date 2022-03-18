import router from "@/router"

// 判断是否为空 不为空返回数据 为空返回--
export const isNotNull = (data, str) => {
    if (isBlank(str)) {
        str = "--"
    }
    if (data == null || data === 'null' || data === '' || data === undefined || data === 'undefined' || data === 'unknown') {
        return str
    } else {
        return data
    }
}

// 判断是否为空 返回true/false
export const isBlank = (data) => {
    if (data == null || data === 'null' || data === '' || data === undefined || data === 'undefined' || data === 'unknown') {
        return true
    } else {
        return false
    }
}

// 返回上一页
export const backPage = () => {
    router.go(-1)
}


export const localSave = (key, value) => {
    localStorage.setItem(key, value)
}

export const localRead = (key) => {
    return localStorage.getItem(key) || ''
}

export const localRemove = (key) => {
    return localStorage.removeItem(key)
}

export const localClear = () => {
    return localStorage.clear()
}

export const sessionSave = (key, value) => {
    sessionStorage.setItem(key, value)
}

export const sessionRead = (key) => {
    return sessionStorage.getItem(key) || ''
}

export const sessionRemove = (key) => {
    return sessionStorage.removeItem(key)
}

export const sessionClear = () => {
    return sessionStorage.clear()
}


/**
 * 深拷贝
 * @param obj
 * @param cache
 * @returns {Date|RegExp|any}
 * @参考 https://juejin.cn/post/7031322059414175774
 */
export const deepClone = (obj, cache = new WeakMap()) => {
    if (typeof obj !== 'object') return obj
    if (obj === null) return obj
    if (cache.get(obj)) return cache.get(obj) // 防止循环引用，程序进入死循环
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)

    // 找到所属原型上的constructor，所属原型上的constructor指向当前对象的构造函数
    let cloneObj = new obj.constructor()
    cache.set(obj, cloneObj) // 缓存拷贝的对象，用于处理循环引用的情况
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key], cache) // 递归拷贝
        }
    }
    return cloneObj
}


/**
 * 数组去重1
 * @param arr
 * @returns {any[]}
 */
export const dedupArr = (arr) => {
    return [...new Set(arr)]
}


/**
 * 数组去重2
 * @param arr
 * @returns {any[]}
 */
export const dedupArr2 = (arr) => {
    return Array.from(new Set(arr))
}


/**
 * 数组去重3
 * @param arr
 * @returns {any[]}
 */
export const dedupArr3 = (arr) => {
    let res = []
    arr.forEach(item => {
        if (res.indexOf(item) === -1) {
            res.push(item)
        }
    })
    return res
}


/**
 * 获取当前url参数
 * @param arr
 * @returns {any[]}
 */
export const getPresentUrlParams = () => {
    // 创建一个URLSearchParams实例
    const urlSearchParams = new URLSearchParams(window.location.search);
    // 把键值对列表转换为一个对象
    return Object.fromEntries(urlSearchParams.entries());
}


/**
 * 获取指定url参数
 * @returns {any[]}
 * @param url
 * @测试 const user = getParams('http://www.baidu.com?user=%E9%98%BF%E9%A3%9E&age=16')
 * @结果 { user: '阿飞', age: '16' }
 */
export const getUrlParams = (url) => {
    const res = {}
    if (url.includes('?')) {
        const str = url.split('?')[1]
        const arr = str.split('&')
        arr.forEach(item => {
            const key = item.split('=')[0]
            const val = item.split('=')[1]
            // 解码
            res[key] = decodeURIComponent(val)
        })
    }
    return res
}


/**
 * 防抖
 * @param fn
 * @param delay
 * @returns {function(...[*]=)}
 */
export const debounce = (fn, delay) => {
    let timer
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}


/**
 * 节流
 * @param fn
 * @param delay
 * @returns {function(...[*]=)}
 */
export const throttle = (fn, delay) => {
    let last = 0 // 上次触发时间
    return (...args) => {
        const now = Date.now()
        if (now - last > delay) {
            last = now
            fn.apply(this, args)
        }
    }
}


/**
 * 扁平数据转树结构
 * @param data
 * let arr = [
     {id: 1, name: '部门1', pid: 0},
     {id: 2, name: '部门2', pid: 1},
     {id: 3, name: '部门3', pid: 1},
     {id: 4, name: '部门4', pid: 3},
     {id: 5, name: '部门5', pid: 4}
   ]
 * @param firstPid
 * @returns [
    {
        "id": 1,
        "name": "部门1",
        "pid": 0,
        "children": [
            {  "id": 2,
               "name": "部门2",
               "pid": 1,
               "children": []
            },
            {  "id": 3,
               "name": "部门3",
               "pid": 1,
               "children": [
                    // 结果 ,,,
               ]
            }
        ]
    }
 ]
 */
export const arrayToTree = (data, firstPid) => {
    const result = [];
    getChildren(data, result, firstPid)
    return result;
}

/**
 * 递归查找，获取children
 * @param data
 * @param result
 * @param pid
 */
const getChildren = (data, result, pid) => {
    for (const item of data) {
        if (item.pid === pid) {
            const newItem = {...item, children: []};
            result.push(newItem);
            getChildren(data, newItem.children, item.id);
        }
    }
}

/**
 *  扁平数据转树结构2，一次循环性能更高
 * @returns {[]}
 * @param list
 * @param options
 */
export function arrayToTree2 (list, options = {}) {
    const {
        keyField = 'id',
        childField = 'children',
        parentField = 'pid'
    } = options
    const tree = []
    const record = {}
    for (let i = 0, len = list.length; i < len; i++) {
        const item = list[i]
        const id = item[keyField]
        if (!id) {
            continue
        }
        if (record[id]) {
            item[childField] = record[id]
        } else {
            item[childField] = record[id] = []
        }
        if (item[parentField]) {
            const parentId = item[parentField]
            if (!record[parentId]) {
                record[parentId] = []
            }
            record[parentId].push(item)
        } else {
            tree.push(item)
        }
    }
    return tree
}


/**
 * 菜单树转数组list
 * @params tree: 要转换的树结构数据
 **/
export function treeToArray(tree){
    let list = [];  // 结果lsit
    for (let i = 0, len = tree.length; i < len; i++) {
        let node = tree[i];

        if (node.children != null && node.children.length !== 0) {  //遍历树的第一层,只有一个根结点
            // 第一层加入到list中,因为根结点模块设置为虚拟结点,所以不用加入
            list.push({
                id: node.id,
                title: node.title,
                pid:node.pid
            });
            toArrayDF(node.children, list, node.id);  //遍历子树,并加入到list中.
        } else {
            list.push({
                id: node.id,
                title: node.title,
                pid: node.pid
            });
        }
    }
    return list;
}


/**
 * 深度优先遍历树
 * 一个递归方法
 * @params tree:要转换的树结构数据
 * @params list:保存结果的列表结构数据，初始传list = []
 * @params parentId:当前遍历节点的父级节点id，初始为null(因为根节点无parentId)
 **/
function toArrayDF (tree, list, pid) {
    for (let i = 0, len = tree.length; i < len; i++) { //遍历最上层
        // 将当前树放入list中
        let node = tree[i];
        list.push({
            id: node.id,
            title: node.title,
            pid: pid
        });
        // 如果有子结点,再遍历子结点
        if (node.children != null && node.children.length !== 0) {
            toArrayDF(node.children, list, node.id)  //递归
        }
    }
}

