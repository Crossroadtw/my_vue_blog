<template>
  <div class="header-box">
    <div class="header">
      <div class="content">
        <div class="logo full-left">
          <!--          <router-link to="/"><img @click="jump('/')" src="../assets/image/1.jpg" alt=""></router-link>-->
        </div>
        <ul class="nav full-left">
          <li><el-link @click="jump('/')" :underline="false"><i class="el-icon-s-home"></i>首页</el-link></li>
          <li><el-link @click="jump('/home/about')" :underline="false"><i class="el-icon-s-custom"></i>关于</el-link></li>
          <li><el-link @click="jump('/home/blog')" :underline="false"><i class="el-icon-reading"></i>Blog</el-link></li>
          <li><el-link @click="jump('')" :underline="false"><i class="el-icon-s-grid"></i>小工具</el-link></li>
          <li><el-link @click="jump('')" :underline="false"><i class="el-icon-s-comment"></i>留言板</el-link></li>
        </ul>
<!--        <div class="login-bar full-right">-->
<!--          <div class="login-box full-left">-->
<!--            <span>登录</span>-->
<!--            &nbsp;|&nbsp;-->
<!--            <span>注册</span>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      this_nav: ''
    }
  },
  created () {
    this.this_nav = localStorage.this_nav
  },
  methods: {
    jump (location) {
      localStorage.this_nav = location
      // vue-router除了提供router-link标签跳转页面以外，还提供了js跳转的方式
      this.$router.push(location)
    }
  }
}
</script>

<style scoped>
  .el-link.el-link--default {
    color: #0c0c0c;
    font-size: 17px;
  }
  .header-box {
    height: 80px;
    position: relative;
  }

  .header {
    /*width: 100%;*/
    height: 90px;
    box-shadow: 0 0.5px 0.5px 0 #c9c9c9;
    position: fixed;
    top: 0;
    left: 0.5em;
    right: 0.5em;
    margin: auto;
    z-index: 99;
    /*background: #fff;*/
    background-color: rgba(0, 0, 0, 0.4)
  }

  .header .content {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
  }

  .header .content .logo {
    height: 80px;
    line-height: 80px;
    margin-right: 50px;
    cursor: pointer;
  }

  .header .content .logo img {
    vertical-align: middle;
  }

  .header .nav li {
    float: left;
    height: 80px;
    line-height: 80px;
    margin-right: 30px;
    font-size: 16px;
    color: #4a4a4a;
    cursor: pointer;
    list-style:none;
  }

  .header .nav li span {
    padding-bottom: 16px;
    padding-left: 5px;
    padding-right: 5px;
  }

  .header .nav li span a {
    display: inline-block;
  }

  .header .nav li .this {
    color: #4a4a4a;
    border-bottom: 4px solid #ffc210;
  }

  .header .nav li:hover span {
    color: #000;
  }

  .header .login-bar {
    height: 80px;
  }

  .header .login-bar .shop-cart {
    margin-right: 20px;
    border-radius: 17px;
    background: #f7f7f7;
    cursor: pointer;
    font-size: 14px;
    height: 28px;
    width: 88px;
    margin-top: 30px;
    line-height: 32px;
    text-align: center;
  }

  .header .login-bar .login-box {
    margin-top: 33px;
  }

  .header .login-bar .login-box span {
    color: #4a4a4a;
    cursor: pointer;
  }

  .header .login-bar .login-box span:hover {
    color: #000000;
  }

  .full-left {
    float: left !important;
  }

  .full-right {
    float: right !important;
  }

  .el-carousel__arrow {
    width: 120px;
    height: 120px;
  }

  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background: #ffc210;
    border-color: #ffc210;
    border: none;
  }

  .el-checkbox__inner:hover {
    border-color: #9b9b9b;
  }

  .el-checkbox__inner {
    width: 16px;
    height: 16px;
    border: 1px solid #9b9b9b;
    border-radius: 0;
  }

  .el-checkbox__inner::after {
    height: 9px;
    width: 5px;
  }
</style>
