<template>
  <a-layout id="full-box">
    <a-layout-content class="container-box">
      <div id="left-box">
        <a-tabs class="header">
          <a-tab-pane v-for="(item, index) in leftShow" :key="index" :title="item">
            <DescQuestion></DescQuestion>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div id="right-box">
        <a-tabs class="header">
          <a-tab-pane v-for="(item, index) in rightShow" :key="index" :title="item">
            <CodeQuestion></CodeQuestion>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'
import { DescQuestion, CodeQuestion } from '@/views/question/quesionview/index.export'

const leftShow = ref(['题目描述', '测试用例', '测试结果'])
const rightShow = ref(['代码', '笔记', '题解', '提交记录'])
</script>

<style scoped>
.container-box {
  display: flex;
}

#GlobalHeader >>> .arco-row {
  margin: 0 auto;
  width: 100vw;
  text-align: left;
}

#left-box {
  width: 50vw;
  border-radius: 8px;
  border: 1px solid;
  border-color: hsl(0, 0%, 0%, 0.08);
  margin: 15px;
}

#right-box {
  width: 50vw;
  border-radius: 8px;
  border: 1px solid;
  border-color: hsl(0, 0%, 0%, 0.08);
  margin: 15px;
}

.header {
  background-color: #e7e6e605;
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
