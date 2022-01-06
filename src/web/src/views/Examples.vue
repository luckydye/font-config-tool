<template>
  <div class="header-spacer"></div>

  <div class="section-container">
    <h2>Animations</h2>
    <br>

    <div class="columns">

      <div>
        <h3>Bad Animations:</h3>
        <div class="content-wrapper content-centered">
          <div class="app-typography-headline-2 app-typography-special-animation">
            Special Aniamtion
          </div>

          <br />
          <br />

          <h1 class="app-typography-headline-breathing">

            <span style="animation-delay: 0s">B</span>
            <span style="animation-delay: 0.1s">r</span>
            <span style="animation-delay: 0.2s">e</span>
            <span style="animation-delay: 0.3s">a</span>
            <span style="animation-delay: 0.4s">t</span>
            <span style="animation-delay: 0.5s">h</span>
            <span style="animation-delay: 0.6s">i</span>
            <span style="animation-delay: 0.7s">n</span>
            <span style="animation-delay: 0.8s">g</span>
          </h1>
        </div>

        <br>
        <br>

      </div>

      <div class="backdrop">
        <br>
        <br>
        <br>
        <p>
          Big and continues animations cause continues layoutshift.
          They are not good for performance and drain battery faster.
        </p>
        <br>
        <br>

        <p>
          Preferably use minimal frame animations for slide-in/slide-out aniamtions etc.
          Running continues animations while the user interacts with the page may cause a
          worse user experience especially on mobile.
        </p>

      </div>

    </div>

  </div>

  <div class="section-container">
    <h2>File Sizes</h2>
    <br>

    <div class="columns">

      <div>
        <br>
        <p>
          By using a variable font, a website will load fonts faster, since they can be smaller.
        </p>

        <pre>
            Inter-Regular.ttf               (293 KB)
            Inter-Light.ttf                 (288 KB)
            Inter-Bold.ttf                  (293 KB)
            Inter-SemiBold.ttf              (293 KB)

                                            (1,2 MB)
        </pre>
      </div>

      <div class="backdrop content-centered">
        <p>
          The variable fonts contains all of the static varaitions in one file.
          <br>
          <br>
        </p>
        <pre>
Inter-VariableFont_slnt,wght.ttf (803 KB)
<br><br>
                                  (803 KB)
        </pre>
        <br>
        <br>
      </div>

    </div>

  </div>

  <div class="section-container">
    <h2>Example Use-Cases</h2>
    <br />

    <div class="content-wrapper content-centered">
      <h1 class="app-typography-hover"
        description-alt="Transition to Bold + slant on hover">
        Testing typo hover effect
      </h1>

      <br>
      <br>
      <br>

      <div description="Smooth selection target highlight">
        <child-selector>
          <span active>Item 1</span>
          <span>Item 2</span>
          <span>Item 3</span>
          <span>Item 4</span>
        </child-selector>
      </div>

      <br>
      <br>
      <br>
      <br>

      <div description="Font gets thicker on smaller screens.">
        <r-p>Responsive font size for redability on small devices.</r-p>
      </div>

      <br>
      <br>
      <br>
      <br>

      <div description="Slide animation"></div>

      <sample-sldier>
        <slide>
          <div class="slide">Lorem ipsum</div>
        </slide>
        <slide>
          <div class="slide">At vero eos</div>
        </slide>
        <slide>
          <div class="slide">Stet clita kasd </div>
        </slide>
      </sample-sldier>

    </div>
  </div>

  <footer></footer>
</template>

<script>
import '../components/HeaderBackground';
import '../components/SpoilerHint';
import '../components/ResponsiveParagraph';
import '../components/Slider';

export default {
  name: 'Examples',
  components: {
  },
};
</script>

<style>
@import "../css/font-combinations/font-combination-1.css";
@import "../css/font-combinations/font-combination-2.css";
@import "../css/font-combinations/font-combination-3.css";
@import "../css/font-combinations/font-combination-4.css";
@import "../css/font-combinations/font-combination-5.css";
@import "../css/font-combinations/font-combination-6.css";

.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 80px;
  max-width: 1200px;
  margin: auto;
  text-align: left;
}

.backdrop {
  background: #eee;
  padding: 20px;
  border-radius: 3px;
}

.app-typography-hover {
    font-size: 18px;
    text-transform: uppercase;
    cursor: pointer;
    font-variation-settings: 'wght' 500, 'slnt' 0;
    transition: font-variation-settings .125s ease-out, letter-spacing .125s ease-out;
    letter-spacing: 0.04em;
}

.app-typography-hover:hover {
    font-variation-settings: 'wght' 800, 'slnt' -4;
    letter-spacing: 0.032em;
}

child-selector span {
  font-size: 22px;
  display: inline-block;
  margin: 0 2px;
  cursor: pointer;
  transition: font-variation-settings .15s ease;
  font-family: Roboto Flex;
  font-variation-settings: 'wght' 300, 'wdth' 20;
  opacity: 0.5;
  width: 80px;
}
child-selector span:hover {
  opacity: 1;
}
child-selector span[active] {
  font-variation-settings: 'wght' 800, 'wdth' 100;
  opacity: 1;
}

slide {
  min-width: 100%;
  display: block;
  font-size: 28px;
  transition: opacity .2s ease .1s;
}

slide:not([active]) {
  opacity: 0;
  pointer-events: none;
  transition: opacity .2s ease;
}

.slide {
  margin: 40px 0;
  font-family: Roboto Flex, serif;
  font-variation-settings: "wght" 200, "slnt" -1;
  transition: font-variation-settings .1s ease .15s, letter-spacing .1s ease-out;
  letter-spacing: 0.1em;
}

[transitioning] slide {
  animation: slide .3s ease;
}

@keyframes slide {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.69);
  }
  100% {
    transform: scale(1);
  }
}

slide[active] .slide {
  font-variation-settings: "wght" 600, "slnt" 0;
  letter-spacing: 0.01em;
}
</style>
