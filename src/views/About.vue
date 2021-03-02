<template>
  <div class="about">
    <el-row class="main" type="flex" justify="center">
      <el-col style="max-width: 85%;width: auto;min-width: 50%">
        <h3 class="title"><i class="el-icon-star-on"></i>{{about.aboutMe}}</h3>
        <div class="statement">
          <div class="item">精通C/C++、Python、Vue</div>
          <div class="item">前座右铭：熟悉就是精通，了解就是掌握。</div>
          <div class="item">座右铭：菜鸡一个，大佬带带我。</div>
        </div>
        <div class="statement">
          <div class="item">Email：tw958658@163.com</div>
          <div class="item">QQ：772959255</div>
          <div class="item">CSDN：
            <a target="_blank" href="https://blog.csdn.net/Uchiha_tw">https://blog.csdn.net/Uchiha_tw</a>
          </div>
          <div class="item">GitHub：
            <a target="_blank" href="https://github.com/Crossroadtw">https://github.com/Crossroadtw</a>
          </div>
        </div>
        <h3 class="title"><i class="el-icon-star-on"></i>{{about.aboutBlog}}</h3>
        <el-card shadow="always">
          <dl class="dl-blog">
            <dt>{{about.blogSource}}</dt>
            <dd>
              <a target="_blank" href="https://github.com/Crossroadtw"><img class="icon" src="../assets/image/1.jpg" alt="码云" /></a>
            </dd>
            <dt>{{about.technology}}</dt>
            <dd>Vue、Vue组件、Element-ui、Python(各种包)、Django(依赖)、Flask(依赖)、SQL、NoSQL、部署</dd>
            <dt>{{about.other}}</dt>
            <dd>前端刚开始，学习中。。。</dd>
            <dd>现在没学了，偶尔会看看，工作中暂时用不到</dd>
          </dl>
        </el-card>
        <h3 class="title"><i class="el-icon-star-on"></i>{{about.contactMe}}</h3>
        <el-card shadow="always">
          <el-form label-position="left" :rules="rules" label-width="80px" ref="formLabelAlign" :model="formLabelAlign">
            <el-form-item :label=about.email class="name_label" prop="name">
              <input type="file" @change="getFile($event)" class="file_blog" accept=".md" ref="file" id="file_name">
            </el-form-item>
            <el-form-item label="分类" class="name_label" prop="name" style="width: 100%;">
              <el-autocomplete
                popper-class="my-autocomplete"
                v-model="formLabelAlign.label"
                style="width: 100%;"
                :fetch-suggestions="querySearch"
                placeholder="请输入/选择分类"
                @select="handleSelect">
                <i
                  class="el-icon-edit el-input__icon"
                  slot="suffix"
                  @click="handleIconClick">
                </i>
                <template slot-scope="{ item }">
                  <div class="name">{{ item }}</div>
                </template>
              </el-autocomplete>
            </el-form-item>
            <el-form-item :label=about.yourName prop="name" class="name_label">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item :label=about.content prop="content" class="name_label">
              <el-input type="textarea" v-model="formLabelAlign.content"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('formLabelAlign')">{{about.submit}}<i class="el-icon-upload el-icon--right"></i></el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  // required 属性适用于以下 <input> 类型：text, search, url, telephone, email, password, date pickers, number, checkbox, radio 以及 file。
  name: 'about',
  data () {
    return {
      restaurants: [],
      state: '',
      formLabelAlign: {
        name: '',
        content: '',
        file: '',
        label: ''
      },
      about: {
        aboutMe: '关于自己',
        aboutBlog: '关于博客',
        contactMe: '更新博文',
        blogSource: '博客开源git',
        technology: '博客涉及技术',
        other: '其他',
        yourName: '上传密码',
        email: '文件',
        content: '文件介绍',
        submit: '提交笔记'
      },
      rules: {
        name: [{
          required: true
        }],
        content: [{
          required: true,
          message: '请输入留言内容',
          trigger: 'blur'
        }]
      }
    }
  },
  mounted: function () {
    this.get_label()
  },
  methods: {
    getFile (event) {
      // this.file = event.target.files[0]
      this.formLabelAlign.file = event.target.files[0]
    },
    handleSelect (item) {
      this.formLabelAlign.label = item
    },
    handleIconClick (ev) {
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    get_label () {
      const $this = this
      this.$http({ // 格式a
        method: 'get',
        url: this.$serverurl.show_label + '?flag=label'
      }).then(function (res) {
        $this.restaurants = res.data.data
      })
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    submitForm (formName) {
      var formData = new FormData()
      formData.append('key', this.formLabelAlign.name)
      formData.append('info_data', this.formLabelAlign.content)
      formData.append('file', this.formLabelAlign.file)
      formData.append('label', this.formLabelAlign.label)
      this.$http({
        method: 'post',
        url: this.$serverurl.up_blog,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData
      }).then(res => {
        if (res.data === 'error') {
          Message.warning('请求失败：error')
        } else {
          this.formLabelAlign.name = ''
          this.formLabelAlign.content = ''
          this.formLabelAlign.label = ''
          var a = document.getElementById('file_name')
          a.value = ''
          Message.success('上传成功')
        }
      }).catch(error => {
        Message.error('请求失败：' + error)
      })
    }
  }
}
</script>

<style>
  .about {
    text-align: center;
  ;
  }
  .file_blog {
    float: left;
    width: 100%;
    color: #0c0c0c;
    text-decoration: none;
    font-size: 15px;
    margin-top: 10px;
    cursor: pointer;
  }
  .name_label .el-textarea__inner {
    line-height: 2;
  }
  .el-form-item__content {
    text-align:center;
  }
  .name_label .el-form-item__label {
    color: #25292e;
  }
  .el-card.is-always-shadow {
    background-color: rgba(0, 0, 0, 0)
  }
  .el-card__body {
    text-align: left;
    overflow: auto;
    background-color: rgba(251, 252, 251, 0.5)
  }
  .dl-blog dd {
    margin-left: 30px;
    /*background-color: rgba(0, 0, 0, 0.4)*/
  }

  .dl-blog .icon {
    width: 20px;
    height: 20px;
  }

  .title {
    margin-top: 40px;
    /*background-color: rgba(0, 0, 0, 0.4)*/
  }

  .statement {
    text-align: left;
    border-left: 3px solid #d95a5a;
    padding: 2%;
    background-color: #EBEEF5;
    margin-top: 3%;
    overflow: auto;
    background-color: rgba(251, 252, 251, 0.5)
  }
</style>
