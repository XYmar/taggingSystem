import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/users/login',
    method: 'get',
    auth: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/users/login',
    method: 'get'
    /* params: { token }*/
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
