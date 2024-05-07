import message from '@arco-design/web-vue/es/message'

const messageAlert = (res: Record<string, any>, str: string) => {
  if (res.code === 0) {
    message.success(`${str}成功`)
  } else {
    message.error(`${str}失败: `, res.message)
  }
}

export default messageAlert
