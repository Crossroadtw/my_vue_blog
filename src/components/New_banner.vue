<template>
  <div class="New_banner">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="rgba(0, 0, 0, 0.5)"
      text-color="#fff"
      v-if="dispa"
      active-text-color="#ffd04b">
      <el-menu-item index="1" @click="jump('/')"><i class="el-icon-s-home"></i>首页</el-menu-item>
      <el-menu-item index="2" @click="jump('/home/blog')"><i class="el-icon-reading"></i>文章</el-menu-item>
      <el-menu-item index="3" @click="jump('/home/about')"><i class="el-icon-s-custom"></i>关于</el-menu-item>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-s-grid"></i>小工具</template>
        <el-menu-item index="2-1" @click="jump('/chat')"><i class="el-icon-s-comment"></i>简易聊天室</el-menu-item>
        <el-menu-item index="2-2" @click="jump('/language')"><i class="el-icon-connection"></i>无情翻译</el-menu-item>
        <el-menu-item index="2-3" @click="jump('/code')"><i class="el-icon-tickets"></i>在线运行(PY)</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">小工具2</template>
          <el-menu-item index="2-4-1">小工具2-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="5" @click="jump('/message')"><i class="el-icon-s-comment"></i>留言板</el-menu-item>
      <el-popover
        width="auto"
        v-if="flag_login"
        style="float: right;margin-top: 1%"
        trigger="click">
        <el-input v-model="formInline.username" placeholder="用户名"></el-input>
        <el-input v-model="formInline.userword" placeholder="密码"></el-input>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button slot="reference">站长登录</el-button>
      </el-popover>
      <el-button type="primary" @click="logout()" style="float: right;margin-top: 1%" v-if="flag_login===false">退出登录</el-button>
    </el-menu>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      menu-trigger="click"
      @select="handleSelect"
      background-color="rgba(0, 0, 0, 0.5)"
      text-color="#fff"
      v-if="undispa"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-s-grid"></i>菜单</template>
        <el-menu-item index="1-1" @click="jump('/')"><i class="el-icon-s-home"></i>首页</el-menu-item>
        <el-menu-item index="1-2" @click="jump('/home/blog')"><i class="el-icon-reading"></i>文章</el-menu-item>
        <el-menu-item index="1-3" @click="jump('/home/about')"><i class="el-icon-s-custom"></i>关于</el-menu-item>
        <el-menu-item index="1-4" @click="jump('/message')"><i class="el-icon-s-comment"></i>留言板</el-menu-item>
        <el-submenu index="1-5">
          <template slot="title"><i class="el-icon-s-grid"></i>小工具</template>
          <el-menu-item index="1-5-1" @click="jump('/chat')"><i class="el-icon-s-comment"></i>简易聊天室</el-menu-item>
          <el-menu-item index="1-5-2" @click="jump('/language')"><i class="el-icon-connection"></i>无情翻译</el-menu-item>
          <el-menu-item index="1-5-3" @click="jump('/code')"><i class="el-icon-tickets"></i>在线运行(PY)</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-popover
        width="auto"
        style="float: right;margin-top: 3%"
        v-if="flag_login"
        trigger="click">
        <el-input v-model="formInline.username" placeholder="用户名"></el-input>
        <el-input v-model="formInline.userword" placeholder="密码"></el-input>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button slot="reference">站长登录</el-button>
      </el-popover>
      <el-button type="primary" @click="logout()" style="float: right;margin-top: 3%" v-if="flag_login===false">退出登录</el-button>
    </el-menu>
  </div>
</template>

<script>
import { Message } from 'element-ui'
// import store from '@/store'

export default {
  name: 'New_banner',
  data () {
    return {
      dispa: true,
      undispa: false,
      // flag_login: this.$root.login_flag,
      flag_login: true,
      windowsss: document.body.clientWidth,
      activeIndex: '1',
      activeIndex2: '1',
      formInline: {
        username: '',
        userword: ''
      }
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      // console.log(key, keyPath)
    },
    onSubmit () {
      const $this = this
      var formData = new FormData()
      formData.append('username', this.formInline.username)
      formData.append('password', this.formInline.userword)
      this.$http({
        method: 'post',
        url: this.$serverurl.login,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData
      }).then(res => {
        if (res.data === 'error') {
          Message.warning('请求失败：error')
        } else {
          this.formInline.username = ''
          this.formInline.userword = ''
          $this.$store.commit('set_token', res.data.token)
          $this.$root.login_flag = false
          this.flag_login = false
          Message.success('登录成功')
        }
      }).catch(error => {
        Message.error('请求失败：' + error)
      })
    },
    logout () {
      this.$store.commit('del_token')
      this.$root.login_flag = true
      this.flag_login = true
    },
    jump (location) {
      localStorage.this_nav = location
      // vue-router除了提供router-link标签跳转页面以外，还提供了js跳转的方式
      this.$router.push(location)
    }
  },
  mounted: function () {
    this.dispa = document.body.clientWidth >= 650
    this.undispa = document.body.clientWidth < 650
    // const that = this
    // window.onresize = () => {
    //   return (() => {
    //     window.screenWidth = document.body.clientWidth
    //     that.windowsss = window.screenWidth
    //   })()
    // }
  }
  // watch: {
  //   windowsss (val) {
  //     this.dispa = val >= 650
  //     this.undispa = val < 650
  //   }
  // }
}
</script>

<style scoped>
.New_banner {
  width: auto;
  height: auto;
}
</style>
