<template>
  <div id="nav">
    <div class="nav-item">
      <router-link to="/">Overview</router-link>
    </div>
    <div class="nav-item">
      <router-link to="/examples">Examples</router-link>
    </div>
    <div class="nav-item">
      <router-link to="/resources">Resources</router-link>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "../css/global.css";
@import "../css/fonts.css";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.header-spacer {
  padding-top: 80px;
}

#nav {
  padding: 30px;
  position: absolute;
  z-index: 10000;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;

  .nav-item {
    margin: 0 25px;
  }

  a {
    display: block;
    font-weight: normal;
    color: #2c3e50;
    text-decoration: none;
    transition: all .25s ease;
    opacity: 0.5;
    user-select: none;

    &:hover {
      opacity: 1;
    }
    &:active {
      transition-duration: 0s;
      transform: scale(0.975);
    }

    &.router-link-active {
      opacity: 1;
    }

    &.router-link-exact-active {
      color: #EEAA43;
    }
  }
}
</style>
