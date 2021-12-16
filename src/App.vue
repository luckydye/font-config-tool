<template>
  <Header/>
  <Feature/>

  <footer>
    
  </footer>
</template>

<script>
import Feature from './components/Feature.vue';
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
    Feature
  }
}
</script>

<style>
@import "./css/global.css";
@import "./css/fonts.css";

@import "./css/font-combinations/font-combination-1.css";
@import "./css/font-combinations/font-combination-2.css";
@import "./css/font-combinations/font-combination-3.css";
@import "./css/font-combinations/font-combination-4.css";
@import "./css/font-combinations/font-combination-5.css";
@import "./css/font-combinations/font-combination-6.css";
</style>
