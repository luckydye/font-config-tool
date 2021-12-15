<template>
  <div class="hello">

    <div class="header">
      <div class="header-container">
        <h1>Variable Fonts</h1>

        <div class="header-wrapper">
          <p>
            Variable Fonts sind linear interpolierbare OpenType Fonts, die aus einer einzigen Font File bestehen. Varaible Fonts können Variablen definieren (auch Axen genannt) um verschiedene Darstellungen zu generieren.
          </p>
        </div>
      </div>

      <div class="header-background">
        <header-background></header-background>
      </div>
    </div>

    <div class="content app-typography-body">
      <div>
        <h2>Variation</h2>

        <div class="section-container">
          <br>
          <div class="content-wrapper font-combination-1">
            <h3 description="font: RobotoFlex.ttf">Some Headline</h3>
            <p description="also font: RobotoFlex.ttf">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. 
            </p>
          </div>
          <br>
          <br>
          <br>
          <br>
          <br>
          <div class="content-wrapper font-combination-6">
            <h3 description="font: Inter.ttf">Some Headline</h3>
            <p description="also font: Inter.ttf">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. 
            </p>
          </div>
        </div>
      </div>
      <div class="section-container">
        <h2>Pros and Cons</h2>

        <div class="content-wrapper">
          <h3>Pros</h3>
          <p>
            A single variable font  <strong>can</strong> be alot smaller and save time, compared to thier fixed counter parts.
          </p>
          <p>
            It is possible to animate/transition variable font axes.
          </p>
          <p>
            They give designers more freedome in thier designs and make it alot simpler for developers to implement, because its just a single font file.
          </p>

          <h3>Cons</h3>
          <p>
            Variable font files are bigger than a single fixed font file.
          </p>
          <p>
            Animation of variable fonts cause repaints and relayouts.
          </p>
        </div>
      </div>
      
      <div class="section-container">
        <h2>Animations</h2>

        <h3>Bad Animations:</h3>
        <spoiler-hint>
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
        </spoiler-hint>

        <br>
        <br>

        <h3>Good Animations:</h3>

        <div class="content-wrapper">
          <p>Minimum frame animations for slide-in/slide-out aniamtions etc. Dont run continues animations while the user interacts with the page.</p>
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

          <div description="Procedually thicker font on smaller screens">
            <r-p>Responsive font size / redability</r-p>
          </div>

        </div>
      </div>

      <div>
        <h2>Support</h2>

        <div class="content-wrapper">
          <a target="_blank" href="https://caniuse.com/variable-fonts">
            <img src="/support_table.png"/>
          </a>
        </div>

        <br>
        <br>
        <br>

        <p>Aber mangelhafter support von Design Tools.</p>

        <br>
        <br>
        <br>
      </div>

      <div>
        <h2>Resources</h2>

        <div>
          <a target="_blank" description="Browse and try many variable fonts" href="https://v-fonts.com/">https://v-fonts.com/</a><br><br>
          <a target="_blank" description-alt="Deeper Introduction"  href="https://web.dev/variable-fonts/">https://web.dev/variable-fonts/</a>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Feature',
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

link-button {
  font-family: Inter;
  font-variation-settings: 'wght' 300;
  letter-spacing: 0.055em;
  transition: font-variation-settings .2s ease-out, letter-spacing .2s ease-out;
}
link-button:hover {
  font-variation-settings: 'wght' 600;
  letter-spacing: 0.05em;
  color: #333;
}

</style>
