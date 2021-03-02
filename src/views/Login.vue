<template>
    <div class="Login">
      <el-row :gutter="24">
        <el-col :span="16" :offset="4">
<!--          <el-button>自动识别</el-button>-->
          <el-autocomplete
            placeholder="自动识别"
            :disabled="true">
          </el-autocomplete>
          <i class="el-icon-sort" style="transform: rotate(90deg);margin-left: 3%;margin-right: 3%" v-if="of_shou === 0"></i>
          <i class="el-icon-sort" style="text-align: center;width: 100%" v-if="of_shou"></i>
          <el-autocomplete
            popper-class="my-autocomplete"
            v-model="state"
            :fetch-suggestions="querySearch"
            :hide-loading = "true"
            placeholder="简体中文"
            @select="handleSelect"
            clearable>
            <template slot-scope="{ item }">
              <div class="name">{{ item }}</div>
            </template>
          </el-autocomplete>
          <el-button style="margin-left: 3%;background-color: #3a8ee6;color: white" @click="get_data_language" v-if="of_shou === 0">翻译</el-button>
        </el-col>
        <el-col :span="span_s" :offset="4" style="margin-top: 3%"><div class="grid-content bg-purple">
          <el-input
            type="textarea"
            :rows="fanyi_lang"
            placeholder="请输入原内容"
            v-model="input_te">
          </el-input>
        </div></el-col>
        <el-col :span="span_m" :offset="of_shou" style="margin-top: 3%"><div class="grid-content bg-purple">
          <el-input
            type="textarea"
            :rows="fanyi_lang"
            placeholder="显示翻译结果"
            v-model="output_te"
            style="height: auto"
            :disabled="true">
          </el-input>
        </div></el-col>
      </el-row>
      <div style="position: relative;margin-top: 3%;text-align: center" v-if="of_shou">
        <el-col :span="16" :offset="4">
        <el-button style="background-color: #3a8ee6;color: white" @click="get_data_language">翻译</el-button>
        </el-col>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    get_option () {
      const $this = this
      this.$http({ // 格式a
        method: 'get',
        url: this.$serverurl.language
      }).then(function (res) {
        $this.restaurants = res.data.data
      })
    },
    get_data_language () {
      const $this = this
      this.$http({ // 格式a
        method: 'post',
        data: {
          type_de: $this.state,
          text_de: $this.input_te
        },
        url: this.$serverurl.language
      }).then(function (res) {
        $this.output_te = res.data
      })
    },
    handleSelect (item) {
      this.state = item
    },
    handleIconClick (ev) {
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    }
  },
  mounted: function () {
    this.get_option()
    if (document.body.clientWidth >= 650) {
      this.span_s = 8
      this.span_m = 8
      this.span_t = 2
      this.of_shou = 0
      this.fanyi_lang = 7
    } else {
      this.span_s = 16
      this.span_m = 16
      this.span_t = 16
      this.of_shou = 4
      this.fanyi_lang = 4
    }
  },
  data () {
    return {
      span_s: 0,
      span_m: 0,
      span_t: 0,
      of_shou: 0,
      fanyi_lang: '',
      restaurants: [],
      state: '',
      input_te: '',
      output_te: ''
    }
  }
}
</script>

<style scoped>
.Login {
  max-width: 100%;
  height: 50%;
  width: 100%;
  max-height: 50%;
}
.Login:before {
  content: '';
  display: inline-block;
  vertical-align: middle;
  height: 30%;
}
</style>
