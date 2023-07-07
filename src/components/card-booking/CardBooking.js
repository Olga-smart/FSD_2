import Input from '../input/Input';

class CardBooking {
  constructor(component) {
    this._initFields(component);
    this._attachEventHandlers();
  }

  _initFields(component) {
    this._component = component;

    this._inputArrivalAPI = new Input(component.querySelector('.js-card-booking__arrival'));
    this._inputDepartureAPI = new Input(component.querySelector('.js-card-booking__departure'));
    this._dateArrival = undefined;
    this._dateDeparture = undefined;

    this._daysNumElement = component.querySelector('.js-card-booking__days');
    this._daysWordElement = component.querySelector('.js-card-booking__days-word');
    this._days = Number(this._daysNumElement.textContent);

    this._priceElement = component.querySelector('.js-card-booking__price');
    this._price = Number(this._extractNumbers(this._priceElement.textContent));
    this._priceForXDays = component.querySelector('.js-card-booking__price-for-x-days');

    this._serviceFeeElement = component.querySelector('.js-card-booking__service-fee');
    this._serviceFee = Number(this._extractNumbers(this._serviceFeeElement.textContent));

    this._discountElement = component.querySelector('.js-card-booking__discount');
    this._discount = Number(this._extractNumbers(this._discountElement.textContent));

    this._additionalServiceFeeElement = component.querySelector('.js-card-booking__additional-service-fee');
    this._additionalServiceFee = Number(this
      ._extractNumbers(this._additionalServiceFeeElement.textContent));

    this._totalElement = component.querySelector('.js-card-booking__total');

    this._infoIcons = component.querySelectorAll('.js-card-booking__info-icon');
  }

  _attachEventHandlers() {
    [...this._infoIcons].forEach((icon) => {
      icon.addEventListener('mouseover', this._handleInfoIconMouseover);
    });

    this._inputArrivalAPI.onChange = () => {
      this._handleDateChange();
    };

    this._inputDepartureAPI.onChange = () => {
      this._handleDateChange();
    };
  }

  _prettifyPrice(num) {
    const n = num.toString();
    return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1 ');
  }

  _extractNumbers(string) {
    return string.replace(/\D+/g, '');
  }

  _handleInfoIconMouseover(event) {
    const { target } = event;

    const tooltip = document.createElement('div');
    tooltip.className = 'card-booking__tooltip';
    tooltip.innerHTML = target.dataset.tooltip;
    document.body.append(tooltip);

    const coords = target.getBoundingClientRect();
    tooltip.style.left = `${coords.left - tooltip.offsetWidth - 5}px`;
    tooltip.style.top = `${coords.top}px`;

    const handleInfoIconMouseout = () => {
      if (tooltip) {
        tooltip.remove();
      }
      target.removeEventListener('mouseout', handleInfoIconMouseout);
    };

    target.addEventListener('mouseout', handleInfoIconMouseout);
  }

  _handleDateChange() {
    const [arrivalDay, arrivalMonth, arrivalYear] = this._inputArrivalAPI.getValue().split('.');
    this._dateArrival = Date.parse(`${arrivalYear}-${arrivalMonth}-${arrivalDay}`);

    const [departureDay, departureMonth, departureYear] = this._inputDepartureAPI.getValue().split('.');
    this._dateDeparture = Date.parse(`${departureYear}-${departureMonth}-${departureDay}`);

    this._updateDaysNum();
    this._updateDaysWord(this._days);
    this._updatePriceForXDays();
    this._updateTotal();
  }

  _updateDaysNum() {
    this._days = Math.floor((this._dateDeparture - this._dateArrival) / (1000 * 3600 * 24));
    this._daysNumElement.textContent = this._days;
  }

  _updateDaysWord() {
    if ([1, 21, 31, 41, 51, 61, 71, 81, 91].includes(this._days)) {
      this._daysWordElement.textContent = ' сутки';
    } else {
      this._daysWordElement.textContent = ' суток';
    }
  }

  _updatePriceForXDays() {
    this._priceForXDays.textContent = `${this._prettifyPrice(this._price * this._days)}₽`;
  }

  _updateTotal() {
    if (this._days === 0) {
      this._totalElement.textContent = '0₽';
    } else {
      this._totalElement.textContent = `${this._prettifyPrice(this._price * this._days + this._serviceFee - this._discount + this._additionalServiceFee)}₽`;
    }
  }
}

export default CardBooking;
