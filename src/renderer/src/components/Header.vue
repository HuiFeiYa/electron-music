<script setup>
import { ref } from 'vue'
const searchText = ref('')
const resizeType = ref('normal') // 正常大小
const handleResize = () => {
    if (resizeType.value === 'normal') {
        resizeType.value = 'max'
        window.api.resize('maximize')
    } else {
        resizeType.value = 'normal'
        window.api.resize('unmaximize')
    }
}
const handleMinimize = () => {
  window.api.resize('minimize')
}
</script>

<template>
  <div class="drag"></div>
  <div class="header">
    <el-icon>
      <ArrowLeft />
    </el-icon>
    <el-icon>
      <ArrowRight />
    </el-icon>
    <el-input style="width: 200px" v-model="searchText" placeholder="搜索音乐" clearable />

    <div>
      <el-icon style="margin-right: 10px;">
        <ArrowDown />
      </el-icon>
      <el-icon style="margin-right: 10px;"><Menu /></el-icon>
      <!-- 最小话 -->
      <el-icon style="margin-right: 10px;" @click="handleMinimize"><SemiSelect /></el-icon>
      <!-- 放大 -->
      <el-icon @click="handleResize"><Switch /></el-icon>
    </div>
  </div>
</template>
<style lang="less">
.header {
  display: flex;
  align-items: center;
}
.drag {
  -webkit-app-region: drag; // 允许拖拽 导致问题，子元素点击事件被吃掉
  height: 10px;
}
</style>
