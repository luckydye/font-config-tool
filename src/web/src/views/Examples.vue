<template>
  <div class="header-spacer"></div>

  <div class="section-container">
    <h2>Animations</h2>

    <h3>Bad Animations:</h3>
    <div class="content-wrapper content-centered">
      <div description="big and continues animation"
          description-alt="causees layout shifts = bad perforamnce"
        class="app-typography-headline-2 app-typography-special-animation">
        Special Aniamtion
      </div>

      <br />
      <br />

      <h1 class="app-typography-headline-breathing"
          description-alt="Transitioning between two weights">

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

    <h3>Good Animations:</h3>

    <div class="content-wrapper">
      <p>Minimum frame animations for slide-in/slide-out aniamtions etc.
        Dont run continues animations while the user interacts with the page.</p>
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

      <div description="Smooth weight transition on hover">
        <link-button>Test Button</link-button>
      </div>

      <br>
      <br>
      <br>
      <br>

      <div description="Procedually thicker font">
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
  font-family: RobotoFlex;
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
  font-family: RobotoFlex, serif;
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
