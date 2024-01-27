import Notiflix from 'notiflix';
const form = document.querySelector(".form");
const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');
const btn = document.querySelector('button[type="submit"]');


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
       reject({position, delay});
      }
    },delay); 
  }) ;
};
const onSumitData = (evt) => {
  evt.preventDefault();
  let firstDelay = Number(delayInput.value);
  let delayStep = Number(stepInput.value);
  console.log(`first delay: ${firstDelay}`);
  console.log(`step delay: ${delayStep}`);


  for (let i = 0; i <= amountInput.value; i++ ){
    const currentDelay = firstDelay + delayStep * i;
    console.log(`i: ${i}`);
     console.log(`currentDelay: ${currentDelay}`);
    createPromise (i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  form.reset();
}

form.addEventListener("submit", onSumitData);

