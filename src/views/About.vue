<template>
  <div class="about">
    <el-row class="main" type="flex" justify="center">
      <el-col :span="16">
        <h5 class="title"><i class="el-icon-star-on"></i>{{about.aboutMe}}</h5>
        <div class="statement">
          <div class="item">it技术的探索者</div>
          <div class="item">座右铭：向上的路并不拥挤，而大多数人选择了安逸。</div>
        </div>
        <div class="statement">
          <div class="item">Email：fengziy@aliyun.com</div>
          <div class="item">QQ：1224971566</div>
          <div class="item">CSDN：
            <a target="_blank" href="https://blog.csdn.net/feng_zi_ye">https://blog.csdn.net/feng_zi_ye</a>
          </div>
        </div>
        <h5 class="title"><i class="el-icon-star-on"></i>{{about.aboutBlog}}</h5>
        <el-card shadow="always">
          <dl class="dl-blog">
            <dt>{{about.blogSource}}</dt>
            <dd>
              <a target="_blank" href="https://gitee.com/fengziy/Fblog"><img class="icon" src="../assets/image/1.jpg" alt="码云" /></a>
            </dd>
            <dt>{{about.technology}}</dt>
            <dd>Vue、Vue-Router、Element-ui、Vue-i18n</dd>
            <dt>{{about.other}}</dt>
            <dd>百度分享、点击爱心特效、复制追加版权信息</dd>
          </dl>
        </el-card>
        <h5 class="title"><i class="el-icon-star-on"></i>{{about.contactMe}}</h5>
        <el-card shadow="always">
          <el-form label-position="left" :rules="rules" label-width="80px" ref="formLabelAlign" :model="formLabelAlign">
            <el-form-item :label=about.yourName prop="name" class="name_label">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item :label=about.email prop="email" class="name_label">
              <el-input v-model="formLabelAlign.email"></el-input>
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
        name: 'ddd',
        email: 'ddd@qq.com',
        content: 'ddd'
      },
      about: {
        aboutMe: '关于自己',
        aboutBlog: '关于博客',
        contactMe: '给我留言',
        blogSource: '博客开源',
        technology: '涉及技术',
        other: '其他',
        yourName: '称谓',
        email: '邮箱',
        content: '留言内容',
        submit: '提交留言'
      },
      rules: {
        name: [{
          required: true,
          message: '请输入您的称谓',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          message: '请输入您的邮箱',
          trigger: 'blur'
        },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: ['blur', 'change']
        }
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            method: 'get',
            url: this.$serverurl.test_url,
            data: {
              name: 'xiaoming',
              info: '12'
            }
          }).then(res => {
            if (res.status === 200) {
              this.formLabelAlign.name = 'asdfghjk'
            }
          }).catch(error => {
            alert(error)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style>
  .name_label .el-textarea__inner {
    line-height: 3;
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
