<template>
  <div class="main">
    <div class="left_flag">
      <el-container class="left_flag">
        <el-aside class="left_flag" style="width: 100%;">
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @select="handleSelect_2"
            router>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>问卷管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/main/wenjuanlist">
                  <i class="el-icon-menu"></i>
                  问卷设计
                </el-menu-item>
                <el-menu-item index="/main/wenjuanlist">
                  <i class="el-icon-menu"></i>
                  问卷分配
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>我的问卷</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/main/RenList">
                  <i class="el-icon-menu"></i>
                  自测问卷
                </el-menu-item>
                <el-menu-item index="/main/RenLists">
                  <i class="el-icon-menu"></i>
                  互评问卷
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="">
              <i class="el-icon-menu"></i>
              <span slot="title">问卷设计</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title"> 人才库</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">代理招聘</span>
            </el-menu-item>
            <el-menu-item index="/main/home">
              <i class="el-icon-setting"></i>
              <span slot="title">手机版主页</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-setting"></i>
              <span slot="title">企业账户</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
    <div class="mark_styl">
      <Vmarkdown style="min-height: 550px">{{ content }}</Vmarkdown>
    </div>

  </div>
</template>

<script>
import Vmarkdown from 'vue-markdown'
import 'markdown-it-vue/dist/markdown-it-vue.css'

export default {
  name: 'main',
  components: {
    Vmarkdown
  },
  data () {
    return {
      content: this.$root.blog_num
    }
  },
  methods: {
  },
  mounted: function () {
  }
}
</script>

<style scoped>
  .left_flag {
    width: 24%;
  }
  .el-container {
    position: fixed;
    left:0.5em;
    top:50%;
    margin-top:-200px;
  }
  .el-header, .el-footer {
    background-color: #409eff;
    color: #333;
    text-align: center;
    line-height: 80px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: left;
    line-height: 200px;

  }

  .el-main {
    background-color: #E9EEF3;
    position: fixed;
    color: #333;
    background-color: rgba(0, 0, 0, 0)
    /* text-align: center;
    line-height: 160px; */
  }
  .mark_styl {
    background-color: rgba(251, 252, 251, 0.8);
    margin-left:25%;
    margin-right:20px;
    position: relative;
  }

</style>
