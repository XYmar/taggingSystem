import request from '@/utils/request'

export function markType(loginInfo) {
  return request({
    url: '/marktypes',
    params: {
      userId: ''
    },
    method: 'get',
    auth: {
      username: loginInfo.username,
      password: loginInfo.password
    }
  })
}

export function addMarkType(loginInfo, name) {
  return request({
    url: '/marktypes',
    params: {
      name: name
    },
    method: 'post',
    auth: {
      username: loginInfo.username,
      password: loginInfo.password
    }
  })
}

export function delMarkType(loginInfo, typeId) {
  return request({
    url: '/marktypes/' + typeId,
    params: {
      markTypeId: typeId
    },
    method: 'delete',
    auth: {
      username: loginInfo.username,
      password: loginInfo.password
    }
  })
}
