import request from '@/utils/request'

// 申请审阅文章
export function distributionReviewDoc(data, loginInfo) {
  return request({
    url: '/documents/distribution/review/',
    method: 'post',
    auth: {
      username: loginInfo.username,
      password: loginInfo.password
    },
    data
  })
}
// 获取审阅文档
export function documentListReview(listQuery, loginInfo) {
  return request({
    url: 'documents/review',
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

// 标记冲突
export function markConflict(documentId, markId, loginInfo) {
  return request({
    url: '/documents/' + documentId + '/review/' + markId + '/conflict',
    params: {
      documentId: documentId,
      markId: markId
    },
    method: 'post',
    auth: {
      username: loginInfo.username,
      password: loginInfo.password
    }
  })
}

// 提交审阅结果
export function commitReview(id, loginInfo) {
  return request({
    url: '/documents/' + id + '/review/release',
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

