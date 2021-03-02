<template>
  <div class="Blog">
    <el-container style="width: 24%;height: 70%;flex-direction: column;margin-top: 0;overflow: auto" v-show="dispa">
        <el-card class="box-card" style="width: auto;max-height: 50%;overflow: auto;height: auto">
          <div slot="header" class="clearfix">
            <span><i style="color: blue" class="el-icon-collection-tag"></i>文章标签</span>
          </div>
          <div v-for="(item,index) in label_show_data" :key="index">
            <p @click="show_label(item)" style="cursor: pointer;">
              <span style="color: blue">{{index+1}}、</span>
              <span  class="link">{{item}}</span>
            </p>
          </div>
        </el-card>
      <el-card class="box-card" style="width: auto;max-height: 50%">
        <div slot="header" class="clearfix">
          <span><i style="color: blue" class="el-icon-s-cooperation"></i>归档记录</span>
        </div>
        <div v-for="(item,index) in flie_show_data" :key="index">
          <p @click="show_file_d(item)" style="cursor: pointer;">
            <span style="color: blue">{{index+1}}、</span>
            <span class="link">{{item}}</span>
          </p>
        </div>
      </el-card>
    </el-container>
    <div :class="[{'wrap':dispa},{'wrap2':dispa===false}]" style="margin-right: 30px">
      <span @click="get_blog_list()" style="cursor: pointer;margin-left: 3%;">
        <span class="link" style="margin-top: 3%"><i style="color: blue;" class="el-icon-reading"></i>显示全部</span>
      </span>
      <main>
          <h1 style="text-align:center;margin-top: 30px;width: 100%">文章列表</h1>
          <el-row :span="8" v-for="(item,index) in currentPageData" :key="index">
            <i class="el-icon-delete" style="float: right;margin-left: 3%;cursor:pointer" @click="delete_data(item.id_id)" v-show="login_flag===false"></i>
            <i class="el-icon-bottom" style="float: right;text-decoration: underline;cursor:pointer" @click="download(item.name)" v-show="login_flag===false"></i>
            <el-card :body-style="{ padding: '5%' }" shadow="hover" style="width: auto;">
                <a class="a_sty" @click="showBlogData(item.id_id)"><span class="link">{{item.name}}</span></a>
                <p class="p_sytl">{{item.count}}</p>
                <el-tag>{{item.label}}</el-tag>
                <span class="date">{{item.data}}</span>
            </el-card>
            <br>
          </el-row>
      </main>
      <div class="block">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next, jumper"
          :total="num_counr">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading, Message } from 'element-ui'
export default {
  name: 'Blog',
  components: {
  },
  data () {
    return {
      dispa: true,
      login_flag: this.$root.login_flag,
      windowsss: document.body.clientWidth,
      productList: [], // 所有数据
      totalPage: 1, // 统共页数，默认为1
      currentPage: 1, // 当前页数 ，默认为1
      pageSize: 10, // 每页显示数量
      currentPageData: [], // 当前页显示内容
      num_counr: 0,
      flie_show_data: 0,
      label_show_data: 0
    }
  },
  methods: {
    get_blog_list () {
      const loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
        fullscreen: true
      })
      const $this = this
      this.$http({ // 格式a
        method: 'get',
        url: this.$serverurl.list_blog
      }).then(function (res) {
        if (res.data === 'error') {
          Message.warning('请求失败：error')
        } else {
          $this.num_counr = res.data.count
          $this.productList = []
          for (let i = 0; i < res.data.count; i++) {
            $this.productList.push({
              name: res.data.data[i].name,
              count: res.data.data[i].count,
              id_id: res.data.data[i].id_id,
              data: res.data.data[i].data,
              label: res.data.data[i].label
            })
          }
          loadingInstance.close()
          $this.totalPage = Math.ceil($this.productList.length / $this.pageSize)
          $this.totalPage = $this.totalPage === 0 ? 1 : $this.totalPage
          $this.setCurrentPageData()
        }
      }).catch(resp => {
        Message.warning('请求失败：error')
        loadingInstance.close()
      })
    },
    get_label_list () {
      const $this = this
      this.$http({ // 格式a
        method: 'get',
        url: this.$serverurl.show_label
      }).then(function (res) {
        // $this.$root.label_data = res.data.data
        $this.label_show_data = res.data.data
        // $this.setCurrentPageData()
      })
    },
    get_file_list () {
      const $this = this
      this.$http({ // 格式a
        method: 'get',
        url: this.$serverurl.show_file
      }).then(function (res) {
        // $this.$root.file_data = res.data.data
        $this.flie_show_data = res.data.data
        // $this.setCurrentPageData()
      })
    },
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
      const loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
        fullscreen: true
      })
      const $this = this
      this.$http({ // 格式a
        method: 'get',
        url: this.$serverurl.show_blog + blogId
      }).then(function (res) {
        if (res.data === 'error') {
          Message.warning('请求失败：error')
        } else {
          $this.$root.blog_num = res.data
          $this.$root.com_data = blogId
          loadingInstance.close()
          $this.$router.push({ path: '/home/show' })
          window.scrollTo(0, 0)
        }
        // alert(res.data)
      }).catch(resp => {
        console.log('请求失败：' + resp.status + ',' + resp.statusText)
      })
    },
    show_label (res) {
      const $this = this
      const bale = res.split('(')[0]
      this.$http({ // 格式a
        method: 'post',
        data: { label: bale },
        url: this.$serverurl.show_label
      }).then(function (res) {
        $this.productList = []
        $this.num_counr = res.data.count
        for (let i = 0; i < res.data.count; i++) {
          $this.productList.push({
            name: res.data.data[i].name,
            count: res.data.data[i].count,
            id_id: res.data.data[i].id_id,
            data: res.data.data[i].data,
            label: res.data.data[i].label
          })
        }
        $this.totalPage = Math.ceil($this.productList.length / $this.pageSize)
        $this.totalPage = $this.totalPage === 0 ? 1 : $this.totalPage
        $this.setCurrentPageData()
      })
    },
    show_file_d (res) {
      const $this = this
      this.$http({ // 格式a
        method: 'post',
        data: { archive: res.split('(')[0] },
        url: this.$serverurl.show_file
      }).then(function (res) {
        $this.productList = []
        $this.num_counr = res.data.count
        for (let i = 0; i < res.data.count; i++) {
          $this.productList.push({
            name: res.data.data[i].name,
            count: res.data.data[i].count,
            id_id: res.data.data[i].id_id,
            data: res.data.data[i].data,
            label: res.data.data[i].label
          })
        }
        $this.totalPage = Math.ceil($this.productList.length / $this.pageSize)
        $this.totalPage = $this.totalPage === 0 ? 1 : $this.totalPage
        $this.setCurrentPageData()
      })
    },
    download (res) {
      window.location.href = this.$serverurl.down_load + res + '.md'
    },
    delete_data (res) {
      const $this = this
      this.$http({ // 格式a
        method: 'post',
        data: { type_file: 'blog', file_id: res },
        url: this.$serverurl.down_delete
      }).then(function (res) {
        if (res.data === 'error') {
          Message.warning('请求失败：error')
        } else {
          $this.get_blog_list()
          $this.get_label_list()
          $this.get_file_list()
          Message.success('删除成功')
        }
      })
    }
  },
  mounted: function () {
    this.dispa = document.body.clientWidth >= 650
    this.get_blog_list()
    this.get_label_list()
    this.get_file_list()
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.windowsss = window.screenWidth
      })()
    }
  },
  watch: {
    windowsss (val) {
      this.dispa = val >= 650
    }
  }
}
</script>

<style>
  .el-container {
    position: fixed;
    left:0.5em;
    margin-top:10px;
  }
  .date {
    position: relative;
    font-family: "SF Pro Display",Roboto,Noto,Arial,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;
    font-size: 14px;
    line-height: 1.57142857;
    color: #333;
    min-height: 100%;
    /*padding-left: 36px;*/
    float:right
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
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    padding-left: 5%;
  }
  .a_sty {
    text-decoration: none;
    display: block;
    /*padding-left: 36px;*/
    word-break: break-all;
    color: #222226;
    font-size: 20px;
    /*line-height: 20px;*/
    font-weight: 500;
    cursor:pointer
  }
  .name_style {
    /*position: relative;*/
  }
  .wrap {
    background-color: rgba(251, 252, 251, 0);
    margin-left: 25%;
    position: relative;
    width: 70%;
    margin-top: 3%;
    min-height: 550px;
    /*border-color: #0d0e0e;*/
    /*border: 3px solid #95afee;*/
    /*border-radius: 8px;*/
  }
  .wrap2 {
    background-color: rgba(251, 252, 251, 0);
    margin-left: 10%;
    position: relative;
    width: 80%;
    margin-top: 3%;
    min-height: 550px;
    /*border-color: #0d0e0e;*/
    /*border: 3px solid #95afee;*/
    /*border-radius: 8px;*/
  }
  .block {
    /*margin-left: 200px;*/
    text-align: center;
    position: relative;
    background-color: rgba(251, 252, 251, 0.5);
    border-radius: 10px;
  }
  .link:hover {
    color: #409EFF;
  }
  .el-card__body {
    background-color: rgba(251, 252, 251, 0.5) !important;
  }
  .el-card {
    background-color: rgba(251, 252, 251, 0) !important;
  }
</style>
