import request from '@/utils/request'

export function countList() {
  return request({
    url: 'documents/counts',
    method: 'get',
    auth: {
      username: 'admin',
      password: 'admin'
    }
  })
}
export function conflictList() {
  return request({
    url: '/conflicts',
    params: {
      userId: ''
    },
    method: 'get',
    auth: {
      /* username: loginInfo.username,
      password: loginInfo.password*/
      username: 'admin',
      password: 'admin'
    }
  })
}

