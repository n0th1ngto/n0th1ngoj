<template>
  <div id="userLayout">
    <a-layout-header class="header">
      <a-space></a-space>
    </a-layout-header>
    <a-layout-content class="content">
      <router-view></router-view>
    </a-layout-content>
    <a-layout-footer class="footer">
      <div>n0th1ng's OJ</div>
    </a-layout-footer>
  </div>
</template>

<style scoped>
#userLayout {
  text-align: center;
  background: url('https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png') 0% 0% / 100% 100%;
}

#userLayout .logo {
  width: 64px;
  height: 64px;
}

#userLayout .content {
  margin-bottom: 16px;
  padding: 20px;
  height: 100vh;
}

#userLayout .footer {
  padding: 16px;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
