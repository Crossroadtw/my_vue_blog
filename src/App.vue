<template>
  <div id="app" v-on:mousedown.left="createLoves($event)" v-on:mouseup="removeSmallHert">
    <Banner ref="Banner" class="ban_max"></Banner>
    <div id="login">
      <vue-particles
        color="#eeb9c4"
        :particleOpacity="0.7"
        :particlesNumber="100"
        shapeType="star"
        :particleSize="4"
        linesColor="#f3e174"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="false"
        :clickEffect="false"></vue-particles>
    </div>
    <NHeader></NHeader>
    <router-view class="home_sty"></router-view>
    <Footer></Footer>
  </div>
</template>
<script>
import Banner from '@/components/Banner'
import Footer from '@/components/Footer'
import NHeader from '@/components/New_banner'
export default {
  name: 'app',
  components: {
    Banner,
    Footer,
    NHeader
  },
  methods: {
    createLoves () {
      this.$refs.Banner.createLoves(event)
    },
    removeSmallHert () {
      this.$refs.Banner.removeSmallHert()
    }
  }
}
</script>
<style>
  .ban_max {
    /*width: auto;*/
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
  }
  #login{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
  }
   .home_sty {
     width: auto;
     height: auto;
     max-width: 100%;
     min-height: 100%;
     /*position: relative;*/
   }
  html, body, #app{
    min-height: 100%;
    height: 100%;
    /*background: linear-gradient(#eeb9c4, #f3e174);*/
  }
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
</style>
