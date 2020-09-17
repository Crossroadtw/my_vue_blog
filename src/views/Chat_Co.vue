<template>
  <div class="Chat_Co">
    <div id="up"></div>
    <el-input
      id="send"
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="textarea">
    </el-input>
    <input type="button" value="连接" @click="WebSocketTest()" id="connet">
    <input type="button" value="关闭连接" @click="close_ws()" id="disconnet" disabled="disabled">
    <input type="button" value="发送" @click="send_web()" disabled="disabled"
    id="send_btn" title="Ctrl+Enter发送">
  </div>
</template>

<script>
var ws = ''
export default {
  name: 'Chat_Co',
  data () {
    return {
      websocket: '',
      textarea: ''
    }
  },
  mounted: function () {
    // this.WebSocketTest()
  },
  methods: {
    WebSocketTest () {
      // ws = new WebSocket('ws://127.0.0.1:8000/ws_co/')
      ws = new WebSocket(this.$serverurl.ws_socket)
      document.getElementById('connet').disabled = 1
      document.getElementById('disconnet').disabled = 0
      document.getElementById('send_btn').disabled = 0
      if ('WebSocket' in window) {
        this.$message({
          message: '您的浏览器支持 WebSocket!',
          type: 'success'
        })
        ws.onopen = function (data) {
          ws.send('连接成功')
        }
        ws.onmessage = function (evt) {
          var a = document.getElementById('up')
          a.innerHTML += '<br/>' + evt.data
          a.scrollTop = a.scrollHeight
        }
        ws.onclose = function () {
          document.getElementById('connet').disabled = 0
          document.getElementById('disconnet').disabled = 1
          document.getElementById('send_btn').disabled = 1
          alert('链接已关闭...')
        }
      } else {
        // 浏览器不支持 WebSocket
        this.$message({
          message: '您的浏览器不支持 WebSocket!',
          type: 'error'
        })
      }
    },
    send_web () {
      // eslint-disable-next-line camelcase
      var sen_data = document.getElementById('send')
      if (sen_data.value === '') {
        this.$message({
          message: '数据为空，发送失败。。',
          type: 'warning'
        })
      } else {
        ws.send(sen_data.value)
        sen_data.value = ''
      }
    },
    close_ws () {
      // eslint-disable-next-line camelcase
      var sen_data = document.getElementById('send')
      ws.send('close_ws')
      sen_data.value = ''
    }
  }
}
</script>

<style>
.Chat_Co {
  min-height: 550px;
  height: auto;
  width: auto;
  text-align:center
}

#up {
  text-align: left;
  min-height: 400px;
  height: auto;
  max-width: 60%;
  margin-left: 20%;
  border: 1px solid #b41756;
  background: #f3f0f0;
  OVERFLOW-Y: auto;
}

#send {
  margin-left: 20%;
  min-height: 130px;
  height: auto;
  max-width: 60%;
}
</style>
