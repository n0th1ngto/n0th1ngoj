import { fakerZH_CN as faker } from '@faker-js/faker'
import type { UserComment } from '@/type/commentType'

console.log(faker.image.urlLoremFlickr({ category: 'nature' }))

const getCommentList: (arg: number) => Array<UserComment> = (length: number) => {
  return Array.from({ length: length }, () => {
    return {
      title: faker.lorem.words({ max: 5, min: 1 }),
      tags: faker.helpers.arrayElements(['Java', '面经', '实习', '求职', 'C++', 'C', '校招', 'Python'], { min: 1, max: 3 }) as Array<string>,
      context: faker.lorem.paragraph({ min: 5, max: 20 }),
      imgUrl: faker.image.urlLoremFlickr({ category: 'nature' }),
      count: {
        thumbsUp: faker.number.int({ min: 0, max: 500 }),
        view: faker.number.int({ min: 0, max: 500 }),
        commit: faker.number.int({ min: 0, max: 500 }),
        star: faker.number.int({ min: 0, max: 500 })
      }
    } as UserComment
  })
}

export default getCommentList
