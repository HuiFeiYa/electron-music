<script setup>
import Win32Titlebar from './Win32Titlebar.vue';
</script>
<template>
  <div class="has-custom-titlebar">
    <Win32Titlebar />
    <div class="navigation-buttons">
        <img class='icon' src="../assets/icons/arrow-left.svg"  @click="go('back')">
        <img class='icon' src="../assets/icons/arrow-right.svg"  @click="go('forward')">
    </div>
  </div>
</template>
<style>
.icon {
    width: 24px;
    height: 24px;
}
.has-custom-titlebar {
  padding-top: 20px;
  -webkit-app-region: no-drag;
}
</style>