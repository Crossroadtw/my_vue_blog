<template>
  <div class="main">
    <el-container style="width: 24%;height: auto">
      <el-aside style="width: 100%;height: auto;line-height: 100%">
        分类
      </el-aside>
    </el-container>
    <div class="mark_styl" v-html="compiledMarkdown"></div>

  </div>
</template>

<script>
import 'markdown-it-vue/dist/markdown-it-vue.css'
import marked from 'marked'
import hljs from 'highlight.js'

export default {
  name: 'main',
  components: {
  },
  data () {
    return {
      content: this.$root.blog_num
    }
  },
  methods: {
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.$root.blog_num, {
        highlight: function (code) {
          return hljs.highlightAuto(code).value
        }
      })
    }
  },
  mounted: function () {
  }
}
</script>

<style>
  h1 {
    text-align: center;
  }
  code {
    white-space: pre-wrap
  }
  .el-container {
    position: fixed;
    left:0.5em;
    /*top:50%;*/
    /*margin-top:-200px;*/
    margin-top:10px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: left;
    line-height: 200px;

  }

  .mark_styl {
    background-color: rgba(251, 252, 251, 0.8);
    margin-left:25%;
    /*margin-right:10px;*/
    position: relative;
    min-height: 550px;
  }

</style>
