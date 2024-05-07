<template>
  <div id="questionSubmitView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="questionId" label="题号" style="min-width: 240px">
        <a-input v-model="searchParams.questionId" placeholder="请输入" />
      </a-form-item>
      <a-form-item field="language" label="编程语言" style="min-width: 240px">
        <a-select v-model="searchParams.language" :style="{ width: '320px' }" placeholder="选择编程语言">
          <a-option>java</a-option>
          <a-option>cpp</a-option>
          <a-option>go</a-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total
      }"
      @page-change="onPageChange"
    >
      <template #judgeInfo="{ record }">
        <div class="judge-info" style="background: rgb(231, 76, 60)" v-if="record.status === 'Wrong Answer'">
          {{ record.status }}
        </div>
        <div class="judge-info" style="background: rgb(250, 219, 20)" v-else-if="record.status === 'Compile Error'">
          {{ record.status }}
        </div>
        <div class="judge-info" style="background: rgb(82, 196, 26)" v-else>
          {{ record.status }}
        </div>
      </template>
      <template #question="{ record }">
        <a href="#" @click="toQuestionView(record)" class="title-btn">{{ record.questionId + '.' + questionList[record.questionId].title }}</a>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from 'vue'
import message from '@arco-design/web-vue/es/message'
import { useRouter } from 'vue-router'
import moment from 'moment'
import getQuestionStatus from '@/fakedata/QuestionStatus'
import type { QuestionStatus, Question } from '@/type/questionType'
import { useQuestionState } from '@/store/question'

const tableRef = ref()
const questionList = useQuestionState().questionList
const searchParams = ref({
  pageSize: 50,
  current: 1
})

const dataList: any = ref()

const total = ref(1000)
const loadData = async () => {
  dataList.value = getQuestionStatus(1000)
}

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData()
})

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData()
})

const columns = [
  {
    title: '提交号',
    dataIndex: 'id'
  },
  {
    title: '题目',
    slotName: 'question'
  },
  {
    title: '判题状态',
    slotName: 'judgeInfo'
  },
  {
    title: '编程语言',
    dataIndex: 'language'
  }
]

const router = useRouter()

/**
 * 跳转到做题页面
 * @param question
 */
const toQuestionView = (question: any) => {
  router.push({
    path: `/view/question/${question.questionId - 1}`
  })
}

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page
  }
  window.scrollTo(0, 0)
}
</script>

<style scoped>
#questionSubmitView {
  max-width: 1280px;
  margin: 0 auto;
}

.title-btn {
  text-decoration: none;
  color: black;
}

.title-btn:hover {
  color: #1ba3ff;
}

.judge-info {
  color: rgb(255, 255, 255);

  padding: 0 8px;
  font-weight: 400;
  border-radius: 2px;

  display: inline-flex;
  margin: 0 auto;
}
</style>
