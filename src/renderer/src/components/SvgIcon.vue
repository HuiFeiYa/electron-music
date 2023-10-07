<template>
  <svg class="svg-icon" aria-hidden="true">
      <use :href="`#${name}`" />
  </svg>
</template>

<script setup>
  defineProps({
      name: {
          type: String,
          required: true
      }
  })
</script>

<style lang="less" scoped>
  .svg-icon {
      width: 1em;
      height: 1em;
      fill: currentColor;
      overflow: hidden;
  }
</style>
