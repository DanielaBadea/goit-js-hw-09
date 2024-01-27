function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

  const btnStart = document.querySelector("button[data-start]");
  const btnStop = document.querySelector("button[data-stop]");
  const body =document.querySelector("body");
  

  const setBodyColor = () => {
    const color = getRandomHexColor();
    body.style.backgroundColor = color;
    
  };
  let timeID;

  const startChangeColor = () => { 
    timeID = setInterval(setBodyColor, 1000);
    console.log(timeID);
    btnStart.disabled = true;
    btnStop.disabled = false;
  };

  const stopChangeColor = () => {
    clearInterval(timeID);
    btnStart.disabled = false;
    btnStop.disabled = true;
    // if(clearInterval(timeID) !== 'undefined')
    // {
    //     btnStart.disabled = false;
    // }
    //   else {
    //     btnStop.disabled = true;
    //   }
  };
  
  btnStart.addEventListener("click", startChangeColor);
  btnStop.addEventListener("click", stopChangeColor);