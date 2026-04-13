// =================================
// 🌱 1. Sélection des éléments DOM
// =================================
    const table = document.querySelector(`.table`)
    const myBtn = document.querySelector(`.btn`)
    const myStatus = document.querySelector(`.status`)
    let card0;
    let card1;
    let card2;
    
    // element bet_zone
    const myScore = document.querySelector(`.score`)
    const myBet = document.querySelector(`.bet`)
    const betPlus = document.querySelector(`.btn_plus`)
    const betMinus = document.querySelector(`.btn_minus`)
    let chips = 100
    let bet = 0


    // =================================
// 🧠 2. Variables globales / état
// =================================

// =================================
// 🎊 3. Fonctions (logique métier)
// =================================

// function CREATE+ADD CARDS (NB: == whishlist)
function createCard () {
    card0 = document.createElement ("div");
    card0.classList.add(`cards`);
    card0.textContent = `🂠`
    // to position card on .table
    card0.style.left= "50px";
    // add ATTRIBUTE to match position con ⭐, to recall qith .getAttribute
    card0.setAttribute("data-index", "0");
    // const card0 linked to main .table div
    table.appendChild(card0);
    
    card1 = document.createElement (`div`);
    card1.classList.add(`cards`);
    card1.textContent = `🂠`
    // to position card on .table
    card1.style.left= "175px";
    // add ATTRIBUTE to match position con ⭐, to recall qith .getAttribute
    card1.setAttribute("data-index", "1");
    // const card0 linked to main .table div
    table.appendChild(card1);
    
    card2 = document.createElement (`div`);
    card2.classList.add(`cards`);
    card2.textContent = `🂠`
    // to position card on .table
    card2.style.left= "300px";
    // add ATTRIBUTE to match position con ⭐, to recall qith .getAttribute
    card2.setAttribute("data-index", "2");
    // const card0 linked to main .table div
    table.appendChild(card2);
}

// Function to reveal or hide the content of cards. Link to the "specialIndex". SpecialINdex 0 == card0, specialIndex1 == card1,...
function reveal (show) {
    if (show) {
        if (specialIndex === 0) {
        card0.textContent = `⭐`
        card0.classList.add("flipped")
        card1.textContent = `🂠`
        card2.textContent = `🂠`
        } else if (specialIndex === 1) {
        card0.textContent = `🂠`
        card1.textContent = `⭐`
        card1.classList.add("flipped")
        card2.textContent = `🂠`
    } else if (specialIndex === 2) {
        card0.textContent = `🂠`
        card1.textContent = `🂠`
        card2.textContent = `⭐`
        card2.classList.add("flipped")
    }
    } else {
        card0.classList.remove("flipped")
        card0.textContent = `🂠`
        card1.classList.remove("flipped")
        card1.textContent = `🂠`
        card2.classList.remove("flipped")
        card2.textContent = `🂠`
    }
}

// Function to set time on showing/hiding CARDS. Creates a buffer time to show cards before hiding. Waiter example! NB STRICTLY LINKED to REVEAL
function sleep (ms) {
    return new Promise(r => setTimeout (r,ms))
}

// function to randomize position. NB ARRAY!!!
async function shuffle() {
    let shuffleIndex1;
    let shuffleIndex2;
    let tempPosition;
    const cards = [card0, card1, card2];

    // POSITION EXCHANGE 1
    shuffleIndex1 = Math.floor(Math.random() * 3);    
    shuffleIndex2 = Math.floor(Math.random() * 3);
    // Array to stock variables and call them easily without repetitive if...else
    //temp variable to stock position of card (3glass exercise C#)
    tempPosition = cards [shuffleIndex1].style.left;
    cards[shuffleIndex1].style.left = cards[shuffleIndex2].style.left;
    cards[shuffleIndex2].style.left = tempPosition;
    // richiamare funzione sleep() tra un movimento di carte e l'altro
    await sleep(600);

    // POSITION EXCHANGE 2
    shuffleIndex1 = Math.floor(Math.random() * 3);    
    shuffleIndex2 = Math.floor(Math.random() * 3);
    // Array to stock variables and call them easily without repetitive if...else
    //temp variable to stock position of card (3glass exercise C#)
    tempPosition = cards [shuffleIndex1].style.left;
    cards[shuffleIndex1].style.left = cards[shuffleIndex2].style.left;
    cards[shuffleIndex2].style.left = tempPosition;
    // richiamare funzione sleep() tra un movimento di carte e l'altro
    await sleep(600);

    // POSITION EXCHANGE 3
    shuffleIndex1 = Math.floor(Math.random() * 3);    
    shuffleIndex2 = Math.floor(Math.random() * 3);
    // Array to stock variables and call them easily without repetitive if...else
    //temp variable to stock position of card (3glass exercise C#)
    tempPosition = cards [shuffleIndex1].style.left;
    cards[shuffleIndex1].style.left = cards[shuffleIndex2].style.left;
    cards[shuffleIndex2].style.left = tempPosition;
    // richiamare funzione sleep() tra un movimento di carte e l'altro
    await sleep(600);

    // POSITION EXCHANGE 4
    shuffleIndex1 = Math.floor(Math.random() * 3);    
    shuffleIndex2 = Math.floor(Math.random() * 3);
    // Array to stock variables and call them easily without repetitive if...else
    //temp variable to stock position of card (3glass exercise C#)
    tempPosition = cards [shuffleIndex1].style.left;
    cards[shuffleIndex1].style.left = cards[shuffleIndex2].style.left;
    cards[shuffleIndex2].style.left = tempPosition;
    // richiamare funzione sleep() tra un movimento di carte e l'altro
    await sleep(600);
}

// function BASIC CORE GAME
async function startGame() {
    // 1. calling specialIndex: no let because already out in Événement, to call no to create
    specialIndex = Math.floor(Math.random() * 3);
    // 2. show the cards
    reveal(true);
    // 3. pause to see cards
    await sleep (1000);
    // 4. turn cards and hide 
    reveal (false);
    // 5. suffle cards
    await shuffle()
    // 6. add .clickable class to cards
    card0.classList.add(`clickable`)
    card1.classList.add(`clickable`)
    card2.classList.add(`clickable`)
}

// function WIN CONDITION
function win() {
    card0.classList.remove(`clickable`)
    card1.classList.remove(`clickable`)
    card2.classList.remove(`clickable`)
    myStatus.textContent = `MAMMA MIA!! You have find the card, congrats!`
    chips += bet
    myScore.textContent = `Chips: ${chips}`
    myBtn.disabled = true
}
//Function LOST CONDITION
function loose() {
    card0.classList.remove(`clickable`)
    card1.classList.remove(`clickable`)
    card2.classList.remove(`clickable`)
    myStatus.textContent = `DAMN!! Wrong one, try again!`
    chips -= bet
    myScore.textContent = `Chips: ${chips}`
    myBtn.disabled = true
    if (chips <= 0) {
        myStatus.textContent = `Sorry, you lost the game :/`
        myBtn.disabled = true;
        betPlus.disabled = true;
        betMinus.disabled = true;   
    } 
}

// =================================
// 🧲 4. Événements (interactions)
// =================================
let specialIndex = Math.floor(Math.random() * 3);
// console.log(specialIndex);

createCard()
myBtn.addEventListener(`click`, function () {
    // to check if there is a bet or not
    if (bet>0){
        startGame()
    } else {
        myBet.textContent = `Please place a bet before playing! (min. 10 Chips)`
    }
});

// aggioramenti testi score e bet
    myScore.textContent = `Chips: ${chips}`
    myBet.textContent = `You have bet ${bet} chips.`
    
    betPlus.addEventListener(`click`, function () {
        if (bet <= chips ) {
            bet += 10
            myBet.textContent = `You have bet ${bet} chips.`
            myBtn.disabled = false;
            } else {
            myBet.textContent = `You don't have enough chips to bet!`   
            }
    });

    betMinus.addEventListener(`click`, function () {
        if (bet > 10){
        bet-= 10;
        myBet.textContent = `You have bet ${bet} chips.`
        myBtn.disabled = false;
        } else {
            // to avoid bet under 0
            myBet.textContent = `Minimum bet 10 chips!`
        }
    });


    // evento CORE, al click 
table.addEventListener(`click`, async function (event) {
    // is the card clickable?
    if (event.target.matches(`.clickable`)) {
        // if i get the attribute of the card, is it the same of the ⭐?
        let clickedIndex = event.target.getAttribute(`data-index`)
        // //flip card to reveal
        // event.target.classList.add(`flipped`)
        //CONDITION:
        if (Number(clickedIndex) === specialIndex){
            reveal(true)
            win()
            await sleep (2000)
        } else {
            reveal(true)
            loose()
            await sleep (2000)
        }
        myStatus.textContent = `Place a new bet and try again!`
    }
});







    
