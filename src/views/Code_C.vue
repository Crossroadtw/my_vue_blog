<template>
  <div class="Code_C">
    <div style="width: 66%;margin-left: 17%;position: relative;margin-top: 2%;height: 20%">
        <codemirror
          ref="mycode"
          :value="curCode"
          v-model="curCode"
          :options="cmOptions"
          class="code">
        </codemirror>
      <div><el-button type="success" @click="run_code" style=";position: relative;margin-top: 1%">运行代码</el-button></div>
      <el-input
        type="textarea"
        :rows="fanyi_lang"
        placeholder="显示翻译结果"
        v-model="outputdata"
        style="height: auto;margin-top: 1%"
        :disabled="true">
      </el-input>
    </div>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/theme/abcdef.css'
require('codemirror/mode/python/python')

export default {
  name: 'Code_C',
  components: {
    codemirror
  },
  data () {
    return {
      curCode: '',
      outputdata: '运行结果',
      fanyi_lang: 7,
      cmOptions: {
        mode: 'text/x-python',
        extraKeys: { Ctrl: 'autocomplete' },
        theme: 'abcdef',
        readOnly: false,
        indentWithTabs: true,
        lineWrapping: true,
        smartIndent: true,
        lineNumbers: true,
        matchBrackets: true,
        tabSize: 4,
        indentUnit: 4,
        line: true
      }
    }
  },
  mounted () {
  },
  methods: {
    run_code () {
      const $this = this
      var formData = new FormData()
      formData.append('code', this.curCode)
      this.$http({ // 格式a
        method: 'post',
        data: formData,
        url: this.$serverurl.logout
      }).then(function (res) {
        if (res.data.code === 1002) {
          $this.outputdata = '请登陆后使用'
        } else if (res.data !== '\n' && res.data) {
          $this.outputdata = res.data
        } else {
          $this.outputdata = '请输入正确的PY代码'
        }
      })
    }
  }
}
</script>

<style scoped>
.Code_C {
  width: 100%;
  height: 100%;
  /*text-align: center;*/
}
</style>
