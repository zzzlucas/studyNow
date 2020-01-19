import { httpAction, postAction, getAction } from '@/api/manage'

export function login (data) {
  return postAction('/sys/login', data)
}

export function logout (logoutToken) {
  return httpAction('post', '/sys/logout', null, null, {
    'Content-Type': 'application/json;charset=UTF-8',
    'X-Access-Token': logoutToken
  })
}

export function currentPark () {
  return getAction('/park.customer/baseCustomer/userPark')
}
