import router from '@/router'
import { useUserState } from '@/store/user'
import ACCESS_ENUM from './accessEnum'
import checkAccess from './checkAccess'

router.beforeEach(async (to, from, next) => {
  const userState = useUserState()
  const loginUser = userState.loginUser
  /*if (!loginUser || !loginUser.userRole) {
    await useUserState.getLoginUser()
    loginUser = userState.loginUser
  }*/

  // 判断当前路由所需要的权限
  if (to.fullPath === '/') {
    next('/question/list')
    return
  }
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN

  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 如果未登录 跳转至登陆页面 并用redirect标识登录后的目标页面
    if (!loginUser || !loginUser.userRole || loginUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
      next(`/user/login?redirect=${to.fullPath}`)
      return
    }
    // 如果已登录但无权限 则跳转到无权限提示页面
    if (!checkAccess(loginUser, needAccess)) {
      next('/noAuth')
      return
    }
  }
  next()
})
