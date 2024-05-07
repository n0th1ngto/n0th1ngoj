<template>
  <div id="contain-box">
    <div id="questionListView">
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
        column-resizable
        class="question-list"
      >
        <template #title="{ record }">
          <a href="#" @click="toQuestionView(record)" class="title-btn">{{ record.key + '.' + record.title }}</a>
        </template>
        <template #difficulty="{ record }">
          <a-space>
            <div style="color: #00af9b" v-if="record.difficulty === '简单'">{{ record.difficulty }}</div>
            <div style="color: #ff2d55" v-else-if="record.difficulty === '困难'">{{ record.difficulty }}</div>
            <div style="color: #ffb800" v-else>{{ record.difficulty }}</div>
          </a-space>
        </template>
        <template #frequency="{ record }">
          <a-progress :percent="record.frequency" :show-text="false" status="warning" />
        </template>
      </a-table>
    </div>
    <div id="compView">
      <div>
        <CalenderComp></CalenderComp>
      </div>
      <div style="margin-top: 20px">
        <CompleteProgress></CompleteProgress>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { useQuestionState } from '@/store/question'
import type { Question } from '@/type/questionType'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import { CalenderComp, CompleteProgress } from '@/components/index.export'

const tableRef = ref()

const dataList: Ref<Array<Question>> = ref([])
const total = ref(0)

const searchParams = ref({
  pageSize: 50,
  current: 1
})

/**
 * API版本
 */
/* 
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  if(res.code === 0) {
    dataList.value = res.data.records
    total.value = res.data.total
  } else {
    message.error('加载失败: ' + res.message)
  }
} 

onMounted(() => {
  loadData()
})
*/

onMounted(() => {
  dataList.value = useQuestionState().questionList
  total.value = 1000
})

const columns = [
  {
    title: '题目',
    slotName: 'title',
    width: 180
  },
  {
    title: '题解',
    dataIndex: 'solution',
    sortable: {
      sortDirections: ['ascend', 'descend']
    },
    width: 140
  },
  {
    title: '通过率',
    dataIndex: 'access',
    sortable: {
      sortDirections: ['ascend', 'descend']
    },
    width: 160
  },
  {
    title: '难度',
    slotName: 'difficulty',
    filterable: {
      filters: [
        {
          text: '简单',
          value: '简单'
        },
        {
          text: '中等',
          value: '中等'
        },
        {
          text: '困难',
          value: '困难'
        }
      ],
      filter: (value: string, record: Question) => record.difficulty === `${value}`
    },
    width: 100
  },
  {
    title: '出现频率',
    slotName: 'frequency',
    dataIndex: 'frequency',
    sortable: {
      sortDirections: ['ascend', 'descend']
    },
    width: 140
  }
]

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page
  }
  window.scrollTo(0, 0)
}

const router = useRouter()
/**
 * 跳转到做题页面
 */
const toQuestionView = (question: Question) => {
  router.push({
    path: `/view/question/${question.key - 1}`
  })
  return false
}
</script>

<style scoped>
#contain-box {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
}
#questionListView {
  max-width: 850px;
  margin: 0 auto;
  flex: 80%;
}
#compView {
  flex: 20%;
  position: sticky;
  top: 10px;
  height: 100vh; /* 或根据需要设置高度 */
  overflow-y: auto;
}
.question-list >>> .arco-table-cell {
  margin-left: 20px;
}

.title-btn {
  text-decoration: none;
  color: black;
}

.title-btn:hover {
  color: #1ba3ff;
}
</style>
