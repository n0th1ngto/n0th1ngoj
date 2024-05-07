import { fakerZH_CN as faker } from '@faker-js/faker'
import { useQuestionState } from '@/store/question'

function generateMonthDates(year: number, month: number) {
  // 创建一个空数组，用于存储每天的日期对象
  const dates = []

  // 获取指定月份的第一天
  const firstDayOfMonth = new Date(year, month - 1, 1) // month 参数从 1 开始，但 Date 对象中从 0 开始计数月份

  const now = new Date(2024, 4, 10)
  const questionList = useQuestionState().questionList
  // 循环遍历从第一天到最后一天的每一天
  for (let date = new Date(firstDayOfMonth); date <= now; date.setDate(date.getDate() + 1)) {
    const finish = faker.helpers.arrayElement([false, true])
    const questionID = faker.number.int({ min: 0, max: 1000 })

    const currentData = new Date()
    currentData.setDate(date.getDate())
    dates.push({
      dates: currentData,
      dot: finish ? 'green' : 'red',
      popover: {
        label: `${questionList[questionID].key}: ${questionList[questionID].title}`,
        hideIndicator: true
      },
      customData: questionID
    })
  }

  return dates
}

export default generateMonthDates
