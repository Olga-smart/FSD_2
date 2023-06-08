import 'ion-rangeslider';

class IonRangeSlider {
  constructor(input, output) {
    this._input = $(input);
    this._output = output;

    this.initPlugin();
  }

  initPlugin() {
    const output = this._output;

    this._input.ionRangeSlider({
      skin: 'round',
      type: 'double',
      hide_min_max: true,
      hide_from_to: true,
      onStart(data) {
        output.textContent = `${data.from_pretty}₽ - ${data.to_pretty}₽`;
      },
      onChange(data) {
        output.textContent = `${data.from_pretty}₽ - ${data.to_pretty}₽`;
      },
    });
  }
}

export default IonRangeSlider;
