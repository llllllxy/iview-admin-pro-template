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
