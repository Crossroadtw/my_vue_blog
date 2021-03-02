<template>
    <div :class="[{'card_1_wi':dispas},{'card_2_wi':dispas===false}]" v-infinite-scroll="load" style="height: auto;position: relative" infinite-scroll-disabled="disabled">
      <h1>生活随笔</h1>
        <div v-for="(i, index) in data_info" :key="index" style="margin-top: 5%" >
          <el-card shadow="hover" class="el-card">
            <div style="padding-top: 1%;padding-left: 3%">{{index+1}}、{{i.comment}}</div>
            <div style="float: right">{{i.create_time}}</div>
          </el-card>
        </div>
      <p v-if="loading" style="text-align: center;color: white">加载中...</p>
      <p v-if="noMore" style="text-align: center;color: white">没有更多了</p>
    </div>
</template>

<script>
import { Loading, Message } from 'element-ui'

export default {
  name: 'Record',
  data () {
    return {
      dispas: true,
      loading: false,
      noMore: false,
      data_info: [],
      page: 1
    }
  },
  computed: {
    disabled () {
      // return this.loading
      return this.loading || this.noMore
    }
  },
  methods: {
    load () {
      const loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
        fullscreen: true
      })
      this.loading = true
      // setTimeout(() => {
      //   this.count += 10
      //   this.loading = false
      // }, 1000)
      const $this = this
      this.$http({ // 格式a
        method: 'get',
        url: this.$serverurl.informal_essay + '?page=' + $this.page
      }).then(function (res) {
        if (res.data.data === 'error') {
          // Message.warning('请求失败：error')
          $this.loading = false
          $this.noMore = true
        } else {
          // alert(res.data.data)
          for (let i = 0; i < res.data.count; i++) {
            $this.data_info.push(res.data.data[i])
          }
          $this.page += 1
          $this.loading = false
        }
      })
      loadingInstance.close()
    }
  },
  mounted: function () {
    const loadingInstance = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
      fullscreen: true
    })
    this.dispas = document.body.clientWidth >= 650
    const $this = this
    this.$http({ // 格式a
      method: 'get',
      url: this.$serverurl.informal_essay + '?page=' + $this.page
    }).then(function (res) {
      if (res.data.data === []) {
        Message.warning('请求失败：error')
        loadingInstance.close()
      } else {
        for (let i = 0; i < res.data.count; i++) {
          $this.data_info.push(res.data.data[i])
        }
        loadingInstance.close()
        $this.page += 1
      }
    })
  }
}
</script>

<style scoped>
  .Record {
    width: 100%;
    height: 100%;
    position: relative;
    text-align: center;
  }
  .card_1_wi {
    width: 66%;
    height: 100%;
    margin-left: 17%;
    text-align: left;
  }
  .card_2_wi {
    width: 90%;
    margin-left: 5%;
    height: 100%;
    text-align: left;
  }
  .el-card {
    opacity: 0.6;
    line-height: 3;
    background: url('../assets/image/ba.jpg');
    background-size: 100% 100%;
    display: block;
    overflow: auto;
  }
  h1 {
    text-align: center;
    color: #6a737d;
  }
</style>
