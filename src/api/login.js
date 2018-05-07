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

export function getInfo(username, password) {
  return request({
    url: '/users/login',
    method: 'get',
    auth: {
      username,
      password
    }
    /* params: { token }*/
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
