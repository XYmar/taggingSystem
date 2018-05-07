import request from '@/utils/request'

export function addUser(data) {
  return request({
    url: 'users',
    method: 'post',
    params: {
      isAdmin: false
    },
    auth: {
      username: 'admin',
      password: 'admin'
    },
    data
  })
}

export function modifyUser(data) {
  return request({
    url: 'users',
    method: 'post',
    params: {
      isAdmin: false
    },
    auth: {
      username: 'admin',
      password: 'admin'
    },
    data
  })
}
