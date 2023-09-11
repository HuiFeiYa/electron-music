<script setup>
import Versions from './components/Versions.vue'
const openWindow = () => {
  window.setTitle('标题2')
}
</script>

<template>
  <Versions></Versions>
  <button @click="openWindow">打开弹框</button>
</template>

<style lang="less">
@import './assets/css/styles.less';
</style>
