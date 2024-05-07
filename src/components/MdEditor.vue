<template>
  <div id="Editor">
    <Editor :value="value" :plugins="plugins" @change="handleChange" />
  </div>
</template>

<script lang="ts" setup>
import gfm from '@bytemd/plugin-gfm'
import { Editor, Viewer } from '@bytemd/vue-next'
import hightlight from '@bytemd/plugin-highlight'
import { ref, withDefaults, defineProps } from 'vue'

/**
 * 定义组件的属性类型
 * 把值暴露给父组件, 提交组件的通用性
 */
interface Props {
  value: string
  mode?: string
  handleChange: (v: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  value: () => '',
  mode: () => 'split',
  handleChange: (v: string) => {
    console.log(v)
  }
})

const plugins = [
  gfm(),
  hightlight()
  // Add more plugins here
]
</script>

<style scoped>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}

#Editor {
  width: 1000px;
}
</style>
