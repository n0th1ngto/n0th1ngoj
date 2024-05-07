import { fakerZH_CN as faker } from '@faker-js/faker'
import type { QuestionStatus } from '@/type/questionType'

type fn = (arg: number) => Array<QuestionStatus>

const getQuestionStatus: fn = (len: number) => {
  return Array.from({ length: len }, (_, index) => {
    return {
      id: index + 1,
      language: faker.helpers.arrayElement(['cpp', 'go', 'java']),
      status: faker.helpers.arrayElement(['Accepted', 'Wrong Answer', 'Compile Error']),
      questionId: faker.number.int({ min: 0, max: 999 })
    }
  })
}

export default getQuestionStatus
