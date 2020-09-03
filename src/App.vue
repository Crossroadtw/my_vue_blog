<template>
  <div id="app">
    <div id="login" v-on:mousedown.left="createLoves($event)" v-on:mouseup="removeSmallHert">
      <Banner ref="Banner"></Banner>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>import Banner from '@/components/Banner'
export default {
  name: 'app',
  components: {
    Banner
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
  .app {
    position: fixed;
  }
  #login{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
