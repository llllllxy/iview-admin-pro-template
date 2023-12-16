import request from './request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'post'
  })
}

export function editPwd(data) {
  return request({
    url: '/api/account/password/modify',
    method: 'post',
    data
  })
}
