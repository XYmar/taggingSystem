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
