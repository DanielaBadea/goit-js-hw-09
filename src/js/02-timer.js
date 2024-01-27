import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const dateTimePicker = document.querySelector("#datetime-picker");
const startbtn = document.querySelector("button[data-start]");
const timer = document.querySelector(".timer");
const valueDays = document.querySelector("[data-days]");
const valueHr = document.querySelector("[data-hours]");
const valueMin = document.querySelector("[data-minutes]");
const valueSec = document.querySelector("[data-seconds]");
let timeID = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    //   console.log(selectedDates[0]);
    if(selectedDates[0] <= Date.now()){
        //  alert ("Please choose a date in the future!");
        Notiflix.Notify.failure("Please choose a date in the future!");
        startbtn.disabled = true;
        startPickerBtn.disabled = true;
    } else{
        startbtn.disabled = false;
    }
    },
  };
flatpickr(dateTimePicker, options);

function convertMs(ms) {
    // setam toate valorile la 0 daca data este aleasa anterior celei curente
    if (ms <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

const startPickerBtn = () => {
timeID = setInterval(() => {
    const {seconds, minutes, hours, days} = convertMs(new Date(dateTimePicker.value) - Date.now());
    valueDays.textContent = addLeadingZero(days);
    valueHr.textContent = addLeadingZero(hours);
    valueMin.textContent = addLeadingZero(minutes);
    valueSec.textContent = addLeadingZero(seconds);
    startbtn.disabled = true;
    if(days === 0 && hours === 0 && minutes === 0 && seconds === 0){
        clearInterval(timeID);
        alert("End!");
    }
},1000)
};
const addLeadingZero = (value) => {
    // console.log(value);
    // metoda padStart adauga un sir de la incept.In cazul nostru, pune un 0 in fata valorii
    return `${value}`.padStart(2,'0');
}
startbtn.addEventListener("click",startPickerBtn);