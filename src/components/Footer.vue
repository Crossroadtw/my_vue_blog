<template>
  <div class="footer">
    <ul :underline="false">
      <li :underline="false">关于我们</li>
      <li>联系我们</li>
      <li>商务合作</li>
      <li>帮助中心</li>
      <li>意见反馈</li>
      <li>新手指南</li>
    </ul>
    <p>Copyright © 124.70.44.128版权所有 | 京ICP无备案号</p>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
  .footer {
    width: 100%;
    min-height: 128px;
    height: auto;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.4)
  }

  .footer ul {
    margin: 0 auto 16px;
    padding-top: 38px;
    width: auto;
    height: auto;
  }

  .footer ul li {
    float: left;
    width: 112px;
    margin: 0 10px;
    text-align: center;
    font-size: 14px;
  }

  .footer ul::after {
    content: "";
    display: block;
    clear: both;
  }

  .footer p {
    text-align: center;
    font-size: 12px;
  }
</style>
