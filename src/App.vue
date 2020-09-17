<template>
  <div id="app">
    <div id="login" v-on:mousedown.left="createLoves($event)" v-on:mouseup="removeSmallHert">
      <Banner ref="Banner" class="ban_max"></Banner>
      <vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="star"
        :particleSize="4"
        linesColor="#FFFFFF"
        :linesWidth="2"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"></vue-particles>
    </div>
    <NHeader></NHeader>
    <router-view class="home_sty"></router-view>
    <Footer style="position:relative;"></Footer>
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
    width: auto;
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
     /*min-height: 550px;*/
     position: relative;
   }
  html, body, #app{
    min-height: 100%;
    height: 100%;
  }
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
</style>
