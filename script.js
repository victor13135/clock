console.log("SAT!");
let digitalClock = document.getElementById("digitalClockFace");
let hourHand = document.getElementById("hourHand");
let minuteHand = document.getElementById("minuteHand");
let secondHand = document.getElementById("secondHand");

let hours, minutes, seconds;  
let hourDegrees, minuteDegrees, secondDegrees;

setInterval( () => {
    let time = new Date();  
    hours = time.getHours();
    minutes = time.getMinutes();
    seconds = time.getSeconds();
    
    digitalClock.textContent = hours + ":" + minutes + ":" + seconds;

    hourDegrees = (hours%12)/12 * 360;
    minuteDegrees = minutes/60 * 360;
    secondDegrees = seconds/60 * 360;
        
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;

}, 1000);
