import ACCESS_ENUM from '@/access/accessEnum'
import { defineStore } from 'pinia'
import type { UserState } from '@/type/userType'

export const useUserState = defineStore('userState', () => {
  const loginUser: UserState = {
    userName: 'n0th1ng',
    userRole: ACCESS_ENUM.ADMIN,
    userAvatar: '../assets/EMOJI-81.svg',
    questionComplete: {
      total: 20,
      easy: 10,
      medium: 5,
      hard: 5
    }
  }
  /*let getLoginUser = async function () {
    const res = await getLoginUserUsingGet()
    if (res.code === 0) {
      loginUser = res.data
    } else {
      loginUser.userRole = ACCESS_ENUM.NOT_LOGIN 
    }
  }*/

  return { loginUser }
})
