<template>
  <MyCard title="用户登录">
    <template #context>
      <a-space direction="vertical" size="large">
        <a-input :style="{ width: '320px' }" placeholder="请输入用户名" allow-clear v-model="form.userName" class="login-input">
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
        <a-input :style="{ width: '320px' }" placeholder="输入密码" allow-clear v-model="form.password" class="login-input" />
        <a-button type="primary" shape="round" class="login-btn">登录</a-button>
        <router-link to="/user/register">注册账号</router-link>
      </a-space>
    </template>
  </MyCard>
</template>

<script setup>
import { reactive } from 'vue'
import MyCard from '@/components/MyCard.vue'

const form = reactive({
  userName: '',
  password: ''
})

// @todo 添加登录后提交信息
</script>

<style scoped>
.login-input {
  border-radius: 15px;
  height: 40px;
}

.login-btn {
  height: 40px;
  width: 40%;
  margin-top: 15px;
  background: #242528;
}
</style>
