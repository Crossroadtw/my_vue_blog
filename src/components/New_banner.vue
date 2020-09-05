<template>
  <div class="New_banner">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="rgba(0, 0, 0, 0.4)"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1" @click="jump('/')"><i class="el-icon-s-home"></i>首页</el-menu-item>
      <el-menu-item index="2" @click="jump('/home/blog')"><i class="el-icon-reading"></i>Blog</el-menu-item>
      <el-menu-item index="3" @click="jump('/home/about')"><i class="el-icon-s-custom"></i>关于</el-menu-item>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-s-grid"></i>小工具</template>
        <el-menu-item index="2-1">小工具1</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">小工具2</template>
          <el-menu-item index="2-4-1">小工具2-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="5"><i class="el-icon-s-comment"></i>留言板</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'New_banner',
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    jump (location) {
      localStorage.this_nav = location
      // vue-router除了提供router-link标签跳转页面以外，还提供了js跳转的方式
      this.$router.push(location)
    }
  }
}
</script>

<style scoped>

</style>
