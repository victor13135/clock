function colorTheseDots (idArray) {
    idArray.forEach( id => {
        document.getElementById(id).style.backgroundColor="black";
    });
}

function drawDiceFace (num) {
    switch(num) {
        case 0: break;
        case 1: colorTheseDots(["11"]); break;
        case 2: colorTheseDots(["00", "22"]); break;
        case 3: colorTheseDots(["00", "11", "22"]); break;
        case 4: colorTheseDots(["00", "02", "20", "22"]); break;
        case 5: colorTheseDots(["00", "02", "11", "20", "22"]); break;
        case 6: colorTheseDots(["00", "02", "10", "12", "20", "22"]);
    }
}

function resetDice () {
    let allTheDots = document.getElementsByClassName("dot");
    console.log(allTheDots);
    for (let item of allTheDots) {
        item.style.backgroundColor = "white";
    }
}

function rollTheDice () {
    return Math.trunc(Math.random()*6+1);
}

drawDiceFace(rollTheDice());