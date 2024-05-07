import { defineStore } from 'pinia'
import { default as getCalenderAttrs } from '@/fakedata/CalenderAttr'

export const useCalenderState = defineStore('calenderState', () => {
  const attrs = getCalenderAttrs(2024, 5)

  return { attrs }
})
