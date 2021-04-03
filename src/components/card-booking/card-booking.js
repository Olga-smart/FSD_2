import './card-booking.scss';

import '../input/input.js'
import '../button/button.js'
import '../datepicker/datepicker.js'
import '../dropdown/dropdown.js'

class CardBooking {
  
  constructor(component) {
    this._component = component;
    
    this._inputArrival = component.querySelector('.js-card-booking__arrival');
    this._inputDeparture = component.querySelector('.js-card-booking__departure');
    this._dateArrival;
    this._dateDeparture;
    
    this._daysNumElement = component.querySelector('.js-card-booking__days');
    this._daysWordElement = component.querySelector('.js-card-booking__days-word');
    this._days = +this._daysNumElement.textContent; 
    
    this._priceElement = component.querySelector('.js-card-booking__price');
    this._price = +this._extractNumbers(this._priceElement.textContent);
    this._priceForXDays = component.querySelector('.js-card-booking__price-for-x-days');
    
    this._serviceFeeElement = component.querySelector('.js-card-booking__discount');
    this._serviceFee = +this._extractNumbers(this._serviceFeeElement.textContent);
    
    this._discountElement = component.querySelector('.js-card-booking__discount');
    this._discount = +this._extractNumbers(this._discountElement.textContent);
    
    this._additionalServiceFeeElement = component.querySelector('.js-card-booking__additional-service-fee');
    this._additionalServiceFee = +this._extractNumbers(this._additionalServiceFeeElement.textContent);
    
    this._totalElement = component.querySelector('.js-card-booking__total');
    
    this._infoIcons = component.querySelectorAll('.js-card-booking__info-icon');
    
    $(this._inputArrival).datepicker({
      onSelect: (fd, d, picker) => {
        $(this._inputArrival).val(fd.split(" - ")[0]);
        $(this._inputDeparture).val(fd.split(" - ")[1]);
        this._dateArrival = d[0];
        this._dateDeparture = d[1];
        this._updateDaysNum();
      }
    });
    
    $(this._inputDeparture).datepicker({
      onSelect: (fd, d, picker) => {
        $(this._inputArrival).val(fd.split(" - ")[0]);
        $(this._inputDeparture).val(fd.split(" - ")[1]);
        this._dateArrival = d[0];
        this._dateDeparture = d[1];
        this._updateDaysNum();
      }
    });
    
    this._attachEventHandlers();

  }
  
  _attachEventHandlers() {
    for (let icon of this._infoIcons) {
      let tooltip;
      icon.addEventListener('mouseover', function(event) {
        let target = event.target;

        tooltip = document.createElement('div');
        tooltip.className = 'card-booking__tooltip';
        tooltip.innerHTML = target.dataset.tooltip;
        document.body.append(tooltip);

        let coords = target.getBoundingClientRect();
        tooltip.style.left = coords.left - tooltip.offsetWidth - 5 + 'px';
        tooltip.style.top = coords.top + 'px';
      });
      icon.addEventListener('mouseout', function(event) {
        if (tooltip) {
          tooltip.remove();
          tooltip = null;
        }
      });
    }
  }
  
  _updateDaysNum() {
    this._days = Math.floor( (this._dateDeparture - this._dateArrival) / (1000 * 3600 * 24) );
    this._daysNumElement.textContent = this._days;
    this._updateDaysWord(this._days);
    this._updatePriceForXDays();
  } 
  
  _updateDaysWord(days) {
    if ([1, 21, 31, 41, 51, 61, 71, 81, 91].includes(this._days)) {
      this._daysWordElement.textContent = ' сутки';
    } else {
      this._daysWordElement.textContent = ' суток';
    }
  }
  
  _updatePriceForXDays() {
    this._priceForXDays.textContent = this._prettifyPrice(this._price * this._days) + '₽';
    this._updateTotal();
  }
  
  _updateTotal() {
    if (this._days == 0) {
      this._totalElement.textContent = '0₽'
    } else {
      this._totalElement.textContent = this._prettifyPrice(this._price * this._days + this._serviceFee - this._discount + this._additionalServiceFee) + '₽';
    }  
  }
  
  _prettifyPrice(num) {
    let n = num.toString();
    return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
  }
  
  _extractNumbers(string) {
    return string.replace(/\D+/g, "");
  }
}

let cardsBooking = document.querySelectorAll('.js-card-booking');
for (let card of cardsBooking) {
  new CardBooking(card);
}




