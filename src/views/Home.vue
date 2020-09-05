<template>
  <div class="home">
    <el-carousel height="600px" ref="carousel" @click.native="linkTo">
      <el-carousel-item class="carousel-item" v-for="item in picture_list" v-bind:key="item.url">
        <img class="carousel-img" :src="item">
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
  .carousel-item {
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    justify-content: center;
  }
  .carousel-img {
    max-width: 100%;
    max-height: 100%;
    min-height: 100%;
    min-width: 100%;
  }
</style>
