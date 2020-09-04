<template>
  <div class="home">
    <el-carousel :interval="5000" arrow="always" class="banner_im">
      <el-carousel-item v-for="item in picture_list" :key="item" class="banner_im">
        <div><el-image fit="fill" style="width: 100%; height: 100%" :src='item'></el-image></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      picture_list: [
        require('../assets/image/2.jpg'),
        require('../assets/image/3.jpg'),
        require('../assets/image/1.jpg')
      ]
    }
  }
}
</script>
<style>
  .banner_im {
    min-height: 550px;
  }
</style>
