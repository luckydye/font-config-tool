<template>
  <iframe src="/configurator.html" />
</template>

<script>

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

iframe {
  border: none;
  width: 100%;
  height: calc(100% - 80px);
  position: absolute;
  top: 80px;
  left: 0;
  bottom: 0;
}
</style>
