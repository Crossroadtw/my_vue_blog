<template>
<!--  <div class="home">-->
  <div class="home" :style="leftBg">
    <Header></Header>
    <router-view class="home_sty"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'home',
  data () {
    return {
      leftBg: {
        // background: '#235d8b url(' + 'http://192.168.10.32/static/jkdbn/title/5ef1994a09e2e.jpg' + ') no-repeat scroll 0 bottom',
        background: '#235d8b url(' + require('../assets/image/1.jpg') + ')',
        backgroundSize: '100% 100%'
      }
    }
  },
  components: {
    Header,
    Footer
  }
}
</script>
<style>
  .home_sty {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
</style>
