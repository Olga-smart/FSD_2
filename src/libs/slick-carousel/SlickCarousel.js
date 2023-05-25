import 'slick-carousel/slick/slick.min';

class SlickCarousel {
  constructor(element) {
    this._element = element;
    this.initPlugin();
  }

  static init(element) {
    const component = new SlickCarousel(element);
    return component;
  }

  initPlugin() {
    $(this._element).slick({
      dots: true,
    });
  }
}

export default SlickCarousel;
