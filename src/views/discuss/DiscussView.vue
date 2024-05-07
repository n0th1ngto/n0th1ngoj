<template>
  <div v-for="(comment, index) in viewComments" :key="index + pageSt" class="view-card">
    <DiscussCard :comment="comment"></DiscussCard>
  </div>
  <div id="page">
    <a-pagination :total="comments.length" :page-size="pageParams.pageSize" @change="pageChange" />
  </div>
</template>

<script setup lang="ts">
import { useCommentState } from '@/store/comments'
import { DiscussCard } from '@/views/discuss/index.export'
import { computed } from 'vue'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { UserComment } from '@/type/commentType'
import { onMounted } from 'vue'

const comments: Array<UserComment> = useCommentState().comment

/**
 *分页相关
 */
const pageParams = ref({
  pageSize: 50,
  current: 1
})

const pageSt = computed(() => {
  return (pageParams.value.current - 1) * pageParams.value.pageSize
})
const pageEd = computed(() => {
  return pageParams.value.current * pageParams.value.pageSize
})
const viewComments: Ref<Array<UserComment>> = ref([])

const loadList = () => {
  viewComments.value = comments.slice(pageSt.value, pageEd.value)
}

onMounted(() => {
  loadList()
})

const pageChange = (cur: number) => {
  pageParams.value = {
    ...pageParams.value,
    current: cur
  }
  loadList()
  window.scrollTo(0, 0)
}
</script>

<style scoped>
#page {
  width: 40%;
  margin: 0 auto;
  display: flex;
}
#page >>> .arco-pagination {
  margin: 0 auto;
}
</style>
