<script setup>
import { reactive } from 'vue'
const form = reactive({
    name: '',
    password: ''
})
</script>
<template>
    <el-form>
        <el-form-item label="用户名">
            <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item >
            <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
        
    </el-form>
</template>