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
const handleMenu = () => {
  window.api.menuSetting()
}
const handleLogin = () => {
  window.api.login()
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

    <div class="right">
      <el-icon style="margin-right: 10px;" @click="handleLogin"><User /></el-icon>
      <el-icon style="margin-right: 10px;">
        <ArrowDown />
      </el-icon>
      <el-popover
        placement="bottom"
        title="Title"
        :width="200"
        trigger="click"
      >
        <template #reference>
          <el-icon style="margin-right: 10px;" @click="handleMenu"><Menu /></el-icon>
        </template>
        <slot  name="content">
          <div>
            <div>1</div>
            <div>2</div>
          </div>
        </slot>

      </el-popover>
      <!-- <el-menu  mode="horizontal">
        <el-sub-menu>
          <template  #title>
            <el-icon style="margin-right: 10px;" @click="handleMenu"><Menu /></el-icon>
          </template>
          <el-menu-item index="1-1">
            添加歌曲
          </el-menu-item>
          <el-menu-item index="1-2">
            升级
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu>
          <el-menu-item index="1-2">
            item two
          </el-menu-item>
        </el-sub-menu>
      </el-menu> -->
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
.right {
  display: flex;
}
</style>
