export default class Rotate {
  constructor(container) {
    this.container = container;
    this.rotateZ = 0;
    this.autoRotate = true;
    this.dragging = false;
    this.rotate = this.rotate.bind(this);
    this.initEvent();
    this.startX = 0;
    this.startY = 0;
  }

  initEvent() {
    this.container.addEventListener('mouseover', () => {
      this.autoRotate = false;
    });
    this.container.addEventListener('mouseout', () => {
      this.autoRotate = true;
    });

    this.container.addEventListener('mousedown', (ev) => {
      this.dragging = true;
      this.startX = ev.pageX;
      this.startY = ev.pageY;
      this.startRotate = this.rotateZ;
    });
    window.addEventListener('mousemove', (ev) => {
      if (this.dragging) {
        this.rotateZ = this.startRotate + (this.startX - ev.pageX) / 3;
      }
    });
    window.addEventListener('mouseup', (ev) => {
      this.dragging = false;
    });
  }

  rotate() {
    if (this.autoRotate && !this.dragging) {
      this.rotateZ += 0.5;
    }
    this.container.style.transform = `rotateX(79deg) rotateZ(${this.rotateZ}deg)`;
    this.raf = requestAnimationFrame(this.rotate);
  }

  destroy() {
    this.raf && cancelAnimationFrame(this.raf);
  }
}
