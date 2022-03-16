import './card-booking.scss';
import '../input/input';
import '../button/button';
import '../datepicker/datepicker';
import '../dropdown/dropdown';

class CardBooking {
  constructor(component) {
    this._initFields(component);
    this._attachEventHandlers();
  }

  static init(elements) {
    const arr = [];

    Array.from(elements).forEach((element) => {
      arr.push(new CardBooking(element));
    });

    return arr;
  }

  _initFields(component) {
    this._component = component;

    this._inputArrival = component.querySelector('.js-card-booking__arrival');
    this._inputDeparture = component.querySelector('.js-card-booking__departure');
    this._dateArrival = undefined;
    this._dateDeparture = undefined;

    this._daysNumElement = component.querySelector('.js-card-booking__days');
    this._daysWordElement = component.querySelector('.js-card-booking__days-word');
    this._days = +this._daysNumElement.textContent;

    this._priceElement = component.querySelector('.js-card-booking__price');
    this._price = +CardBooking._extractNumbers(this._priceElement.textContent);
    this._priceForXDays = component.querySelector('.js-card-booking__price-for-x-days');

    this._serviceFeeElement = component.querySelector('.js-card-booking__discount');
    this._serviceFee = +CardBooking._extractNumbers(this._serviceFeeElement.textContent);

    this._discountElement = component.querySelector('.js-card-booking__discount');
    this._discount = +CardBooking._extractNumbers(this._discountElement.textContent);

    this._additionalServiceFeeElement = component.querySelector('.js-card-booking__additional-service-fee');
    this._additionalServiceFee = +CardBooking
      ._extractNumbers(this._additionalServiceFeeElement.textContent);

    this._totalElement = component.querySelector('.js-card-booking__total');

    this._infoIcons = component.querySelectorAll('.js-card-booking__info-icon');

    $(this._inputArrival).datepicker({
      onSelect: (fd, d) => {
        $(this._inputArrival).val(fd.split(' - ')[0]);
        $(this._inputDeparture).val(fd.split(' - ')[1]);
        [this._dateArrival, this._dateDeparture] = d;
        this._updateDaysNum();
      },
    });

    $(this._inputDeparture).datepicker({
      onSelect: (fd, d) => {
        $(this._inputArrival).val(fd.split(' - ')[0]);
        $(this._inputDeparture).val(fd.split(' - ')[1]);
        [this._dateArrival, this._dateDeparture] = d;
        this._updateDaysNum();
      },
    });
  }

  static _prettifyPrice(num) {
    const n = num.toString();
    return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1 ');
  }

  static _extractNumbers(string) {
    return string.replace(/\D+/g, '');
  }

  static _handleInfoIconMouseover(event) {
    const { target } = event;

    const tooltip = document.createElement('div');
    tooltip.className = 'card-booking__tooltip';
    tooltip.innerHTML = target.dataset.tooltip;
    document.body.append(tooltip);

    const coords = target.getBoundingClientRect();
    tooltip.style.left = `${coords.left - tooltip.offsetWidth - 5}px`;
    tooltip.style.top = `${coords.top}px`;

    function handleInfoIconMouseout() {
      if (tooltip) {
        tooltip.remove();
      }
    }

    target.addEventListener('mouseout', handleInfoIconMouseout);
  }

  _attachEventHandlers() {
    Array.from(this._infoIcons).forEach((icon) => {
      icon.addEventListener('mouseover', CardBooking._handleInfoIconMouseover);
    });
  }

  _updateDaysNum() {
    this._days = Math.floor((this._dateDeparture - this._dateArrival) / (1000 * 3600 * 24));
    this._daysNumElement.textContent = this._days;
    this._updateDaysWord(this._days);
    this._updatePriceForXDays();
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
    this._updateTotal();
  }

  _updateTotal() {
    if (this._days === 0) {
      this._totalElement.textContent = '0₽';
    } else {
      this._totalElement.textContent = `${this._prettifyPrice(this._price * this._days + this._serviceFee - this._discount + this._additionalServiceFee)}₽`;
    }
  }
}

const cards = document.querySelectorAll('.js-card-booking');
CardBooking.init(cards);
