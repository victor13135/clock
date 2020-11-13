let digitalClock = document.getElementById("digitalClockFace");
let hourHand = document.getElementById("hourHand");
let minuteHand = document.getElementById("minuteHand");
let secondHand = document.getElementById("secondHand");

let binaryHourDivs = document.querySelectorAll(".hour");
let binaryMinuteDivs = document.querySelectorAll(".minute");
let binarySecondDivs = document.querySelectorAll(".second");

let allBinaryDigitDivs = [binaryHourDivs, binaryMinuteDivs, binarySecondDivs];

function toBinary (decNum, binDigits) {
    let binaryResult = "";
    let remainder;
    while (decNum/2 > 0) {
        remainder = decNum % 2;
        binaryResult += remainder;
        decNum = Math.floor(decNum / 2);
    }
    let temp="";
    for(let i = 0; i<(binDigits-binaryResult.length); i++) {
        temp += 0;
    }
    for(let i=binaryResult.length-1; i>=0; i--) {
        temp += binaryResult[i];
    }
    return temp;
}

let hours, minutes, seconds;
let binHours, binMinutes, binSeconds;
let hourDegrees, minuteDegrees, secondDegrees;

setInterval( () => {
    let time = new Date();
    hours = time.getHours();
    minutes = time.getMinutes();
    seconds = time.getSeconds();

    binHours = toBinary(hours, 5);
    binMinutes = toBinary(minutes, 6);
    binSeconds = toBinary(seconds, 6);
    
    let temp;
    if (minutes<10) {
        temp = 0 + String(minutes);
        minutes = temp;
    }
    if (seconds<10) {
        temp = 0 + String(seconds);
        seconds = temp;
    }
    digitalClock.textContent = hours + ":" + minutes + ":" + seconds;

    hourDegrees = (hours%12)/12 * 360 + (minutes/60)*30;
    minuteDegrees = minutes/60 * 360;
    secondDegrees = seconds/60 * 360;
        
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;

    let allBinaryDigitValues = [binHours, binMinutes, binSeconds];
    for(let i=0; i<3; i++) {
        for(let j=0; j<allBinaryDigitValues[i].length; j++) {
            if(allBinaryDigitValues[i][j] == "0") {
                allBinaryDigitDivs[i][j].style.backgroundColor = "khaki";
            } else {
                allBinaryDigitDivs[i][j].style.backgroundColor = "brown";
            }
        }
    }
}, 1000);