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
</script>

<template>
  <div class="header">
    <el-icon>
      <ArrowLeft />
    </el-icon>
    <el-icon>
      <ArrowRight />
    </el-icon>
    <el-input style="width: 200px" v-model="searchText" placeholder="搜索音乐" clearable />

    <div>
      <el-icon>
        <ArrowDown />
      </el-icon>
      <el-icon><Menu /></el-icon>
      <el-icon @click="handleResize"><Switch /></el-icon>
    </div>
  </div>
</template>
<style lang="less">
.header {
  display: flex;
  align-items: center;
  padding-top: 30px;
}
</style>
