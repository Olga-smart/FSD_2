"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[12],{140:(t,e,s)=>{s(499),s(396),s(517);class i{constructor(t){this._initFields(t),this._attachEventHandlers()}static init(t){const e=[];return[...t].forEach((t=>{e.push(new i(t))})),e}_initFields(t){this._component=t,this._inputArrival=t.querySelector(".js-card-booking__arrival"),this._inputDeparture=t.querySelector(".js-card-booking__departure"),this._dateArrival=void 0,this._dateDeparture=void 0,this._daysNumElement=t.querySelector(".js-card-booking__days"),this._daysWordElement=t.querySelector(".js-card-booking__days-word"),this._days=Number(this._daysNumElement.textContent),this._priceElement=t.querySelector(".js-card-booking__price"),this._price=Number(i._extractNumbers(this._priceElement.textContent)),this._priceForXDays=t.querySelector(".js-card-booking__price-for-x-days"),this._serviceFeeElement=t.querySelector(".js-card-booking__discount"),this._serviceFee=Number(i._extractNumbers(this._serviceFeeElement.textContent)),this._discountElement=t.querySelector(".js-card-booking__discount"),this._discount=Number(i._extractNumbers(this._discountElement.textContent)),this._additionalServiceFeeElement=t.querySelector(".js-card-booking__additional-service-fee"),this._additionalServiceFee=Number(i._extractNumbers(this._additionalServiceFeeElement.textContent)),this._totalElement=t.querySelector(".js-card-booking__total"),this._infoIcons=t.querySelectorAll(".js-card-booking__info-icon")}static _prettifyPrice(t){return t.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g,"$1 ")}static _extractNumbers(t){return t.replace(/\D+/g,"")}static _handleInfoIconMouseover(t){const{target:e}=t,s=document.createElement("div");s.className="card-booking__tooltip",s.innerHTML=e.dataset.tooltip,document.body.append(s);const i=e.getBoundingClientRect();s.style.left=i.left-s.offsetWidth-5+"px",s.style.top=`${i.top}px`,e.addEventListener("mouseout",(()=>{s&&s.remove()}))}_handleDateChange(){let[t,e,s]=this._inputArrival.value.split(".");this._dateArrival=Date.parse(`${s}-${e}-${t}`),[t,e,s]=this._inputDeparture.value.split("."),this._dateDeparture=Date.parse(`${s}-${e}-${t}`),this._updateDaysNum()}_attachEventHandlers(){[...this._infoIcons].forEach((t=>{t.addEventListener("mouseover",i._handleInfoIconMouseover)})),this._inputArrival.addEventListener("input",this._handleDateChange.bind(this)),this._inputDeparture.addEventListener("input",this._handleDateChange.bind(this))}_updateDaysNum(){this._days=Math.floor((this._dateDeparture-this._dateArrival)/864e5),this._daysNumElement.textContent=this._days,this._updateDaysWord(this._days),this._updatePriceForXDays()}_updateDaysWord(){[1,21,31,41,51,61,71,81,91].includes(this._days)?this._daysWordElement.textContent=" сутки":this._daysWordElement.textContent=" суток"}_updatePriceForXDays(){this._priceForXDays.textContent=`${i._prettifyPrice(this._price*this._days)}₽`,this._updateTotal()}_updateTotal(){0===this._days?this._totalElement.textContent="0₽":this._totalElement.textContent=`${i._prettifyPrice(this._price*this._days+this._serviceFee-this._discount+this._additionalServiceFee)}₽`}}const n=i,a=document.querySelectorAll(".js-card-booking");n.init(a)},802:(t,e,s)=>{s(396),s(517)},820:(t,e,s)=>{s.d(e,{Z:()=>l}),s(455);var i=s(638);class n{constructor(t){this._selector=t,this.initPlugin()}static init(t){return new n(t)}initPlugin(){i(this._selector).slick({dots:!0})}}const a=n;var o=s(357);class r{constructor(t){this._initFields(t),a.init(".js-card-room__slider")}static init(t){const e=[];return[...t].forEach((t=>{e.push(new r(t))})),e}_initFields(t){this._component=t,this._commentsElement=t.querySelector(".js-card-room__comments"),this._commentsNumber=Number(this._commentsElement.textContent),this._commentsElement.dataset.word=(0,o.Z)(this._commentsNumber," Отзыв"," Отзыва"," Отзывов")}}const l=r},148:(t,e,s)=>{var i=s(820);const n=document.querySelectorAll(".js-card-room");i.Z.init(n)},975:(t,e,s)=>{s(499)},518:(t,e,s)=>{s(499)},396:(t,e,s)=>{s(248);var i=s(638);class n{constructor(t){this._initFields(t),this._addApplyBtn(),this._addStyleForBtns(),this._component.defaultValue&&this._setDefaultDate(),this._attachEventHandlers()}static init(t){const e=[];return[...t].forEach((t=>{e.push(new n(t))})),e}_initFields(t){this._component=t;const e={clearButton:!0,navTitles:{days:"MM yyyy"},offset:6,minDate:new Date,language:{monthsShort:["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"]},range:!0,multipleDatesSeparator:" - ",onSelect(e,s){t.dispatchEvent(new CustomEvent("input",{detail:{date:s,formattedDate:e}}))}};t.classList.contains("date-start")&&(e.onSelect=(e,s)=>{i(t).val(e.split(" - ")[0]);const n=t.parentElement.parentElement.nextElementSibling.querySelector(".date-end");i(n).val(e.split(" - ")[1]),s[0]&&s[1]&&(this._component.dispatchEvent(new Event("input")),n.dispatchEvent(new Event("input")))}),t.classList.contains("date-end")&&(e.onSelect=(e,s)=>{const n=t.parentElement.parentElement.previousElementSibling.querySelector(".date-start");i(n).val(e.split(" - ")[0]),i(t).val(e.split(" - ")[1]),s[0]&&s[1]&&(n.dispatchEvent(new Event("input")),this._component.dispatchEvent(new Event("input")))},e.position="bottom right"),i(t).datepicker(e),this._calendar=i(t).data("datepicker"),[this._calendarElement]=this._calendar.$datepicker}_addApplyBtn(){const t=document.createElement("button");t.textContent="Применить",t.className="datepicker--button button",t.dataset.action="hide",this._calendarElement.querySelector(".datepicker--buttons").append(t)}_addStyleForBtns(){[...this._calendarElement.querySelectorAll(".datepicker--button")].forEach((t=>{t.classList.add("button")}))}_setDefaultDate(){this._component.defaultValue.includes(" - ")?this._calendar.selectDate([new Date(Date.parse(this._component.defaultValue.slice(0,10))),new Date(Date.parse(this._component.defaultValue.slice(13)))]):this._calendar.selectDate(new Date(Date.parse(this._component.defaultValue)))}_handleInput(t){if(this._component.classList.contains("date-start")||this._component.classList.contains("date-end")){const[t,e,s]=i(this._component).val().split(".");i(this._component).attr("value",`${s}-${e}-${t}`)}else if(Array.isArray(t.detail.date)){const e=n._formatDateForValueAttribute(t.detail.date[0]),s=n._formatDateForValueAttribute(t.detail.date[1]);i(this._component).attr("value",`${e} - ${s}`)}else{const e=n._formatDateForValueAttribute(t.detail.date);i(this._component).attr("value",e)}}static _formatDateForValueAttribute(t){let e=new Date(t);return e=new Date(e.getTime()-60*e.getTimezoneOffset()*1e3),[e]=e.toISOString().split("T"),e}static _handleKeyDown(t){t.preventDefault()}_attachEventHandlers(){this._component.addEventListener("keydown",n._handleKeyDown),this._component.addEventListener("input",this._handleInput.bind(this))}}const a=n,o=document.querySelectorAll(".datepicker-here");a.init(o),s(499)},517:(t,e,s)=>{var i=s(357),n=s(549);class a{constructor(t){this._initFields(t),this._setProperties(),this._updateOutput(),this._buttonResetIsNecessary()&&(this._resetButton.style.display="inline-block"),this._attachEventHandlers()}static init(t){const e=[];return[...t].forEach((t=>{e.push(new a(t))})),e}_initFields(t){this._component=t,this._type=t.dataset.type,this._outputElement=t.querySelector(".js-dropdown__output input"),this._items=t.querySelectorAll(".js-dropdown__item"),[...this._items].forEach((t=>{const e=t;e._input=t.querySelector(".js-dropdown__item-input"),e._minus=t.querySelector(".js-dropdown__button-minus"),e._plus=t.querySelector(".js-dropdown__button-plus"),a._counterValueIsMinimal(t)&&(e._minus.disabled=!0),a._counterValueIsMaximal(t)&&(e._plus.disabled=!0)})),this._applyButton=t.querySelector(".js-dropdown__button-apply"),this._resetButton=t.querySelector(".js-dropdown__button-reset"),"guests"===this._type&&(this._zeroValue="Сколько гостей"),"facilities"===this._type&&(this._zeroValue="Выберите удобства")}_setProperties(){"guests"===this._type&&this._setGuestsProperties(),"facilities"===this._type&&this._setFacilitiesProperties()}_setGuestsProperties(){this._guestsCount=Number(this._items[0]._input.value)+Number(this._items[1]._input.value),this._guestsWord=(0,i.Z)(this._guestsCount,"гость","гостя","гостей"),this._babiesCount=Number(this._items[2]._input.value),this._babiesWord=(0,i.Z)(this._babiesCount,"младенец","младенца","младенцев")}_setFacilitiesProperties(){this._bedroomsCount=Number(this._items[0]._input.value),this._bedroomsWord=(0,i.Z)(this._bedroomsCount,"спальня","спальни","спален"),this._bedsCount=Number(this._items[1]._input.value),this._bedsWord=(0,i.Z)(this._bedsCount,"кровать","кровати","кроватей"),this._bathroomsCount=Number(this._items[2]._input.value),this._bathroomsWord=(0,i.Z)(this._bathroomsCount,"ванная","ванные","ванных")}_updateOutput(){if(0===this._sumValues())this._outputElement.value=this._zeroValue;else if("guests"===this._type&&(0===this._babiesCount?this._outputElement.value=`${this._guestsCount} ${this._guestsWord}`:this._outputElement.value=`${this._guestsCount} ${this._guestsWord}, ${this._babiesCount} ${this._babiesWord}`),"facilities"===this._type){let t="";this._bedroomsCount>0&&(t+=`${this._bedroomsCount} ${this._bedroomsWord}`),this._bedsCount>0&&(t.length>0&&(t+=", "),t+=`${this._bedsCount} ${this._bedsWord}`),this._bathroomsCount>0&&(t.length>0&&(t+=", "),t+=`${this._bathroomsCount} ${this._bathroomsWord}`),this._outputElement.value=t}}_sumValues(){let t=0;return[...this._items].forEach((e=>{t+=Number(e._input.value)})),t}_toggle(){this._component.classList.toggle("dropdown_menu_open"),n.Z.handleDropdownToggle(this._outputElement)}static _counterCanBeDecreased(t){return t.dataset.minCount?t._input.value>t.dataset.minCount:t._input.value>0}static _counterCanBeIncreased(t){return!t.dataset.maxCount||t._input.value<t.dataset.maxCount}static _counterValueIsMinimal(t){return t._input.value===t.dataset.minCount||"0"===t._input.value}static _counterValueIsMaximal(t){return t._input.value===t.dataset.maxCount}_buttonResetIsNecessary(){const t=[...this._items].find((t=>(t=>"0"!==t._input.value&&t._input.value!==t.dataset.minCount)(t)));return Boolean(t)}_reset(){[...this._items].forEach((t=>{const e=t;e._input.value=t.dataset.minCount||0,e._minus.disabled=!0})),this._updateOutput()}_handleOutputClick(){this._toggle()}_handleMinusClick(t){const e=t.target.closest(".js-dropdown__item");a._counterCanBeDecreased(e)&&(e._input.value-=1,a._counterValueIsMinimal(e)&&(e._minus.disabled=!0),e._plus.disabled=!1),this._setProperties(),this._updateOutput(),this._applyButton.style.display="inline-block",this._buttonResetIsNecessary()?this._resetButton.style.display="inline-block":this._resetButton.style.display="none"}_handlePlusClick(t){const e=t.target.closest(".js-dropdown__item");a._counterCanBeIncreased(e)&&(e._input.value=Number(e._input.value)+1,a._counterValueIsMaximal(e)&&(e._plus.disabled=!0),e._minus.disabled=!1),this._setProperties(),this._updateOutput(),this._applyButton.style.display="inline-block",this._resetButton.style.display="inline-block"}_handleResetButtonClick(){this._reset(),this._resetButton.style.display="none"}_handleApplyButtonClick(){this._toggle(),this._applyButton.style.display="none"}_attachEventHandlers(){this._outputElement.addEventListener("click",this._handleOutputClick.bind(this)),[...this._items].forEach((t=>{t._minus.addEventListener("click",this._handleMinusClick.bind(this)),t._plus.addEventListener("click",this._handlePlusClick.bind(this))})),this._resetButton.addEventListener("click",this._handleResetButtonClick.bind(this)),this._applyButton.addEventListener("click",this._handleApplyButtonClick.bind(this))}}const o=a,r=document.querySelectorAll(".js-dropdown");o.init(r)},549:(t,e,s)=>{s.d(e,{Z:()=>a});var i=s(824);class n{constructor(t){this._initFields(t)}static init(t){const e=[];return[...t].forEach((t=>{e.push(new n(t))})),e}static handleDropdownToggle(t){t.classList.toggle("input__input_dropdown_open"),t.classList.toggle("input__input_focused")}_initFields(t){var e;this._component=t,t.querySelector(".js-input__field")&&(this._input=t.querySelector(".js-input__field"),this._input.classList.contains("js-input__field_date")&&(e=this._input,new i.Z(e,{date:!0,delimiter:".",datePattern:["d","m","Y"]})))}}const a=n},499:(t,e,s)=>{var i=s(549);const n=document.querySelectorAll(".js-input");i.Z.init(n)},357:(t,e,s)=>{s.d(e,{Z:()=>i});const i=(t,e,s,i)=>{let n=i;const a=t=>+t.toString().slice(-2);return[1,21,31,41,51,61,71,81,91].includes(a(t))&&(n=e),[2,3,4].includes(+t.toString().slice(-1))&&![12,13,14].includes(a(t))&&(n=s),n}},831:(t,e,s)=>{s(802),s(518),s(140),s(975),s(396),s(148)}},t=>{t.O(0,[216],(()=>(831,t(t.s=831)))),t.O()}]);