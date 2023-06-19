import initDateField from '../../libs/cleave/init';

const inputsWithDate = document.querySelectorAll('.js-input__field_date');
[...inputsWithDate].forEach((input) => initDateField(input));
