import request from '@/utils/request'

export function conflictList(listQuery, loginInfo) {
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

export function resolveConflicts(conflictId, markId, answers) {
  return request({
    url: '/conflicts/' + conflictId + '/marks/' + markId + '/resolve',
    params: {
      conflictId,
      markId,
      answer: answers
    },
    method: 'post',
    auth: {
      /* username: loginInfo.username,
      password: loginInfo.password*/
      username: 'admin',
      password: 'admin'
    }
  })
}
