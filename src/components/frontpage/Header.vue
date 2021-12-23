<template>
  <div class="header">
    <div class="header-container">
      <h1>Variable Fonts</h1>

      <div class="header-wrapper">
        <p>
          Variable Fonts sind linear interpolierbare OpenType Fonts, die aus
          einer einzigen Font File bestehen. Varaible Fonts können Variablen
          definieren (auch Axen genannt) um verschiedene Darstellungen zu
          generieren.
        </p>
      </div>
    </div>

    <div class="header-background">
      <header-background></header-background>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {},
};
</script>

<style scoped>
.header-container {
    max-width: 800px;
    margin: auto;
    min-height: 100px;
    text-align: center;
}

.header {
    padding: 0 20px;
    padding-top: 200px;
    padding-bottom: 200px;
    margin-bottom: 80px;
    overflow: hidden;
    position: relative;
}

.header-wrapper {
  line-height: 1.33em;
}

.header-background {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #eee;
    color: rgba(51, 51, 51, 0.125);
    user-select: none;
    pointer-events: none;
}
</style>
