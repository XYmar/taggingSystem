import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const RolesKey = 'Admin-Roles'

export function getToken() {
  return Cookies.get(TokenKey)
}
export function getRoles() {
  return Cookies.get(RolesKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function setRoles(roles) {
  return Cookies.set(RolesKey, roles)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function rolesFlag() {
  if (Cookies.get(RolesKey) !== 'admin') {
    return true
  } else {
    return false
  }
}
