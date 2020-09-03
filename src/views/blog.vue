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
    <div class="wrap" style="margin-right: 30px">
      <main>
        <table>
          <h1 style="text-align:center;margin-top: 30px">名称</h1>
          <tbody>
          <tr v-for="(item,index) in currentPageData" :key="index">
            <td class="name_style">
              <h4 @click="showBlogData(item.id_id)" class="a_sty">{{item.name}}</h4>
              <p class="p_sytl">{{item.count}}----------------------------------------------------------------------------------------</p>
              <span class="date">2019-11-29 20:34:03</span>
            </td>
          </tr>
          </tbody>
        </table>
      </main>
      <div class="block">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :page-size="100"
          layout="total, prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import 'markdown-it-vue/dist/markdown-it-vue.css'
const productList = []
for (let i = 1; i < 100; i++) {
  productList.push({
    name: '第' + i + '瓶奶酪',
    count: Math.random() * 100,
    id_id: i
  })
}
export default {
  name: 'main',
  components: {
  },
  data () {
    return {
      productList, // 所有数据
      totalPage: 1, // 统共页数，默认为1
      currentPage: 1, // 当前页数 ，默认为1
      pageSize: 10, // 每页显示数量
      currentPageData: [] // 当前页显示内容
    }
  },
  methods: {
    handleCurrentChange (val) {
      if (this.currentPage === val) return
      this.currentPage = val
      this.setCurrentPageData()
    },
    // 设置当前页面数据，对数组操作的截取规则为[0~10],[10~20]...,
    setCurrentPageData () {
      const begin = (this.currentPage - 1) * this.pageSize
      const end = this.currentPage * this.pageSize
      this.currentPageData = this.productList.slice(
        begin,
        end
      )
    },
    showBlogData (blogId) {
      const $this = this
      this.$http({ // 格式a
        method: 'get',
        url: 'http://127.0.0.1:8000/test/?id=' + blogId
      }).then(function (res) {
        $this.$root.blog_num = res.data
        $this.$router.push({ path: '/home/show' })
        // alert(res.data)
      }).catch(resp => {
        console.log('请求失败：' + resp.status + ',' + resp.statusText)
      })
    }
  },
  mounted: function () {
    // 计算一共有几页
    this.totalPage = Math.ceil(this.productList.length / this.pageSize)
    // 计算得0时设置为1
    this.totalPage = this.totalPage === 0 ? 1 : this.totalPage
    this.setCurrentPageData()
  }
}
</script>

<style>
  .left_flag {
    width: 24%;
  }
  .date {
    position: relative;
    font-family: "SF Pro Display",Roboto,Noto,Arial,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;
    font-size: 14px;
    line-height: 1.57142857;
    color: #333;
    min-height: 100%;
    padding-left: 36px;
  }
  .p_sytl {
    font-size: 14px;
    line-height: 22px;
    white-space: normal;
    color: #999aaa;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    padding-left: 72px;
  }
  .a_sty {
    text-decoration: none;
    display: block;
    padding-left: 36px;
    word-break: break-all;
    color: #222226;
    font-size: 18px;
    line-height: 20px;
    font-weight: 500;
    cursor:pointer
  }
  .name_style {
    position: relative;
    padding: 16px 24px 12px 24px;
    border-bottom: 1px solid #0d0e0e;
  }
  .el-container {
    position: fixed;
    left:0.5em;
    top:50%;
    margin-top:-200px;
  }
  .el-header, .el-footer {
    position: fixed;
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
  .wrap {
    background-color: rgba(251, 252, 251, 0.8);
    margin-left: 25%;
    position: relative;
    width: 70%;
  }
  .block {
    margin-left: 200px;
    position: relative;
  }
  .rightPart{
       height: 100%;
       width: 100%;
       overflow-y: scroll;
  }

</style>
