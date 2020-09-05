<template>
  <div class="main">
    <el-container style="width: 24%;height: auto;max-height: 100%">
        <el-aside style="width: 100%;height: auto;line-height: 100%">
          分类
        </el-aside>
    </el-container>
    <div class="wrap" style="margin-right: 30px">
      <main>
        <table>
          <h1 style="text-align:center;margin-top: 30px">名称</h1>
          <tbody>
          <tr v-for="(item,index) in currentPageData" :key="index">
            <td class="name_style">
              <h4 @click="showBlogData(item.id_id)" class="a_sty">{{item.name}}</h4>
              <p class="p_sytl">{{item.count}}</p>
              <span class="date">{{item.data}}</span>
            </td>
          </tr>
          </tbody>
        </table>
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
export default {
  name: 'main',
  components: {
  },
  data () {
    return {
      productList: [], // 所有数据
      totalPage: 1, // 统共页数，默认为1
      currentPage: 1, // 当前页数 ，默认为1
      pageSize: 10, // 每页显示数量
      currentPageData: [], // 当前页显示内容
      num_counr: 0
    }
  },
  methods: {
    get_blog_list () {
      const $this = this
      this.$http({ // 格式a
        method: 'get',
        url: this.$serverurl.list_blog
      }).then(function (res) {
        if (res.data === 'error') {
          this.$message({
            message: '请求失败：' + res.data,
            type: 'warning'
          })
        } else {
          $this.num_counr = res.data.count
          for (let i = 0; i < res.data.count; i++) {
            $this.productList.push({
              name: res.data.data[i].name,
              count: res.data.data[i].count,
              id_id: res.data.data[i].id_id,
              data: res.data.data[i].data
            })
          }
          $this.totalPage = Math.ceil($this.productList.length / $this.pageSize)
          $this.totalPage = $this.totalPage === 0 ? 1 : $this.totalPage
          $this.setCurrentPageData()
        }
      }).catch(resp => {
        this.$message({
          message: '请求失败：' + resp.status + ',' + resp.statusText,
          type: 'warning'
        })
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
      const $this = this
      this.$http({ // 格式a
        method: 'get',
        url: this.$serverurl.show_blog + blogId
      }).then(function (res) {
        if (res.data === 'error') {
          this.$message({
            message: '请求失败：' + res.data,
            type: 'warning'
          })
        } else {
          $this.$root.blog_num = res.data
          $this.$router.push({ path: '/home/show' })
        }
        // alert(res.data)
      }).catch(resp => {
        console.log('请求失败：' + resp.status + ',' + resp.statusText)
      })
    }
  },
  mounted: function () {
    this.get_blog_list()
  }
}
</script>

<style>
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
    /*top:50%;*/
    /*margin-top:-200px;*/
    margin-top:20px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: left;
    line-height: 200px;

  }
  .wrap {
    background-color: rgba(251, 252, 251, 0.8);
    margin-left: 25%;
    position: relative;
    width: 70%;
    min-height: 550px;
  }
  .block {
    margin-left: 200px;
    position: relative;
  }
</style>
