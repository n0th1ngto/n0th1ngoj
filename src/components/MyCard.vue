<template>
  <div class="my-box">
    <header class="box-header">
      <div
        :style="{
          height: '50px',
          overflow: 'hidden'
        }"
      >
        <img :style="{ width: '20%' }" src="@/assets/EMOJI-81.svg" />
      </div>
    </header>
    <hr class="hr-solid" />
    <h2 class="title">{{ props.title }}</h2>
    <body class="box-body">
      <slot name="context"></slot>
    </body>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  title: String
})
</script>

<style scoped>
.my-box {
  max-width: 384px;
  position: relative;
  z-index: 0;
  border: 1px solid rgba(255, 255, 255, 1);
  border-radius: 21px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 0px 10px 22px rgba(0, 0, 0, 0.16);
  margin: 0 auto;
  background: white;

  min-height: 400px;

  margin-top: 50px;
}

.hr-solid {
  border: 0;
  border-top: 1px solid #bdbdc7;
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 10px;
}

.box-body {
  margin-top: 30px;
}

.title {
  margin-top: 20px;
}
</style>
