<template>
  <div id="app">
    <div id="login" v-on:mousedown.left="createLoves($event)" v-on:mouseup="removeSmallHert">
      <Banner ref="Banner" class="ban_max"></Banner>
    </div>
    <Header></Header>
    <router-view class="home_sty"></router-view>
    <Footer style="position:relative;"></Footer>
  </div>
</template>
<script>
import Banner from '@/components/Banner'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'app',
  components: {
    Banner,
    Header,
    Footer
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
    height: 100%;
  }
   .home_sty {
     width: auto;
     height: auto;
     max-width: 100%;
     max-height: 100%;
     min-height: 550px;
     position: relative;
   }
</style>
