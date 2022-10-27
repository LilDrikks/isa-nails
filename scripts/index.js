class SlideStories {
  constructor(id) {
    this.slide = document.querySelector(`[data-slide="${id}"]`);
    this.ativo = 0;
    this.init();
  }
  activeSlide(index) {
    this.ativo = index;
    this.items.forEach((item) => item.classList.remove("ativo"));
    this.items[index].classList.add("ativo");
    this.thumbItems.forEach((item) => item.classList.remove("ativo"));
    this.thumbItems[index].classList.add("ativo");
    this.autoSlide();
  }
  prev() {
    if (this.ativo > 0) {
      this.activeSlide(this.ativo - 1);
    } else {
      this.activeSlide(this.items.length - 1);
    }
  }
  next() {
    if (this.ativo < this.items.length - 1) {
      this.activeSlide(this.ativo + 1);
    } else {
      this.activeSlide(0);
    }
  }
  addNavigation() {
    const prevBtn = this.slide.querySelector(".slide-prev");
    prevBtn.addEventListener("click", this.prev);
    const nextBtn = this.slide.querySelector(".slide-next");
    nextBtn.addEventListener("click", this.next);
  }

  addThumbItems() {
    this.items.forEach(() => (this.thumb.innerHTML += `<span></span>`));
    this.thumbItems = Array.from(this.thumb.children);
  }
  autoSlide() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.next, 5000);
  }

  init() {
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.items = this.slide.querySelectorAll(".slide-items > *");
    this.thumb = this.slide.querySelector(".slide-thumb");
    this.addThumbItems();
    this.activeSlide(0);
    this.addNavigation();
  }
}

new SlideStories("slide");

const menuItems = document.querySelectorAll('nav a[href^="#"]');

menuItems.forEach((item) => item.addEventListener("click", scrollToIdOnClick));

function scrollToIdOnClick(e) {
  e.preventDefault();
  const to = getScrollTop(e.target);
  scrolToPosition(to);
}

function scrolToPosition(to) {
  // window.scroll({
  //   top: to,
  //   behavior: "smooth",
  // });
  
  smoothScrollTo(0, to, 1500)
}

function getScrollTop(element) {
  const id = element.getAttribute("href");
  return document.querySelector(id).offsetTop;
}

/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int} endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
 function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 400;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
};