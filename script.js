let digitalClock = document.getElementById("digitalClockFace");

let hourHand = document.getElementById("hourHand");
let minuteHand = document.getElementById("minuteHand");
let secondHand = document.getElementById("secondHand");

let binaryHourDivs = document.querySelectorAll(".hour");
let binaryMinuteDivs = document.querySelectorAll(".minute");
let binarySecondDivs = document.querySelectorAll(".second");

let hexClock = document.getElementById("hexClockFace");

let dominoHoursUp = document.getElementById("dominoHoursUp");
let dominoHoursDown = document.getElementById("dominoHoursDown");
let dominoMinutesDigitOneUp = document.getElementById("dominoMinutesDigitOneUp");
let dominoMinutesDigitOneDown = document.getElementById("dominoMinutesDigitOneDown");
let dominoMinutesDigitTwoUp = document.getElementById("dominoMinutesDigitTwoUp");
let dominoMinutesDigitTwoDown = document.getElementById("dominoMinutesDigitTwoDown");

let allBinaryDigitDivs = [binaryHourDivs, binaryMinuteDivs, binarySecondDivs];

let currentMinutes = -1;

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
function toHex (decNum) {
    let firstDigit = 0, secondDigit = 0;
    firstDigit = String(Math.trunc(decNum/16));
    secondDigit = String(decNum % 16);
    switch(secondDigit) {
        case "15":    secondDigit = "F"; break;
        case "14":    secondDigit = "E"; break;
        case "13":    secondDigit = "D"; break;
        case "12":    secondDigit = "C"; break;
        case "11":    secondDigit = "B"; break;
        case "10":    secondDigit = "A";
    }
    return firstDigit+secondDigit;
}
function drawDiceFace (diceId, num) {
    let dotsArray = [];
    switch(num) {
        case 0: break;
        case 1: dotsArray = ["11"]; break;
        case 2: dotsArray = ["00", "22"]; break;
        case 3: dotsArray = ["00", "11", "22"]; break;
        case 4: dotsArray = ["00", "02", "20", "22"]; break;
        case 5: dotsArray = ["00", "02", "11", "20", "22"]; break;
        case 6: dotsArray = ["00", "02", "10", "12", "20", "22"];
    }
    dotsArray.forEach((dot, i) => {
        console.log(diceId);
        diceId.querySelector(`.d${dotsArray[i]}.dot`).style.backgroundColor="whitesmoke";
    });
}
function resetDice () {
    let allTheDots = document.getElementsByClassName("dot");
    for (let item of allTheDots) {
        item.style.backgroundColor = "black";
    }
}
function updateDominoClock(hrs, mins) {
    if(hrs>12) {
        hrs-=12;
    }
    currentMinutes = mins;
    let tensOfMinutes = Math.trunc(mins/10);
    let singleMinutes = mins%10;
    let hoursDigitUp = Math.floor(hrs/2);
    let hoursDigitDown = Math.ceil(hrs/2);
    let minutesDigitOneUp = Math.floor(tensOfMinutes/2);
    let minutesDigitOneDown = Math.ceil(tensOfMinutes/2);
    let minutesDigitTwoUp = Math.floor(singleMinutes/2);
    let minutesDigitTwoDown = Math.ceil(singleMinutes/2);
    let allTheDigits = [hoursDigitUp, hoursDigitDown, minutesDigitOneUp, minutesDigitOneDown, minutesDigitTwoUp, minutesDigitTwoDown];
    let allTheDices = [dominoHoursUp, dominoHoursDown, dominoMinutesDigitOneUp, dominoMinutesDigitOneDown, dominoMinutesDigitTwoUp, dominoMinutesDigitTwoDown];
    for(let i=0; i<6; i++) {
        drawDiceFace(allTheDices[i], allTheDigits[i]);
    }
}
function resetWorldClock() {
    let resetRange = document.getElementById("reset");
    let allTheFields = resetRange.getElementsByClassName("backlight");
    console.log(allTheFields);
    if(allTheFields.length>0) {
        let numberOfClassesToRemove = allTheFields.length;
        console.log(numberOfClassesToRemove);
        for (let i=numberOfClassesToRemove-1; i>=0; i--) {
            console.log(allTheFields.length);
            console.log(allTheFields[i].classList);
            allTheFields[i].classList.remove("backlight");
            //console.log(allTheFields[i].classList);
        }
    }
}
function lightItUp(spanId) {
    if(!document.getElementById(spanId).classList.contains("backlight")) {
        document.getElementById(spanId).classList.toggle("backlight");
    }
}
function updateWorldClockFace(hrs, mins) {
    if(hrs>12) {
        hrs -= 12;
    }
    if(hrs==0) {
        hrs += 12;
    }
    if(mins >=59 || mins <4) {
        lightItUp("oclock");
        if(mins<4) {
            lightItUp(`o${hrs}`);
        } else {
            lightItUp(`o${hrs+1}`);
        }
    } else if (mins>=34) {
        if(hrs==12) {
            hrs -= 12;
        }
        lightItUp(`o${hrs+1}`);
        lightItUp("to");
        if (mins <39) {
            lightItUp("twenty");
            lightItUp("five");
        } else if (mins >=39 && mins <44) {
            lightItUp("twenty");
        } else if (mins >=44 && mins <49) {
            lightItUp("quarter");
        } else if (mins >=49 && mins <54) {
            lightItUp("ten");
        } else if(mins >=54 && mins <59) {
            lightItUp("five");
        }
    } else {
        lightItUp(`o${hrs}`);
        lightItUp("past");
        if(mins >=4 && mins <9) {
            lightItUp("five")
        } else if (mins >=9 && mins <14) {
            lightItUp("ten");
        } else if (mins >=14 && mins <19) {
            lightItUp("quarter");
        } else if (mins >=19 && mins <24) {
            lightItUp("twenty");
        } else if (mins >=24 && mins <29) {
            lightItUp("twenty");
            lightItUp("five");
        } else if (mins >=29) {
            lightItUp("half");
        }
    }
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
    hexClock.textContent="#"+toHex(hours)+toHex(minutes)+toHex(seconds);
    
    if(currentMinutes != minutes) {
        resetDice();
        updateDominoClock(hours, minutes);
        resetWorldClock();
        updateWorldClockFace(hours, minutes);
    }
}, 1000);