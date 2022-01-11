<template>
  <Header/>
  <Feature/>

  <footer></footer>
</template>

<script>
import Feature from '../components/Feature.vue';
import Header from '../components/Header.vue';
import 'ui/components/Button';
import '../components/HeaderBackground';
import 'ui/components/ChildSelector';
import '../components/SpoilerHint';
import '../components/ResponsiveParagraph';

export default {
  name: 'Home',
  components: {
    Header,
    Feature,
  },
};
</script>
