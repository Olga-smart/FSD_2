import 'air-datepicker';

import AirDatepicker from './AirDatepicker';

const datepickers = document.querySelectorAll('.js-calendar');
[...datepickers].forEach((datepicker) => new AirDatepicker(datepicker));
