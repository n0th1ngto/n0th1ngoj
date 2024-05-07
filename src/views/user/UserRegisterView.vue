<template>
  <MyCard title="用户注册">
    <template #context>
      <a-space direction="vertical" size="large">
        <a-input :style="{ width: '320px' }" placeholder="请输入用户名" allow-clear v-model="form.userName" class="register-input">
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
        <a-input :style="{ width: '320px' }" placeholder="输入密码" allow-clear v-model="form.password" class="register-input" />
        <a-input :style="{ width: '320px' }" placeholder="再次确认密码" allow-clear v-model="form.password" class="register-input" />
        <a-button type="primary" shape="round" class="register-btn">注册</a-button>
        <div class="register-bot">
          <router-link to="/user/login">已有帐号, 去登录</router-link>
        </div>
      </a-space>
    </template>
  </MyCard>
</template>

<script setup>
import { reactive } from 'vue'
import MyCard from '@/components/MyCard.vue'

const form = reactive({
  userName: '',
  password: '',
  pwdRepeat: ''
})

// @todo 添加注册后向后端传递数据, 以及全局store的信息记录
</script>

<style scoped>
.register-input {
  border-radius: 15px;
  height: 40px;
}

.register-btn {
  height: 40px;
  width: 40%;
  margin-top: 15px;
}

.register-bot {
  margin-bottom: 40px;
}
</style>
