import request from '@/utils/request'

export function documentList(listQuery, loginInfo) {
  return request({
    url: 'documents/mark',
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
export function documentDetail(id, loginInfo) {
  return request({
    url: '/documents/' + id,
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

export function markdocument(id, data, loginInfo) {
  return request({
    url: '/documents/' + id + '/mark',
    params: {
      documentId: id,
      questions: data.question,
      answers: data.answer,
      markTypeId: data.markType
    },
    method: 'post',
    auth: {
      username: loginInfo.username,
      password: loginInfo.password
    }
  })
}
export function updateMark(id, data, loginInfo) {
  return request({
    url: '/marks/' + id,
    params: {
      MarkId: id,
      question: data.question,
      answer: data.answer
    },
    method: 'put',
    auth: {
      username: loginInfo.username,
      password: loginInfo.password
    }
  })
}
export function deleteMark(documentId, markId, loginInfo) {
  return request({
    url: '/documents/' + documentId + '/mark/' + markId,
    params: {
      documentId: documentId,
      markId: markId
    },
    method: 'delete',
    auth: {
      username: loginInfo.username,
      password: loginInfo.password
    }
  })
}

export function commitdocument(id, loginInfo) {
  return request({
    url: '/documents/' + id + '/mark/release',
    params: {
      documentId: id
    },
    method: 'put',
    auth: {
      username: loginInfo.username,
      password: loginInfo.password
    }
  })
}

export function docDistribution(data, loginInfo) {
  return request({
    url: '/documents/distribution/mark/',
    method: 'post',
    auth: {
      username: loginInfo.username,
      password: loginInfo.password
    },
    data
  })
}

