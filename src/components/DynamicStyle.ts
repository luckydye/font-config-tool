
export default class DynamicStyles {

  static viewportScale = 900;
  static element = document.createElement('style');

  static init() {
    window.addEventListener('resize', () => {
      this.viewportScale = window.innerWidth;
      this.update();
    });

    this.viewportScale = window.innerWidth;

    document.head.append(this.element);
    this.update();
  }

  static update() {
    this.element.innerHTML = `
      :root {
        --viewport-scale: ${this.viewportScale};
      }
    `;
  }
}
