import getCommentList from '@/fakedata/CommentList'
import { UserComment } from '@/type/commentType'
import { defineStore } from 'pinia'

export const useCommentState = defineStore('commentState', () => {
  const comment: Array<UserComment> = getCommentList(1000)
  return { comment }
})
