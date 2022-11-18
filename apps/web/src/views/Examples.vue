<template>
  <div class="header-spacer"></div>

  <div class="section-container">
    <h2>Animations</h2>
    <br />

    <div class="columns">
      <div>
        <div class="content-wrapper content-centered">
          <div
            class="app-typography-headline-2 app-typography-special-animation"
          >
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

        <br />
        <br />
      </div>

      <div class="backdrop">
        <br />
        <p>
          Big and continues animations cause continues layoutshift.
          <br />
          They are not good for performance and drain battery faster.
        </p>
        <br />
        <br />

        <p>
          Preferably use minimal frame animations for slide-in/slide-out
          aniamtions etc. Running continues animations while the user interacts
          with the page may cause a worse user experience especially on mobile.
        </p>
      </div>
    </div>
  </div>

  <div class="section-container">
    <h2>File Sizes</h2>
    <br />

    <div class="columns">
      <div>
        <br />
        <p>
          By using a variable font, a website will load fonts faster, since they
          can be smaller.
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
          <br />
          <br />
        </p>
        <pre>
Inter-VariableFont_slnt,wght.ttf (803 KB)
<br><br>
                                  (803 KB)
        </pre>
        <br />
        <br />
      </div>
    </div>
  </div>

  <div class="section-container">
    <h2>Example Use-Cases</h2>
    <br />

    <div class="content-centered">
      <h1
        class="app-typography-hover"
        description-alt="Transition to Bold + slant on hover"
      >
        Testing typo hover effect
      </h1>

      <br />
      <br />
      <br />

      <div description="Smooth selection target highlight">
        <child-selector>
          <span active>Item 1</span>
          <span>Item 2</span>
          <span>Item 3</span>
          <span>Item 4</span>
        </child-selector>
      </div>

      <br />
      <br />
      <br />
      <br />

      <div description="Font gets thicker on smaller screens.">
        <r-p>Responsive font size for redability on small devices.</r-p>
      </div>

      <br />
      <br />
      <br />
      <br />

      <p>Slider Caption animation.</p>

      <sample-sldier>
        <slide>
          <img src="/images/_MG_0240.jpg" />
          <div class="caption">London Tube</div>
        </slide>
        <slide>
          <img src="/images/_MG_0132.jpg" />
          <div class="caption">At vero eos</div>
        </slide>
        <slide>
          <img src="/images/_MG_0439.jpg" />
          <div class="caption">Stet clita kasd</div>
        </slide>
      </sample-sldier>

      <br />
      <br />
      <br />
      <br />

      <p>Heavy Fonts. (All included within this variable font.)</p>

      <div style="position: relative">
        <span class="floating-text type1">Light Font</span>
        <span class="floating-text type2">Regular Sized Font</span>
        <span class="floating-text type3">Bold Font</span>
        <span class="floating-text type4">Extra Bold Font</span>
        <span class="floating-text type5">THE BOLDEST</span>
        <br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br />
      </div>

      <br />
      <br />
      <br />
      <br />
    </div>
  </div>

  <div class="section-container">
    <h2>Code Samples</h2>
    <br />

    <div class="backdrop">
      <p>CSS for Variable Font Axes:</p>
      <br />
      <p
        class="codepen"
        data-height="400"
        data-theme-id="light"
        data-default-tab="css,result"
        data-slug-hash="BawPBWo"
        data-editable="true"
        data-user="luckydye"
      >
        <span
          >See the Pen
          <a href="https://codepen.io/luckydye/pen/BawPBWo"> Untitled</a> by
          luckydye (<a href="https://codepen.io/luckydye">@luckydye</a>) on
          <a href="https://codepen.io">CodePen</a>.</span
        >
      </p>

      <br />
      <br />

      <p>Using CSS variables for ease of use:</p>
      <br />

      <p
        class="codepen"
        data-height="400"
        data-theme-id="light"
        data-default-tab="css,result"
        data-slug-hash="XWeBrPP"
        data-editable="true"
        data-user="luckydye"
      >
        <span
          >See the Pen
          <a href="https://codepen.io/luckydye/pen/XWeBrPP"> Untitled</a> by
          luckydye (<a href="https://codepen.io/luckydye">@luckydye</a>) on
          <a href="https://codepen.io">CodePen</a>.</span
        >
      </p>

      <br />
      <br />
      <br />
      <br />

      <p>Per Character animations</p>

      <p
        class="codepen"
        data-height="500"
        data-theme-id="light"
        data-default-tab="css,result"
        data-slug-hash="KKXBpev"
        data-editable="true"
        data-user="luckydye"
      >
        <span
          >See the Pen
          <a href="https://codepen.io/luckydye/pen/KKXBpev"> Untitled</a> by
          luckydye (<a href="https://codepen.io/luckydye">@luckydye</a>) on
          <a href="https://codepen.io">CodePen</a>.</span
        >
      </p>

      <br />
      <br />
      <br />
      <br />

      <p
        class="codepen"
        data-height="300"
        data-theme-id="light"
        data-default-tab="html,result"
        data-slug-hash="WNZYjLN"
        data-editable="true"
        data-user="LUCKYTH">
        <span
          >See the Pen
          <a href="https://codepen.io/LUCKYTH/pen/WNZYjLN"> Rolling Text 2</a>
          by Tim (<a href="https://codepen.io/LUCKYTH">@LUCKYTH</a>) on
          <a href="https://codepen.io">CodePen</a>.</span
        >
      </p>

      <br />
      <br />
      <br />
      <br />

      <p>Weight animation + 3D transform</p>

      <p
        class="codepen"
        data-height="600"
        data-theme-id="light"
        data-default-tab="css,result"
        data-slug-hash="QWqBjMx"
        data-editable="true"
        data-user="luckydye"
      >
        <span
          >See the Pen
          <a href="https://codepen.io/luckydye/pen/QWqBjMx"> Untitled</a> by
          luckydye (<a href="https://codepen.io/luckydye">@luckydye</a>) on
          <a href="https://codepen.io">CodePen</a>.</span
        >
      </p>
    </div>
  </div>

  <footer></footer>
</template>

<script>
import '../components/HeaderBackground';
import '../components/SpoilerHint';
import '../components/ResponsiveParagraph';
import 'ui/components/Slider';

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

.floating-text {
  position: absolute;
  font-family: Roboto Flex, serif;
}
.floating-text.type1 {
  top: 140px;
  left: calc(50% - 400px);
  font-size: 100px;
  font-variation-settings: "wght" 100;
}
.floating-text.type2 {
  top: 108px;
  left: calc(50% - 380px);
  font-size: 42px;
  font-variation-settings: "wght" 400;
}
.floating-text.type3 {
  top: 90px;
  left: calc(50% - 10px);
  font-size: 152px;
  font-variation-settings: "wght" 600;
}
.floating-text.type4 {
  top: 0;
  left: calc(50% - 273px);
  font-size: 100px;
  font-variation-settings: "wght" 800;
}
.floating-text.type5 {
  top: 230px;
  left: calc(50% - 603px);
  font-size: 190px;
  font-variation-settings: "wght" 1000;
}

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
  font-variation-settings: "wght" 500, "slnt" 0;
  transition: font-variation-settings 0.125s ease-out,
    letter-spacing 0.125s ease-out;
  letter-spacing: 0.04em;
}

.app-typography-hover:hover {
  font-variation-settings: "wght" 800, "slnt" -4;
  letter-spacing: 0.032em;
}

child-selector span {
  font-size: 22px;
  display: inline-block;
  margin: 0 2px;
  cursor: pointer;
  transition: font-variation-settings 0.15s ease;
  font-family: Roboto Flex;
  font-variation-settings: "wght" 300, "wdth" 20;
  opacity: 0.5;
  width: 80px;
}
child-selector span:hover {
  opacity: 1;
}
child-selector span[active] {
  font-variation-settings: "wght" 800, "wdth" 100;
  opacity: 1;
}

sample-sldier {
  overflow: hidden;
}

slide {
  min-width: 100%;
  height: 500px;
  display: block;
  font-size: 28px;
  transition: opacity 0.2s ease 0.1s;
  position: relative;
}

slide:not([active]) {
  opacity: 1;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.caption {
  mix-blend-mode: difference;
  text-shadow: 1px 2px 24px rgb(0 0 0 / 90%);
  position: absolute;
  left: calc(50% - 500px);
  bottom: 20px;
  color: #eee;
  margin: 40px 0;
  font-family: Roboto Flex, serif;
  font-size: 100px;
  transition: opacity 1s ease 0.3s, transform 1.5s ease 0.3s,
    font-variation-settings 1.5s ease-out;
  font-variation-settings: "wght" 300;
  transform-origin: 0 0;
  transform: perspective(50vw) translate(calc(-1 * 20px), 0) scale(1);
  opacity: 0;
}

slide[active] .caption {
  transform: perspective(50vw) translate(0px, 0) scale(1);
  opacity: 1;
  font-variation-settings: "wght" 600;
}

/* [transitioning] slide {
  animation: slide 2s ease both;
}

@keyframes slide {
  0% {
    --weight: 200;
  }
  100% {
    --weight: 600;
  }
} */

.codepen {
  height: 300px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid;
  margin: 1em 0;
  padding: 1em;
}
</style>
