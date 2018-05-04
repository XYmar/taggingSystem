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
