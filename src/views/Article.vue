<template>
  <div class="Article">
    <h1>留言互动</h1>
    <div>
    <img :src="imgUrl" style="max-width: 90%;max-height: 100%">
    </div>
    <el-row class="main" type="flex" justify="center">
      <el-col style="max-width: 90%;width: auto;min-width: 66%">
        <el-card class="box-card">
          <div slot="header" class="clearfix" style="text-align: left">
            <span><i class="el-icon-warning-outline" style="color: red"></i>留言说明:<br>建议填写有效的邮箱地址，否则可能不会及时收到回复信息的~</span>
          </div>
          <el-form :model="comment" label-position="left" :rules="rules" label-width="auto" ref="comment" style="padding: 1%">
            <el-row>
              <el-col :span="span_name">
                <el-form-item label="昵称" prop="name" class="name_label" style="width: auto">
                  <el-input v-model="comment.name" placeholder="请输入昵称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="span_name">
                <el-form-item label="邮箱" prop="email" class="name_label">
                  <el-input v-model="comment.email" placeholder="请输入有效邮件地址"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="内容" prop="content" class="name_label">
                  <el-input :rows="10" type="textarea" placeholder="请输入评论内容" v-model="comment.content"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col style="text-align: center;">
                <el-button type="primary" @click="submitForm()" style="text-align: center">提交<i class="el-icon-upload"></i></el-button>
                <el-button type="primary" @click="reForm()" style="text-align: center">重置<i class="el-icon-refresh"></i></el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <br>
        <br>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>留言版</span>
          </div>
          <div v-for="(item,index) in comment_list" :key="index" style="text-align: left">
            <el-row>
              <el-col :span="span_ti">
                <Avatar  :username="item.user_name"
                         style=" vertical-align: middle;"
                         :inline="true"></Avatar>
              </el-col>
              <el-col :span="span_com">
                <div>
                <span style="color: #1abc9c;margin-right: 2%">{{item.user_name}}</span>
                <span style="background-color: #ededed;padding: 0 2%;font-size: 12px;margin-right: 2%;color: #2c3e50;white-space: pre-wrap;word-break: break-all;">{{item.user_os}}</span>
                <span style="background-color: #ededed;padding: 0 2%;font-size: 12px;margin-right: 2%;color: #2c3e50;white-space: pre-wrap;word-break: break-all;">{{item.user_browser}}</span>
                <span style="text-align: right;font-size: 12px;margin-right: 2%;color: #999;white-space: pre-wrap;word-break: break-all;float: right">{{item.cre_time}}</span>
                </div>
                <br>
                <div>
                  <span style="color:#2c3e50;">{{item.comment}}</span>
                </div>
                <div v-show="login_flag===false">
<!--                <div >-->
                  <el-button v-if="item.master===false" style="float: right; padding: 3px 0" type="text" @click="open(item.comment_scode)">回复</el-button>
                  <el-button style="float: right; padding: 3px 0" type="text" @click="delete_com(item.comment_scode)">删除</el-button>
                </div>
                <div v-if="item.master">
                  <el-divider></el-divider>
                  <div>
                    <span style="width:100%;text-align: right;font-size: 12px;margin-right: 2%;color: #999;white-space: pre-wrap;word-break: break-all;;float: right">{{item.master_time}}</span>
                  </div>
                  <span style="color: red;font-style: italic">站长回复:</span>
                  <span style="white-space: pre-wrap;word-break: break-all;">{{item.masret_com}}</span>
                </div>
              </el-col>
            </el-row>
            <el-divider></el-divider>
          </div>
          <el-pagination
            background
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next, jumper"
            :total="num_counr">
          </el-pagination>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Message, MessageBox, Loading } from 'element-ui'
import UA from 'ua-device'
import Avatar from 'vue-avatar'

export default {
  name: 'Article',
  components: {
    Avatar
  },
  data () {
    return {
      imgUrl: require('@/assets/image/s.gif'),
      comment: {
        span_name: '',
        span_ti: '',
        span_com: '',
        name: '',
        email: '',
        content: '',
        num_counr: ''
      },
      login_flag: this.$root.login_flag,
      comment_list: [],
      rules: {
        name: [{
          required: true,
          message: '请输入昵称',
          trigger: 'blur'
        }],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        content: [{
          required: true,
          message: '请输入留言内容',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    submitForm () {
      // const cookieEnabled1 = navigator.appVersion
      const cookieEnabled = navigator.userAgent
      var output = new UA(cookieEnabled)
      const $this = this
      var formData = new FormData()
      formData.append('user_name', this.comment.name)
      formData.append('comment', this.comment.content)
      formData.append('user_email', this.comment.email)
      formData.append('user_os', output.os.name.split(' ')[0])
      formData.append('user_browser', output.browser.name + output.browser.version.original)
      this.$http({
        method: 'post',
        url: this.$serverurl.comment_message,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData
      }).then(res => {
        if (res.data === 'error') {
          Message.warning('请求失败：error')
        } else {
          this.comment.name = ''
          this.comment.content = ''
          this.comment.email = ''
          Message.success('上传成功')
          $this.get_comment_list(1)
        }
      }).catch(error => {
        Message.error('请求失败：' + error)
      })
    },
    handleCurrentChange (val) {
      this.get_comment_list(val)
    },
    get_comment_list (res) {
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
        url: this.$serverurl.comment_message + '?page=' + res
      }).then(function (res) {
        if (res.data === 'error') {
          Message.warning('请求失败：error')
          loadingInstance.close()
        } else {
          $this.comment_list = res.data.comment_list
          $this.num_counr = res.data.page_num
          loadingInstance.close()
        }
      })
    },
    open (res) {
      MessageBox.prompt('请输入回复内容', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        const $this = this
        this.$http({ // 格式a
          method: 'post',
          url: this.$serverurl.reply,
          data: {
            comment: value,
            comment_sta: res
          }
        }).then(function (res) {
          if (res.data === 'error') {
            Message.warning('请求失败：error')
          } else {
            $this.comment_list = res.data.comment_list
          }
          Message.success('消息回复成功' + value)
        }).catch(() => {
          Message.info('消息回复失败')
        })
      }).catch(() => {
        Message.info('取消输入')
      })
    },
    delete_com (res) {
      const $this = this
      this.$http({ // 格式a
        method: 'delete',
        url: this.$serverurl.comment_message,
        data: {
          comment_flag: res
        }
      }).then(function (res) {
        if (res.data === 'error') {
          Message.warning('请求失败：error')
        } else {
          $this.comment_list = res.data.comment_list
        }
        Message.success('消息删除成功')
      }).catch(() => {
        Message.info('消息删除失败')
      })
    },
    reForm () {
      this.comment.name = ''
      this.comment.content = ''
      this.comment.email = ''
    }
  },
  computed: {
  },
  mounted: function () {
    if (document.body.clientWidth >= 650) {
      this.span_name = 12
      this.span_com = 22
      this.span_ti = 2
    } else {
      this.span_name = 24
      this.span_com = 20
      this.span_ti = 4
    }
    this.get_comment_list(1)
  }
}
</script>

<style>
  .box-card {
    max-width: 100%;
    width: 100%;
  }
  .Article {
    position: relative;
    text-align: center;
    width: auto;
    max-width: 100%;
  }
  h1 {
    text-align: center;
    color: #6a737d;
  }
  .el-card__body {
    overflow: auto;
    background-color: rgba(251, 252, 251, 0.5)
  }
  .el-card.is-always-shadow {
    background-color: rgba(0, 0, 0, 0)
  }

</style>
