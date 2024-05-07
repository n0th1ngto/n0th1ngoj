<template>
  <div id="manageQuestionView">
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
      :stripe="true"
      @page-change="onPageChange"
      class="question-list"
    >
      <template #difficulty="{ record }">
        <a-space>
          <div style="color: #00af9b" v-if="record.difficulty === '简单'">{{ record.difficulty }}</div>
          <div style="color: #ff2d55" v-else-if="record.difficulty === '困难'">{{ record.difficulty }}</div>
          <div style="color: #ffb800" v-else>{{ record.difficulty }}</div>
        </a-space>
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="outline" @click="doUpdate(record)">修改</a-button>
          <a-button type="outline" status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import message from '@arco-design/web-vue/es/message'
import { ref, onMounted, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useQuestionState } from '@/store/question'
import type { Ref } from 'vue'
import type { Question } from '@/type/questionType'

const tableRef = ref()

const dataList: any = ref([])
const viewList: any = ref([])
const total = ref(0)
const searchParams = ref({
  pageSize: 50,
  current: 1
})

// 带API版本
/* const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    searchParams.value
  );
  if(res.code === 0) {
    dataList.value = res.data.records
    total.value = res.data.total
  } else {
    message.error('加载失败: ' + res.meesage)
  }
} */

// 调试版本
let pageSt = computed(() => {
  return (searchParams.value.current - 1) * searchParams.value.pageSize
})
let pageEd = computed(() => {
  return searchParams.value.current * searchParams.value.pageSize
})

const loadData = () => {
  viewList.value = dataList.value.slice(pageSt.value, pageEd.value)
}

/**
 * 页面加载时请求数据
 */
onMounted(() => {
  const questionList = useQuestionState()
  dataList.value = questionList.questionList
  total.value = 1000
  loadData()
})

const columns = [
  {
    title: '题号',
    dataIndex: 'key'
  },
  {
    title: '标题',
    dataIndex: 'title'
  },
  {
    title: '题解',
    dataIndex: 'solution'
  },
  {
    title: '通过率',
    dataIndex: 'access'
  },
  {
    title: '难度',
    slotName: 'difficulty'
  },
  {
    title: '操作',
    slotName: 'optional'
  }
]

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page
  }
  loadData()
}

// API版本
/* const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if(res.code === 0) {
    message.success('删除失败')
    loadData()
  } else {
    message.error('删除成功')
  }
} */

// 调试版本
const doDelete = (question: Record<string, any>) => {
  dataList.value.splice(question.id - 1, 1)
  loadData()
}

const router = useRouter()

const doUpdate = (question: Record<string, any>) => {
  router.push({
    path: '/question/update',
    query: {
      id: question.id
    }
  })
}
</script>

<style scoped>
#manageQuestionView {
  max-width: 1200px;
  margin: 0 auto;
}
.question-list >>> .arco-table-cell {
  margin-left: 50px;
}
</style>
