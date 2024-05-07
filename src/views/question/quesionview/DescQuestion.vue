<template>
  <div id="container">
    <h1 class="title">{{ question.key + '.' + question.title }}</h1>
    <div style="display: flex; height: 40px">
      <div class="tag">{{ question.difficulty }}</div>
    </div>
    <div class="context">
      <MdViewer :value="question.context"></MdViewer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed } from 'vue'
import { useQuestionState } from '@/store/question'
import type { Question } from '@/type/questionType'
import { useRoute } from 'vue-router'
import { MdViewer } from '@/components/index.export'

const id = Number(useRoute().params['id'])

const question = ref<Question>(useQuestionState().questionList[id])

const tagColor = computed(() => {
  if (question.value.difficulty === '简单') return '#00af9b'
  else if (question.value.difficulty === '中等') return '#ffb800'
  else return '#ff2d55'
})
</script>

<style scoped>
#container {
  height: 100vh;
  margin: 0 10px;
  background-color: white;
  overflow-y: scroll;
}

.title {
  text-align: left;
  margin-left: 10px;
}

.tag {
  color: v-bind(tagColor);
  font-size: 12px;
  line-height: 16px;
  background-color: #0000000f;
  border-radius: 9999px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  display: inline-flex;
  align-items: center;

  margin-left: 15px;
  margin-bottom: 10px;
}

.context {
  font-size: 14px;
  font: 14px -apple-system;
  text-align: left;
  margin-left: 15px;
}
</style>
