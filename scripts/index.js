class SlideStories {
  constructor(id) {
    this.slide = document.querySelector(`[data-slide="${id}"]`)
    this.ativo = 0
    this.init()
  }
  activeSlide(index) {
    this.ativo = index
    this.items.forEach((item) => item.classList.remove('ativo'))
    this.items[index].classList.add('ativo')
    this.thumbItems.forEach((item) => item.classList.remove('ativo'))
    this.thumbItems[index].classList.add('ativo')
    this.autoSlide()
  }
  prev() {
    if (this.ativo > 0) {
      this.activeSlide(this.ativo - 1)
    } else {
      this.activeSlide(this.items.length - 1)
    }
  }
  next() {
    if (this.ativo < this.items.length - 1) {
      this.activeSlide(this.ativo + 1)
    } else {
      this.activeSlide(0)
    }
  }
  addNavigation() {
    const prevBtn = this.slide.querySelector('.slide-prev')
    prevBtn.addEventListener('click', this.prev)
    const nextBtn = this.slide.querySelector('.slide-next')
    nextBtn.addEventListener('click', this.next)
  }

  addThumbItems() {
    this.items.forEach(() => (this.thumb.innerHTML += `<span></span>`))
    this.thumbItems = Array.from(this.thumb.children) 
  }
  autoSlide() {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(this.next, 5000)
  }

  init() {
    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)
    this.items = this.slide.querySelectorAll('.slide-items > *')
    this.thumb = this.slide.querySelector('.slide-thumb')
    this.addThumbItems()
    this.activeSlide(0)
    this.addNavigation()
  }
}

new SlideStories('slide')
