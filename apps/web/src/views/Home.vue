<template>
  <Header/>

  <div class="hello">
    <div class="content app-typography-body">
      <div>
        <h2>Variation</h2>

        <p>
          Variable Fonts are a great tool to bring more variation to fonts <br>without loading
          Megabytes of Font files.
        </p>

        <div class="section-container">
          <br>
          <div class="content-wrapper font-combination-1">
            <h3 description="font: RobotoFlex.ttf">Some Headline</h3>
            <p description="font: RobotoFlex.ttf">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
              eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            </p>
          </div>
          <br>
          <br>
          <br>
          <div class="content-wrapper font-combination-6">
            <h3 description="font: Inter-Variable.ttf">Some Headline</h3>
            <p description="font: Inter-Variable.ttf">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
              sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
              sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            </p>
          </div>
          <br>
          <br>
        </div>
      </div>

      <div class="section-container" style="background: #eee; padding: 80px 0;">
        <h2>Pros and Cons</h2>

        <div class="content-wrapper">
          <h3>Pros</h3>
          <p>
            - A single variable font can be alot smaller and save time,
            compared to thier fixed counter parts and are simpler to implement.
          </p>
          <p>
            - It is possible to animate/transition variable font axes.
          </p>
          <p>
            - They give designers more freedome in thier designs and make it alot simpler
            for developers to implement,because its just a single font file.
          </p>

          <h3>Cons</h3>
          <p>
            - Variable font files are bigger than a single fixed font file.
          </p>
          <p>
            - Animation of variable fonts cause repaints and relayouts.
          </p>
        </div>
        <br>
      </div>

      <router-link to="/examples" >
        <link-button>See some more Examples</link-button>
      </router-link>

    </div>
  </div>

  <footer></footer>
</template>

<script>
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
  },
};
</script>

<style scoped>
iframe {
  border: none;
  width: 100%;
  height: 90vh;
}
</style>
