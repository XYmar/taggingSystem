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
      questions: data[0].question,
      answers: data[0].answer
    },
    method: 'post',
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

