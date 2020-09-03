<template>
  <div class="about">
    <el-row class="main" type="flex" justify="center">
      <el-col :span="16">
        <h3 class="title"><i class="el-icon-star-on"></i>{{about.aboutMe}}</h3>
        <div class="statement">
          <div class="item">精通C/C++、Python、Vue</div>
          <div class="item">座右铭：熟悉就是精通，了解就是掌握。</div>
        </div>
        <div class="statement">
          <div class="item">Email：tw958658@163.com.com</div>
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
            <dd>Vue、Vue组件、Element-ui、Python(各种包)、Django(依赖)、SQL、NoSQL、部署</dd>
            <dt>{{about.other}}</dt>
            <dd>前端刚开始，学习中。。。</dd>
          </dl>
        </el-card>
        <h3 class="title"><i class="el-icon-star-on" style="margin-left: 15%;"></i>{{about.contactMe}}</h3>
        <el-card shadow="always" style="width: 70%;margin-left: 15%;">
          <el-form label-position="left" :rules="rules" label-width="80px" ref="formLabelAlign" :model="formLabelAlign">
            <el-form-item :label=about.email class="name_label" prop="name">
              <input type="file" @change="getFile($event)" class="file_blog" accept=".md" ref="file" id="file_name">
            </el-form-item>
            <el-form-item :label=about.yourName prop="name" class="name_label">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item :label=about.content prop="content" class="name_label">
              <el-input type="textarea" v-model="formLabelAlign.content"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('formLabelAlign')">{{about.submit}}</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  // required 属性适用于以下 <input> 类型：text, search, url, telephone, email, password, date pickers, number, checkbox, radio 以及 file。
  name: 'about',
  data () {
    return {
      formLabelAlign: {
        name: '',
        content: '',
        file: ''
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
  methods: {
    getFile (event) {
      // this.file = event.target.files[0]
      this.formLabelAlign.file = event.target.files[0]
    },
    submitForm (formName) {
      var formData = new FormData()
      formData.append('key', this.formLabelAlign.name)
      formData.append('info_data', this.formLabelAlign.content)
      formData.append('file', this.formLabelAlign.file)
      this.$http({
        method: 'post',
        url: this.$serverurl.up_blog,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData
      }).then(res => {
        if (res.status === 200) {
          this.formLabelAlign.name = ''
          this.formLabelAlign.content = ''
          var a = document.getElementById('file_name')
          a.value = ''
        }
      }).catch(error => {
        alert(error)
      })
    }
  }
}
</script>

<style>
  .file_blog {
    float: left;
    width: 100%;
    color: #0c0c0c;
    text-decoration: none;
    font-size: 15px;
    margin-top: 10px;
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
    background-color: rgba(193, 149, 149, 0.6)
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
    border-left: 3px solid #d95a5a;
    padding: 20px;
    background-color: #EBEEF5;
    margin-top: 20px;
    background-color: rgba(193, 149, 149, 0.6)
  }
</style>
