import 'slick-carousel/slick/slick.min';

class SlickCarousel {
  constructor(element) {
    this._element = element;
    this.initPlugin();
  }

  initPlugin() {
    $(this._element).slick({
      dots: true,
    });
  }
}

export default SlickCarousel;
