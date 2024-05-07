<template>
  <div id="GlobalHeader">
    <a-row class="grid-demo" :wrap="false">
      <a-col :span="12">
        <div class="menu">
          <a-menu mode="horizontal" :selected-keys="selectedKeys" @menu-item-click="doMenuClick" :style="{ height: '100%', padding: 0 }">
            <a-menu-item key="0" disabled>
              <div class="title-bar">
                <img class="logo" src="../assets/EMOJI-81.svg" />
              </div>
            </a-menu-item>
            <a-menu-item class="nav-title" v-for="item in visibleRoutes" :key="item.path">
              {{ item.name }}
            </a-menu-item>
          </a-menu>
        </div>
      </a-col>
      <a-col :span="4"></a-col>
      <a-col :span="8" :style="{ paddingTop: '10px' }">
        <div>
          <img class="avatar" :src="userAvatar" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import routes from '@/router/routes'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useUserState } from '@/store/user'
import checkAccess from '@/access/checkAccess'
import InitAvatar from '@/assets/avatar.jpeg'

const router = useRouter()
const userState = useUserState()

const visibleRoutes = computed(() => {
  return routes.filter((item) => {
    if (item.meta?.hideInMenu) {
      return false
    }
    // 通过鉴权函数查看当前登录用户是否可以访问该页面, 无权限的页面不在导航栏显示
    if (!checkAccess(userState.loginUser, item?.meta?.access as string)) {
      return false
    }
    return true
  })
})

const selectedKeys = ref(['/questions'])

router.afterEach((to) => {
  selectedKeys.value = [to.path]
})

const doMenuClick = (key: string) => {
  router.push({
    path: key
  })
}
const userAvatar = ref()
userAvatar.value = userState.userAvatar ?? InitAvatar
console.log(userAvatar)
</script>

<style scoped>
.grid-demo .arco-col {
  height: 100%;
  max-height: 70px;
  line-height: 50px;
  margin: 0 10;
  color: rgb(3, 3, 3);
  text-align: center;
}

#GlobalHeader >>> .arco-row {
  margin: 0 auto;
  min-width: 1000px;
  max-width: 1700px;
}

.menu {
  box-sizing: border-box;
  width: 100%;
  padding: 5px;
  overflow: hidden;
}

.menu >>> .arco-menu-inner {
  height: 100%;
  padding-top: 5px;
}

.nav-title {
  margin-right: 0;
  padding: 0;
  font-size: 15px;
}
.logo {
  height: 25px;
  vertical-align: middle;
}

.avatar {
  height: 35px;
  margin-bottom: 20px;
  border-radius: 50%;
  vertical-align: middle;
}
</style>
