<template>
  <div class="footer">
    <el-divider></el-divider>
    <p style="position: relative;width: auto;height: auto;">Copyright © 124.70.44.128版权所有 | 京ICP无备案号</p>
    <p style="position: relative;width: auto;height: auto">Powered by .NET Core on Kubernetes</p>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
  .footer {
    width: auto;
    min-height: 20px;
    height: auto;
    text-align: center;
    color: #030303;
    background-color: rgba(246, 246, 246, 0);
  }
  .footer p {
    text-align: center;
    font-size: 12px;
  }
</style>
