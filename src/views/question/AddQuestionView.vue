<template>
  <div id="addQuestionView">
    <h2 style="margin-bottom: 40px">{{ title }}题目</h2>
    <div id="form">
      <a-form :model="form" label-align="left" class="form-box">
        <a-form-item field="title" label="标题" class="small-box">
          <a-input v-model="form.title" placeholder="请输入标题" />
        </a-form-item>
        <a-form-item field="tags" label="标签" class="small-box">
          <a-input-tag v-model="form.tags" placeholder="请选择标签" allow-clear />
        </a-form-item>
        <a-form-item filed="content" label="题目内容" style="text-align: left">
          <MdEditor :value="form.content" :handle-change="onContentChange" />
        </a-form-item>
        <a-form-item label="测试用例配置" :content-flex="false" :merge-props="false" class="middle-box">
          <div style="float: left; margin-bottom: 10px">
            <a-button @click="handleAdd" type="outline" status="success"> 新增用例 </a-button>
          </div>
          <a-form-item v-for="(judgeCaseItem, index) of form.judgeCase" :key="index" no-style>
            <a-space direction="vertical" style="min-width: 640px">
              <a-form-item :field="`form.judgeCase[${index}].input`" :label="`输入用例-${index + 1}`" :key="index">
                <a-input v-model="judgeCaseItem.input" placeholder="样例输入" />
              </a-form-item>
              <a-form-item :field="`form.judgeCase[${index}].output`" :label="`输出用例-${index + 1}`" :key="index">
                <a-input v-model="judgeCaseItem.output" placeholder="样例输出" />
                <a-button status="danger" @click="handleDelete(index)" style="margin-left: 15px"> 删除样例 </a-button>
              </a-form-item>
            </a-space>
          </a-form-item>
        </a-form-item>
        <a-form-item label="判题配置" :content-flex="false" :merge-props="false" class="number-box">
          <a-space direction="vertical" style="min-width: 480px">
            <a-form-item filed="judgeConfig.timeLimit" label="时间限制" class="number-form">
              <a-input-number v-model="form.judgeConfig.timeLimit" placeholder="请输入时间限制" mode="button" :min="500" size="large" />
            </a-form-item>
            <a-form-item filed="judgeConfig.stackLimit" label="内存限制" class="number-form">
              <a-input-number v-model="form.judgeConfig.memoryLimit" placeholder="请输入内存限制" mode="button" :min="10" size="large" />
            </a-form-item>
          </a-space>
        </a-form-item>
        <div style="margin-top: 16px" />
        <a-form-item style="margin: 0 auto" class="submit-btn">
          <a-button type="primary" style="min-width: 300px; min-height: 20px" @click="doSubmit"> 提交 </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MdEditor } from '@/components/index.export'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import messageAlert from '@/scripts/messageAlert'
import message from '@arco-design/web-vue/es/message'
import { useQuestionState } from '@/store/question'

let form = ref({
  title: '',
  tags: [],
  content: '',
  judgeConfig: {
    memoryLimit: 1000,
    timeLimit: 1000
  },
  judgeCase: [
    {
      input: '',
      output: ''
    }
  ]
})

/**
 * 更新和创建复用同一个页面
 * 通过标识符判断当前是更新还是创建
 */
const route = useRoute()
const updatedPage = route.path.includes('update')

let title = ''
title = updatedPage ? '修改' : '创建'

/**
 * 如果是更新题目
 * 需要读取题目原有数据
 */
/*
  const loadData = async () => {
  const id = route.query.id
  if(!id) {
    return
  }
  const res = await QuestionControllerService.getQuestionByIdUsingGet(
    id as any
  )
  if(res.code === 0) {
    form.value = res.data as any
    if(!form.value.judgeCase) {
      form.value.judgeCase = [
        {
          input: "",
          output: ""
        }
      ]
    } else {
      form.value.judgeCase = JSON.parse(form.value.judgeCase as any)
    }
    if(!form.value.judgeConfig) {
      form.value.judgeConfig = {
        memoryLimit: 1000,
        timeLimit: 1000
      }
    } else {
      form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any)
    }
    if(!form.value.tags) {
      form.value.tags = []
    } else {
      form.value.tags = JSON.parse(form.value.tags as any) 
    }
  } else {
    message.error("加载失败: " + res.message)
  }
}
*/
/* onMounted(() => {
  if (updatedPage) loadData()
}) */
/**
 * 更新文本
 * @param value
 */
const onContentChange = (value: string) => {
  form.value.content = value
}

/**
 * 删除样例
 * @param index 样例序号
 */
const handleDelete = (index: number) => {
  if (form.value.judgeCase.length === 1) {
    message.error('测试样例不能少于一个')
    return
  }
  form.value.judgeCase.splice(index, 1)
}

/**
 * 提交题目信息
 */
const doSubmit = async () => {
  /* if(updatedPage) {
    const res = await QuestionControllerService.updateQuestionUsingPost(
      form.value
    );
    messageAlert(res, '更新')
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost(
      form.value
    );
    messageAlert(res, '创建')
  } */
  const questionList = useQuestionState()
  questionList.questionList[0].context = form.value.content
  messageAlert({ code: 0 }, '创建')
}

/**
 * 新增样例
 */
const handleAdd = () => {
  form.value.judgeCase.push({
    input: '',
    output: ''
  })
}
</script>

<style scoped>
#addQuestionView {
  width: 1200px;
  margin: 0 auto;
  border-radius: 20px;
  padding: 50px;
  min-height: 800px;
  background-color: white;
}

#form {
  margin-left: 10%;
}

/**
  * form表单选项样式修改
  */
.form-box >>> .arco-form-item {
  margin-bottom: 30px;
}
.form-box >>> .arco-col-5 {
  flex: 0 0 15%;
}
.form-box >>> .arco-form-item-label {
  font-weight: 800;
  font-size: 14px;
}

/**
 * 标签标题框样式修改 
 */
.small-box {
  text-align: left;
}
.small-box >>> .arco-input-wrapper {
  width: 30%;
}
.small-box >>> .arco-input-tag {
  width: 30%;
}

/**
 *样例框样式修改 
*/
.middle-box >>> .arco-input-wrapper {
  width: 70%;
}
.middle-box >>> .arco-form-item-content-wrapper {
  width: 70%;
}

/**
 * a-input-number 样式修改
 */
.number-form >>> .arco-input-size-large {
  text-align: center;
}
.number-form >>> .arco-input-outer {
  width: 40%;
}
.number-box >>> .arco-space-vertical {
  margin-left: -375px;
}

/**
 * 提交按钮样式修改
 */
.submit-btn >>> .arco-btn-primary {
  margin-left: 180px;
}
</style>
