import ACCESS_ENUM from './accessEnum'
import type { UserState } from '@/type/userType'

/**
 * 检查用户权限(判断当前登录用户是否具有访问某页面权限)
 * @param loginUser 当前登录用户
 * @param needAccess 当前页面需要的权限
 * @return boolean 有无权限
 */
const checkAccess = (loginUser: UserState, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN

  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true
  }

  if (needAccess === ACCESS_ENUM.USER) {
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false
    }
  }

  if (needAccess === ACCESS_ENUM.ADMIN) {
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false
    }
  }
  return true
}

export default checkAccess
