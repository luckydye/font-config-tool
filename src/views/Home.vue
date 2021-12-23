<template>
  <Header/>
  <Feature/>

  <footer></footer>
</template>

<script>
import Feature from '../components/frontpage/Feature.vue';
import Header from '../components/frontpage/Header.vue';
import '../components/shared/Button';
import '../components/frontpage/HeaderBackground';
import '../components/configurator/ChildSelector';
import '../components/frontpage/SpoilerHint';
import '../components/frontpage/ResponsiveParagraph';
import '../components/frontpage/Slider';

export default {
  name: 'Home',
  components: {
    Header,
    Feature,
  },
};
</script>

<style>
@import "../css/global.css";
@import "../css/fonts.css";

@import "../css/font-combinations/font-combination-1.css";
@import "../css/font-combinations/font-combination-2.css";
@import "../css/font-combinations/font-combination-3.css";
@import "../css/font-combinations/font-combination-4.css";
@import "../css/font-combinations/font-combination-5.css";
@import "../css/font-combinations/font-combination-6.css";
</style>
