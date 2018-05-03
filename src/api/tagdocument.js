import request from '@/utils/request'

export function documentList() {
  return request({
    url: 'documents/mark',
    params: {
      userId: ''
    },
    method: 'get',
    auth: {
      username: 'admin',
      password: 'admin'
    }
  })
}

export function importDocu(data) {
  return request({
    url: '/documents/import',
    method: 'post',
    auth: {
      username: 'admin',
      password: 'admin'
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
