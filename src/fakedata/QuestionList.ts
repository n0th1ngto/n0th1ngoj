import { fakerZH_CN as faker } from '@faker-js/faker'
import type { Question } from '@/type/questionType'

type fn = (arg: number) => Array<Question>
// 生成随机题目信息
const getQuestionArray: fn = (length: number) => {
  return Array.from({ length: length }, (_, key) => {
    return {
      key: key + 1,
      title: faker.word.noun(),
      difficulty: faker.helpers.arrayElement(['简单', '中等', '困难']),
      solution: faker.number.int({ min: 10, max: 255 }),
      access: `${faker.number.float({ max: 100, fractionDigits: 1 })}%`,
      frequency: faker.number.float({ max: 1, min: 0.1 }),
      context: faker.lorem.paragraph({ min: 5, max: 20 })
    }
  })
}

export default getQuestionArray
