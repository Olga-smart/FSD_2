"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[125],{68:(t,e,s)=>{s(490),s(414),s(109);var i=s(638);class n{constructor(t){this._initFields(t),this._attachEventHandlers()}static init(t){const e=[];return[...t].forEach((t=>{e.push(new n(t))})),e}_initFields(t){this._component=t,this._inputArrival=t.querySelector(".js-card-booking__arrival"),this._inputDeparture=t.querySelector(".js-card-booking__departure"),this._dateArrival=void 0,this._dateDeparture=void 0,this._daysNumElement=t.querySelector(".js-card-booking__days"),this._daysWordElement=t.querySelector(".js-card-booking__days-word"),this._days=Number(this._daysNumElement.textContent),this._priceElement=t.querySelector(".js-card-booking__price"),this._price=Number(n._extractNumbers(this._priceElement.textContent)),this._priceForXDays=t.querySelector(".js-card-booking__price-for-x-days"),this._serviceFeeElement=t.querySelector(".js-card-booking__discount"),this._serviceFee=Number(n._extractNumbers(this._serviceFeeElement.textContent)),this._discountElement=t.querySelector(".js-card-booking__discount"),this._discount=Number(n._extractNumbers(this._discountElement.textContent)),this._additionalServiceFeeElement=t.querySelector(".js-card-booking__additional-service-fee"),this._additionalServiceFee=Number(n._extractNumbers(this._additionalServiceFeeElement.textContent)),this._totalElement=t.querySelector(".js-card-booking__total"),this._infoIcons=t.querySelectorAll(".js-card-booking__info-icon"),i(this._inputArrival).datepicker({onSelect:(t,e)=>{i(this._inputArrival).val(t.split(" - ")[0]),i(this._inputDeparture).val(t.split(" - ")[1]),[this._dateArrival,this._dateDeparture]=e,this._updateDaysNum()}}),i(this._inputDeparture).datepicker({onSelect:(t,e)=>{i(this._inputArrival).val(t.split(" - ")[0]),i(this._inputDeparture).val(t.split(" - ")[1]),[this._dateArrival,this._dateDeparture]=e,this._updateDaysNum()}})}static _prettifyPrice(t){return t.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g,"$1 ")}static _extractNumbers(t){return t.replace(/\D+/g,"")}static _handleInfoIconMouseover(t){const{target:e}=t,s=document.createElement("div");s.className="card-booking__tooltip",s.innerHTML=e.dataset.tooltip,document.body.append(s);const i=e.getBoundingClientRect();s.style.left=i.left-s.offsetWidth-5+"px",s.style.top=`${i.top}px`,e.addEventListener("mouseout",(()=>{s&&s.remove()}))}_attachEventHandlers(){[...this._infoIcons].forEach((t=>{t.addEventListener("mouseover",n._handleInfoIconMouseover)}))}_updateDaysNum(){this._days=Math.floor((this._dateDeparture-this._dateArrival)/864e5),this._daysNumElement.textContent=this._days,this._updateDaysWord(this._days),this._updatePriceForXDays()}_updateDaysWord(){[1,21,31,41,51,61,71,81,91].includes(this._days)?this._daysWordElement.textContent=" сутки":this._daysWordElement.textContent=" суток"}_updatePriceForXDays(){this._priceForXDays.textContent=`${n._prettifyPrice(this._price*this._days)}₽`,this._updateTotal()}_updateTotal(){0===this._days?this._totalElement.textContent="0₽":this._totalElement.textContent=`${n._prettifyPrice(this._price*this._days+this._serviceFee-this._discount+this._additionalServiceFee)}₽`}}const o=document.querySelectorAll(".js-card-booking");n.init(o)},746:(t,e,s)=>{var i=s(357);s(888);class n{constructor(t){this._initFields(t),this._convertDateToText(this._dateElement)}static init(t){const e=[];return[...t].forEach((t=>{e.push(new n(t))})),e}static _getDaysPassed(t){const e=new Date;return Math.floor((e-t)/864e5)}_initFields(t){this._component=t,this._dateElement=t.querySelector(".js-comment__date")}_convertDateToText(){const t=new Date(Date.parse(this._dateElement.textContent)),e=n._getDaysPassed(t);if(e>=365){const t=Math.floor(e/365);this._dateElement.textContent=`${t} ${(0,i.Z)(t,"год","года","лет")} назад`}else if(e>=30){const t=Math.floor(e/30);this._dateElement.textContent=`${t} ${(0,i.Z)(t,"месяц","месяца","месяцев")} назад`}else if(e>=7){const t=Math.floor(e/7);this._dateElement.textContent=`${t} ${(0,i.Z)(t,"неделю","недели","недель")} назад`}else this._dateElement.textContent=e>1?`${e} ${(0,i.Z)(e,"день","дня","дней")} назад`:1===e?"вчера":"сегодня"}}const o=document.querySelectorAll(".js-comment");n.init(o)},414:(t,e,s)=>{s(248),s(490);var i=s(638);class n{constructor(t){this._initFields(t),this._addApplyBtn(),this._addStyleForBtns(),this._component.defaultValue&&this._setDefaultDate(),this._attachEventHandlers()}static init(t){const e=[];return[...t].forEach((t=>{e.push(new n(t))})),e}_initFields(t){this._component=t;const e={clearButton:!0,navTitles:{days:"MM yyyy"},offset:6,minDate:new Date,language:{monthsShort:["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"]},range:!0,multipleDatesSeparator:" - "};t.classList.contains("date-start")&&(e.onSelect=e=>{i(t).val(e.split(" - ")[0]);const s=t.parentElement.parentElement.nextElementSibling.querySelector(".date-end");i(s).val(e.split(" - ")[1])}),t.classList.contains("date-end")&&(e.onSelect=e=>{const s=t.parentElement.parentElement.previousElementSibling.querySelector(".date-start");i(s).val(e.split(" - ")[0]),i(t).val(e.split(" - ")[1])},e.position="bottom right"),i(t).datepicker(e),this._calendar=i(t).data("datepicker"),[this._calendarElement]=this._calendar.$datepicker}_addApplyBtn(){const t=document.createElement("button");t.textContent="Применить",t.className="datepicker--button button",t.dataset.action="hide",this._calendarElement.querySelector(".datepicker--buttons").append(t)}_addStyleForBtns(){[...this._calendarElement.querySelectorAll(".datepicker--button")].forEach((t=>{t.classList.add("button")}))}_setDefaultDate(){this._component.defaultValue.includes(" - ")?this._calendar.selectDate([new Date(Date.parse(this._component.defaultValue.slice(0,10))),new Date(Date.parse(this._component.defaultValue.slice(13)))]):this._calendar.selectDate(new Date(Date.parse(this._component.defaultValue)))}static _handleKeyDown(t){t.preventDefault()}_attachEventHandlers(){this._component.addEventListener("keydown",n._handleKeyDown)}}const o=document.querySelectorAll(".datepicker-here");n.init(o)},109:(t,e,s)=>{var i=s(357);class n{constructor(t){this._initFields(t),this._setProperties(),this._updateOutput(),this._buttonResetIsNecessary()&&(this._resetButton.style.display="inline-block"),this._attachEventHandlers()}static init(t){const e=[];return[...t].forEach((t=>{e.push(new n(t))})),e}_initFields(t){this._component=t,this._type=t.dataset.type,this._outputElement=t.querySelector(".js-dropdown__output .js-input .js-input__input"),this._items=t.querySelectorAll(".js-dropdown__item"),[...this._items].forEach((t=>{const e=t;e._input=t.querySelector(".js-dropdown__item-input"),e._minus=t.querySelector(".js-dropdown__button-minus"),e._plus=t.querySelector(".js-dropdown__button-plus"),n._counterValueIsMinimal(t)&&(e._minus.disabled=!0),n._counterValueIsMaximal(t)&&(e._plus.disabled=!0)})),this._applyButton=t.querySelector(".js-dropdown__button-apply"),this._resetButton=t.querySelector(".js-dropdown__button-reset"),"guests"===this._type&&(this._zeroValue="Сколько гостей"),"facilities"===this._type&&(this._zeroValue="Выберите удобства")}_setProperties(){"guests"===this._type&&this._setGuestsProperties(),"facilities"===this._type&&this._setFacilitiesProperties()}_setGuestsProperties(){this._guestsCount=Number(this._items[0]._input.value)+Number(this._items[1]._input.value),this._guestsWord=(0,i.Z)(this._guestsCount,"гость","гостя","гостей"),this._babiesCount=Number(this._items[2]._input.value),this._babiesWord=(0,i.Z)(this._babiesCount,"младенец","младенца","младенцев")}_setFacilitiesProperties(){this._bedroomsCount=Number(this._items[0]._input.value),this._bedroomsWord=(0,i.Z)(this._bedroomsCount,"спальня","спальни","спален"),this._bedsCount=Number(this._items[1]._input.value),this._bedsWord=(0,i.Z)(this._bedsCount,"кровать","кровати","кроватей"),this._bathroomsCount=Number(this._items[2]._input.value),this._bathroomsWord=(0,i.Z)(this._bathroomsCount,"ванная","ванные","ванных")}_updateOutput(){if(0===this._sumValues())this._outputElement.value=this._zeroValue;else if("guests"===this._type&&(0===this._babiesCount?this._outputElement.value=`${this._guestsCount} ${this._guestsWord}`:this._outputElement.value=`${this._guestsCount} ${this._guestsWord}, ${this._babiesCount} ${this._babiesWord}`),"facilities"===this._type){let t="";this._bedroomsCount>0&&(t+=`${this._bedroomsCount} ${this._bedroomsWord}`),this._bedsCount>0&&(t.length>0&&(t+=", "),t+=`${this._bedsCount} ${this._bedsWord}`),this._bathroomsCount>0&&(t.length>0&&(t+=", "),t+=`${this._bathroomsCount} ${this._bathroomsWord}`),this._outputElement.value=t}}_sumValues(){let t=0;return[...this._items].forEach((e=>{t+=Number(e._input.value)})),t}_toggle(){this._component.classList.toggle("dropdown_menu_open"),this._outputElement.classList.toggle("input__input_dropdown_open"),this._outputElement.classList.toggle("input__input_focused")}static _counterCanBeDecreased(t){return t.dataset.minCount?t._input.value>t.dataset.minCount:t._input.value>0}static _counterCanBeIncreased(t){return!t.dataset.maxCount||t._input.value<t.dataset.maxCount}static _counterValueIsMinimal(t){return t._input.value===t.dataset.minCount||0===t._input.value}static _counterValueIsMaximal(t){return t._input.value===t.dataset.maxCount}_buttonResetIsNecessary(){const t=[...this._items].find((t=>(t=>"0"!==t._input.value&&t._input.value!==t.dataset.minCount)(t)));return Boolean(t)}_reset(){[...this._items].forEach((t=>{const e=t;e._input.value=t.dataset.minCount||0,e._minus.disabled=!0})),this._updateOutput()}_handleOutputClick(){this._toggle()}_handleMinusClick(t){const e=t.target.closest(".js-dropdown__item");n._counterCanBeDecreased(e)&&(e._input.value-=1,n._counterValueIsMinimal(e)&&(e._minus.disabled=!0),e._plus.disabled=!1),this._setProperties(),this._updateOutput(),this._applyButton.style.display="inline-block",this._buttonResetIsNecessary()?this._resetButton.style.display="inline-block":this._resetButton.style.display="none"}_handlePlusClick(t){const e=t.target.closest(".js-dropdown__item");n._counterCanBeIncreased(e)&&(e._input.value=Number(e._input.value)+1,n._counterValueIsMaximal(e)&&(e._plus.disabled=!0),e._minus.disabled=!1),this._setProperties(),this._updateOutput(),this._applyButton.style.display="inline-block",this._resetButton.style.display="inline-block"}_handleResetButtonClick(){this._reset(),this._resetButton.style.display="none"}_handleApplyButtonClick(){this._toggle(),this._applyButton.style.display="none"}_attachEventHandlers(){this._outputElement.addEventListener("click",this._handleOutputClick.bind(this)),[...this._items].forEach((t=>{t._minus.addEventListener("click",this._handleMinusClick.bind(this)),t._plus.addEventListener("click",this._handlePlusClick.bind(this))})),this._resetButton.addEventListener("click",this._handleResetButtonClick.bind(this)),this._applyButton.addEventListener("click",this._handleApplyButtonClick.bind(this))}}const o=document.querySelectorAll(".js-dropdown");n.init(o)},718:(t,e,s)=>{s(565)},653:()=>{class t{constructor(t){this._initFields(t),this._attachEventHandlers()}static init(e){const s=[];return[...e].forEach((e=>{s.push(new t(e))})),s}_initFields(t){this._component=t,this._burger=t.querySelector(".js-header__burger"),this._menu=t.querySelector(".js-header__menu")}_handleBurgerClick(){this._burger.classList.toggle("header__burger_menu_open"),this._menu.classList.toggle("header__menu_open")}_attachEventHandlers(){this._burger.addEventListener("click",this._handleBurgerClick.bind(this))}}const e=document.querySelectorAll(".header");t.init(e)},565:(t,e,s)=>{s(490)},490:(t,e,s)=>{var i=s(824);document.querySelector(".js-input_birthday")&&new i.Z(".js-input_birthday",{date:!0,delimiter:".",datePattern:["d","m","Y"]})},888:()=>{class t{constructor(t){this._component=t,this._attachEventHandlers()}static init(e){const s=[];return[...e].forEach((e=>{s.push(new t(e))})),s}static _handleClick(t){const e=t.currentTarget;e.classList.toggle("like_checked");let s=Number(e.textContent);e.classList.contains("like_checked")?(s+=1,e.textContent=s):(s-=1,e.textContent=s)}_attachEventHandlers(){this._component.addEventListener("click",t._handleClick)}}const e=document.querySelectorAll(".js-like");t.init(e)},357:(t,e,s)=>{s.d(e,{Z:()=>i});const i=(t,e,s,i)=>{let n=i;const o=t=>+t.toString().slice(-2);return[1,21,31,41,51,61,71,81,91].includes(o(t))&&(n=e),[2,3,4].includes(+t.toString().slice(-1))&&![12,13,14].includes(o(t))&&(n=s),n}},276:(t,e,s)=>{s(718),s(653),s(68),s(746);var i=s(357);class n{constructor(t){this._initFields(t),this._updateVotesWord()}static init(t){const e=[];return[...t].forEach((t=>{e.push(new n(t))})),e}_initFields(t){this._component=t,this._votesWordElement=t.querySelector(".js-diagram__votes-word"),this._votesNumber=t.querySelector(".js-diagram__votes-number").textContent}_updateVotesWord(){this._votesWordElement.textContent=(0,i.Z)(this._votesNumber,"голос","голоса","голосов")}}const o=document.querySelectorAll(".diagram");function a(t){return+t.toString().slice(-2)}n.init(o);const r=document.querySelector(".js-room-details__comments-number"),l=document.querySelectorAll(".js-room-details__comment");r.textContent=`${l.length} ${function(t,e,s,i){let n="отзывов";return[1,21,31,41,51,61,71,81,91].includes(a(t))&&(n="отзыв"),[2,3,4].includes(+t.toString().slice(-1))&&![12,13,14].includes(a(t))&&(n="отзыва"),n}(l.length)}`}},t=>{t.O(0,[216],(()=>(276,t(t.s=276)))),t.O()}]);