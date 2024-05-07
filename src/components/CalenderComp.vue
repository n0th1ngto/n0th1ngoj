<template>
  <div>
    <VCalendar :attributes="attributes" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCalenderState } from '@/store/calender'

const attrs = useCalenderState().attrs
const attributes = ref(attrs)
</script>

<style></style>
