let articles = document.querySelectorAll(".article");

articles.forEach(i => {
  i.addEventListener(
    "mousemove",
    e => {
      let mouseX = e.offsetX;
      let mouseY = e.offsetY;
      i.querySelector(".overlay")
        .style.setProperty(
        "background-image",
        `radial-gradient(circle at ${(mouseX) * 100  / -i.offsetWidth+100}% ${(mouseY) * 100  / -i.offsetHeight+100}%,rgba(0,0,0,0.2) 25%,rgba(0,0,0,0.33) 50%)`
      );
      i.style.setProperty("transform", `rotateY(${  ( ( (mouseX*100) / i.offsetWidth - 50 ) / 100) * 2}deg) rotateX(${  ( ( (mouseY*100) / i.offsetHeight - 50 ) / 100) * 2}deg) `
)
    },
    false
  );
  i.addEventListener("mouseleave",()=>{
    i.style.setProperty("transform",`rotateX(0deg) rotateY(0deg)`);
    
          i.querySelector(".overlay")
        .style.setProperty(
        "background-image",
        `radial-gradient(circle at 50% 50%,rgba(0,0,0,0.2) 20%,rgba(0,0,0,0.3) 50%)`
      );
  })
});

// Trying Behaviour Delegation instead of "JS classes"

const ANIMATING_CLASS = 'slider__item--animating';

const Slider = {
  init() {
    this.sliderEl = document.querySelector('.slider');
    this.slideInnerEl = document.querySelector('.slider__inner');
    this.sliderItemsEl = document.querySelectorAll('.slider__item');
    this.offset = 0;
    this.direction = 'left';
    this.maxOffset = (this.sliderItemsEl.length - 1) * 100;

    this.slideInnerEl.addEventListener('transitionend', this.onSliderTransitionEnd.bind(this));
    setInterval(this.slide.bind(this), 3000);
  },
  slide() {
    if (this.isMaxLeft()) {
      this.direction = 'right';
    } else if (this.isMaxRight()) {
      this.direction = 'left';
    }

    this.moveSlider();
  },
  isMaxLeft() {
    return this.offset <= -this.maxOffset;
  },
  isMaxRight() {
    return this.offset >= 0;
  },
  getCurrentPage() {
    if (this.offset < 0) {
      return (this.offset * -1) / 100;
    }

    return this.offset / 100;
  },
  getSignal() {
    return this.direction === 'left' ? -1 : 1;
  },
  onSliderTransitionEnd() {
    const signal = this.getSignal();
    const currentPage = this.getCurrentPage();

    this.sliderItemsEl.forEach(element => element.classList.remove(ANIMATING_CLASS));
  },
  moveSlider() {
    const signal = this.getSignal();
    const currentPage = this.getCurrentPage();

    this.offset = this.offset + (signal * 100);
    this.sliderItemsEl[currentPage].classList.add(ANIMATING_CLASS);
    this.sliderItemsEl[currentPage + (-1 * signal)].classList.add(ANIMATING_CLASS);
    this.slideInnerEl.style.setProperty('--slider-offset', `${this.offset}%`);
  }
};

const slider = Object.create(Slider);
slider.init();


