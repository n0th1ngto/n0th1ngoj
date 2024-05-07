<template>
  <div id="container">
    <a-form :model="form" layout="inline">
      <a-form-item field="language" style="min-width: 240px; margin-left: -10px">
        <a-select v-model="language" :style="{ width: '160px' }" placeholder="选择编程语言" :bordered="false">
          <a-option>java</a-option>
          <a-option>cpp</a-option>
          <a-option>go</a-option>
        </a-select>
      </a-form-item>
    </a-form>
    <CodeEditor :value="code" :language="language" :handle-change="changeCode" />
    <a-divider size="0" />
    <a-button type="primary" style="min-width: 200px" @click="doSubmit"> 提交代码 </a-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CodeEditor } from '@/components/index.export'
import axios from 'axios'
import message from '@arco-design/web-vue/es/message'
import { useRouter } from 'vue-router'

const language = ref('')
const code = ref<string>('')

const changeCode = (value: string) => {
  code.value = value
}

const router = useRouter()

const doSubmit = () => {
  /* try {
    const response = await axios.post('submit-task', code.value)
    const result = response.data
  } catch (error) {
    console.log('error: ', error)
  } */
  message.success('提交成功')
  router.push({
    path: `/question/list`
  })
}
</script>

<style scoped></style>
