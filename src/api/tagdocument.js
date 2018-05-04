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
export function documentDetail(id) {
  return request({
    url: '/documents/' + id,
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

export function markdocument(id, data) {
  return request({
    url: '/documents/' + id + '/mark',
    params: {
      documentId: id,
      questions: data.question,
      answers: data.answer
    },
    method: 'post',
    auth: {
      username: 'admin',
      password: 'admin'
    }
  })
}
export function updateMark(id, data) {
  return request({
    url: '/marks/' + id,
    params: {
      MarkId: id,
      question: data.question,
      answer: data.answer
    },
    method: 'put',
    auth: {
      username: 'admin',
      password: 'admin'
    }
  })
}
export function deleteMark(documentId, markId) {
  return request({
    url: '/documents/' + documentId + '/mark/' + markId,
    params: {
      documentId: documentId,
      markId: markId
    },
    method: 'delete',
    auth: {
      username: 'admin',
      password: 'admin'
    }
  })
}

export function commitdocument(id) {
  return request({
    url: '/documents/' + id + '/mark/release',
    params: {
      documentId: id
    },
    method: 'put',
    auth: {
      username: 'admin',
      password: 'admin'
    }
  })
}

export function docDistribution(data) {
  return request({
    url: '/documents/distribution/mark/',
    method: 'post',
    auth: {
      username: 'admin',
      password: 'admin'
    },
    data
  })
}

