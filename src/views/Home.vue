<template>
  <div class="home">
    <el-carousel ref="carousel" @click.native="linkTo" style="height: 400px">
      <el-carousel-item class="carousel-item" v-for="item in picture_list" v-bind:key="item.url">
        <img class="carousel-img" :src="item">
      </el-carousel-item>
    </el-carousel>
    <h1 style="color: yellow;position: relative;margin-top: 10%">欢迎光临小站！</h1>
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
  },
  methods: {
    linkTo () {
      const activeIndex = this.$refs.carousel.activeIndex
      this.$router.push(this.imgs[activeIndex].link)
    }
  }
}
</script>
<style>
  .home {
    width: 100%;
    text-align: center;
  }
  .carousel-item {
    margin-top: 3%;
    max-width: 100%;
    max-height: 100%;
    /*width: auto;*/
    height: auto;
    /*background: white;*/
    /*display: flex;*/
    justify-content: center;
  }
  .carousel-img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    /*height: auto;*/
    min-height: 50%;
    min-width: 50%;
  }
  .carousel-inner img {
    width:100%;
  }
</style>
