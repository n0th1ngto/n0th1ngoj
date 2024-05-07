<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader></GlobalHeader>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer class="footer">n0th1ng's OJ</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#basicLayout .header {
  background: rgb(255, 252, 252);
  height: 35px;
  margin-bottom: 20px;
}

#basicLayout .content {
  background: linear-gradient(to right, #eee, #fff);
  margin-bottom: 16px;
  padding-top: 15px;
}

#basicLayout .footer {
  background: #080808;
  padding: 16px;
  color: white;
}
</style>

<script setup>
import { GlobalHeader } from '@/components/index.export'
</script>
