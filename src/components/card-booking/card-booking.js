import './card-booking.scss';

import '../input/input.js'
import '../button/button.js'
import '../datepicker/datepicker.js'
import '../dropdown/dropdown.js'

let cardBooking = document.querySelector('.js-card-booking');

let inputArrival = cardBooking.querySelector('.js-card-booking__arrival');
let inputDeparture = cardBooking.querySelector('.js-card-booking__departure');
let dateArrival;
let dateDeparture;

let daysNum = cardBooking.querySelector('.js-card-booking__days');
let daysWord = cardBooking.querySelector('.js-card-booking__days-word');
let days = +daysNum.textContent;

let priceElem = cardBooking.querySelector('.js-card-booking__price');
let price = +extractNumbers(priceElem.textContent);
let priceForXDays = cardBooking.querySelector('.js-card-booking__price-for-x-days');

let serviceFeeElem = cardBooking.querySelector('.js-card-booking__service-fee');
let serviceFee = +extractNumbers(serviceFeeElem.textContent);

let discountElem = cardBooking.querySelector('.js-card-booking__discount');
let discount = +extractNumbers(discountElem.textContent);

let additionalServiceFeeElem = cardBooking.querySelector('.js-card-booking__additional-service-fee');
let additionalServiceFee = +extractNumbers(additionalServiceFeeElem.textContent);

let totalElem = cardBooking.querySelector('.js-card-booking__total');

$(inputArrival).datepicker({
  onSelect: function(fd, d, picker) {
    $(inputArrival).val(fd.split(" - ")[0]);
    $(inputDeparture).val(fd.split(" - ")[1]);
    dateArrival = d[0];
    dateDeparture = d[1];
    updateDaysNum();
  }
})

$(inputDeparture).datepicker({
  onSelect: function(fd, d, picker) {
    $(inputArrival).val(fd.split(" - ")[0]);
    $(inputDeparture).val(fd.split(" - ")[1]);
    dateArrival = d[0];
    dateDeparture = d[1];
    updateDaysNum();
  }
})

function updateDaysNum() {
  days = Math.floor( (dateDeparture - dateArrival) / (1000 * 3600 * 24) );
  daysNum.textContent = days;
  updateDaysWord(days);
  updatePriceForXDays();
} 

function updateDaysWord(days) {
  if ([1, 21, 31, 41, 51, 61, 71, 81, 91].includes(days)) {
    daysWord.textContent = ' сутки';
  } else {
    daysWord.textContent = ' суток';
  }
}

function updatePriceForXDays() {
  priceForXDays.textContent = prettifyPrice(price * days) + '₽';
  updateTotal();
}

function updateTotal() {
  if (days == 0) {
    totalElem.textContent = '0₽'
  } else {
    totalElem.textContent = prettifyPrice(price * days + serviceFee - discount + additionalServiceFee) + '₽';
  }  
}

function prettifyPrice(num) {
  let n = num.toString();
  return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
}

function extractNumbers(string) {
  return string.replace(/\D+/g, "");
}

let infoIcons = cardBooking.querySelectorAll('.js-card-booking__info-icon');
for (let icon of infoIcons) {
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





