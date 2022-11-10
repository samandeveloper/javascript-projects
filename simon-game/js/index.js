let order = [];         
let playerOrder = [];  
let flash;              
let turn;              
let good;              
let compTurn;        
let intervalId;       
let strict = false;   
let noise = true;     
let on = false;      
let win;              

const turnCounter = document.querySelector("#turn");      
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

strictButton.addEventListener('click', (event) => {     //strict button
  if(strictButton.checked === true){
    strict = true
  }else{
    strict = false
  }
});

onButton.addEventListener('click', (event) => {     //power button
  if(onButton.checked === true){
    on = true
    turnCounter.innerHTML = "_" 
  }else{
    on = false
    turnCounter.innerHTML = "" 
    clearColor()
    clearInterval(intervalId)
  }
});

startButton.addEventListener('click', (event) => {
  if(on === true || win === true){    //startbutton clicks then if the power button clicks OR after user wins
    play()
  }
});

function play() {
  order = []
  playerOrder = []
  flash = 0
  win = false
  intervalId = 0
  turn = 1      //when games begins count = 1
  turnCounter.innerHTML = 1
  good = true   //user not making mistakes
  for(let i=0 ; i < 20 ; i++){    //game repeated 20 times
    let randomNumber = Math.floor((Math.random()*4)+1)    //choose the random number between 1 and 4
    order.push(randomNumber)    //push the random number to the order new array 
  }
  compTurn = true   //it's computer turn
  intervalId = setInterval(gameTurn , 800)    //each color flashes every 800ms 
}

function gameTurn() {
  on = false
  if(flash === turn){   //every light flashes count times--means it's user time not the computer turn
    clearInterval(intervalId) //no flashes happen
    compTurn = false  //not computer time
    clearColor()
    on = true   //game is on
  }

  if(compTurn === true){    //if it's computer turn
    clearColor()
    setTimeout(() => {
      if(order[flash] === 1){     //green
        one()
      }
      if(order[flash] === 2){     //red
        two()
      }
      if(order[flash] === 3){     //yellow
        three()
      }
      if(order[flash] === 4){     //blue
        four()
      }
      console.log(flash)    //flash = 0 for the first time
      flash++
      console.log(flash)    //E.g. count = 1 so flash = 1
    },200)
  }
}

function one() {
  if(noise === true){
    let audio = document.getElementById("clip1")
    audio.play()
  }
  noise = true
  topLeft.style.backgroundColor = "lightgreen";   //after 200ms the flash is off 
}

function two() {
  if(noise === true){
    let audio = document.getElementById("clip2")
    audio.play()
  }
  noise = true
  topRight.style.backgroundColor = "tomato";
}

function three() {
  if(noise === true){
    let audio = document.getElementById("clip3")
    audio.play()
  }
  noise = true
  bottomLeft.style.backgroundColor = "yellow";
}

function four() {
  if(noise === true){
    let audio = document.getElementById("clip4")
    audio.play()
  }
  noise = true
  bottomRight.style.backgroundColor = "lightskyblue";
}

function clearColor(){    //no color
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomLeft.style.backgroundColor = "goldenrod";
  bottomRight.style.backgroundColor = "darkblue";
}


function flashColor() {
  topLeft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "tomato";
  bottomLeft.style.backgroundColor = "yellow";
  bottomRight.style.backgroundColor = "lightskyblue";
}

topLeft.addEventListener("click", (e) => {    
  if(on === true){
    playerOrder.push(1)
    one()
    check()
    if(!win){
      setTimeout(()=>{
        clearColor()
      },300)
    }
  }
})


topRight.addEventListener("click", (e) => {    
  if(on === true){
    playerOrder.push(2)
    two()
    check()
    if(!win){
      setTimeout(()=>{
        clearColor()
      },300)
    }
  }
})

bottomLeft.addEventListener("click", (e) => {  
  if(on === true){
    playerOrder.push(3)
    three()
    check()
    if(!win){
      setTimeout(()=>{
        clearColor()
      },300)
    }
  }
})

bottomRight.addEventListener("click", (e) => {    
  if(on === true){
    playerOrder.push(4)
    four()
    check()
    if(!win){
      setTimeout(()=>{
        clearColor()
      },300)
    }
  }
})

function check(){     //three states happens
  //1.When user is wrong --describe the good = false -- playerOrder.length-1 = from 0 to 19
  if(playerOrder[playerOrder.length-1] !== order[playerOrder.length-1]){
    good = false
    flashColor()    //all the colors flashes when user is wrong
    turnCounter.innerHTML = "NO!";
    setTimeout(()=>{
      turnCounter.innerHTML = turn;
      clearColor()

      //if the strict mode is one
      if(strict === true){
        play()    //count countinues
      }else{    //if the strict mode is off--game starts over
        compTurn = true
        flash = 0
        playerOrder = []
        good = true   //user is right again--don't count one mistake
        intervalId = setInterval(gameTurn, 800);
      }
    },800)
    noise = false       //when user is wrong there shouldn't be any noise
  }   

  //2. when user wins the game
  if(good === true && playerOrder.length === 3){  //3 or 20
    winGame()
  }  

  //3. when user is good === true but the game is on and user still playing and not win
  if(good === true && turn === playerOrder.length && !win){
    turn++    //add to count
    compTurn = true;
    playerOrder = [];
    flash = 0
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);    //continue flashing
  }
}  


function winGame() {
  flashColor();   //all the flashes turn on 
  turnCounter.innerHTML = "WIN!";
  on = false;   //game is over
  win = true;   //user win the game
}






