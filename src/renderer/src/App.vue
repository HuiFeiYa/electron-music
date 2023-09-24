<script setup>
const handleCreateProject = () => {
       window.api.openWindow('createProject')
}
</script>

<template>
       <router-link to="/">Go to Home</router-link>
       <router-link to="/about">Go to About</router-link>
                                          <button @click="handleCreateProject">创建项目</button>
       <router-view></router-view>
</template>

<style lang="less">
</style>
