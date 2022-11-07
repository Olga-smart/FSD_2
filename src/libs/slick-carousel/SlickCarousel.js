import 'slick-carousel/slick/slick.min';

class SlickCarousel {
  constructor(selector) {
    this._selector = selector;
    this.initPlugin();
  }

  static init(selector) {
    const component = new SlickCarousel(selector);
    return component;
  }

  initPlugin() {
    $(this._selector).slick({
      dots: true,
    });
  }
}

export default SlickCarousel;
