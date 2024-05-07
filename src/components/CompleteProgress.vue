<template>
  <div id="complete-progress">
    <h3>题目完成进度</h3>
    <div class="complete-body">
      <div class="progress">
        <a-progress type="circle" status="warning" :percent="percent" />
      </div>
      <div class="number">
        <div class="easy">
          <div style="color: #00af9b">简单</div>
          <div class="body">
            <div>{{ questionComplete.easy }}</div>
            <a-divider />
            <div>{{ totalQuestion.easy }}</div>
          </div>
        </div>
        <div class="medium">
          <div style="color: #ffb800">中等</div>
          <div class="body">
            <div>{{ questionComplete.medium }}</div>
            <a-divider />
            <div>{{ totalQuestion.medium }}</div>
          </div>
        </div>
        <div class="hard">
          <div style="color: #ff2d55">困难</div>
          <div class="body">
            <div>{{ questionComplete.hard }}</div>
            <a-divider />
            <div>{{ totalQuestion.hard }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserState } from '@/store/user'
import { useQuestionState } from '@/store/question'
import { computed } from 'vue'

const questionComplete = useUserState().loginUser.questionComplete
const totalQuestion = useQuestionState().qCount

const percent = computed(() => {
  return questionComplete.total / totalQuestion.total
})
</script>

<style scoped>
#complete-progress {
  border: 1px solid #cbd5e1;
  background-color: white;
  border-radius: 5%;
  margin: 0 auto;
  width: 250px;
}

.complete-body {
  display: flex;
  margin-top: 40px;
}
.progress {
  flex: 20%;
  margin-right: 10px;
  margin-left: 10px;
}
.number {
  flex: 60%;
  display: flex;
}
.easy {
  flex: 1;
  height: 130px;
}
.medium {
  flex: 1;
}
.hard {
  flex: 1;
}

.body {
  margin-top: 5px;
}

.number >>> .arco-divider-horizontal {
  margin: 5px auto;
  width: 60%;
  min-width: 60%;
  max-width: 60%;
}
</style>
