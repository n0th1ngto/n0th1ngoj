import { defineStore } from 'pinia'
import type { Question } from '@/type/questionType'
import { default as getQuestionList } from '@/fakedata/QuestionList'

export const useQuestionState = defineStore('questionState', () => {
  const questionList: Array<Question> = getQuestionList(1000)
  const qCount = {
    total: questionList.length,
    easy: questionList.filter((question) => question.difficulty === '简单').length,
    medium: questionList.filter((question) => question.difficulty === '中等').length,
    hard: questionList.filter((question) => question.difficulty === '困难').length
  }

  return { questionList, qCount }
})
