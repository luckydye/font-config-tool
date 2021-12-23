<template>
  <div class="header-spacer"></div>

  <div class="document">
    <app-state>
      <text-editor></text-editor>
    </app-state>
  </div>
</template>

<script>
import '../components/shared/Button';

import '../components/configurator/Text';
import '../components/configurator/AppState';
// import "../components/configurator/ChildSelector";

// Components:
// - a renderer that convert my custo mconfigurations into styles
// - a state manager that own all the state to easily serialize it

export default {
  name: 'App',
  components: {},
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
