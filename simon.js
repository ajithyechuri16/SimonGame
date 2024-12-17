let gameseq=[];
let userseq=[];

let btns=["green", "red", "purple","yellow"];

let started = false;
let level = 0;

let highestScore=0;

let h2=document.querySelector('h2');
let h1=document.querySelector('h1');

document.addEventListener("keypress", function(){
    if(started == false){
        // console.log("Game Started")
        h1.innerText = "Game Started";
        started = true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 300);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    }, 300);
}

function levelUp(){
    userseq = [];
    level++;
    h2.innerText=`Level ${level}`;

    //random btn choose
    let randIdx=Math.floor(Math.random() * 3) + 1;
    let randColor=btns[randIdx];
    let randBtn=document.querySelector( `.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameseq.push(randColor);
    console.log(gameseq); 
    gameFlash(randBtn);
}

function checkAns(idx){
    // console.log(`Current Level : ${level}`);

    if(userseq[idx] === gameseq[idx]){
        if(userseq.length == gameseq.length){
            setTimeout(levelUp, 1000);
        }
    }
    else{
        if(highestScore < level){
            highestScore = level;
        }
        h2.innerHTML=`Game Over ! Your Score was : <b>${level}</b> <br>Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },250);
        reset();
    }
}

function btnPress () {
    console.log(this);
    let btn=this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userseq.push(userColor);
    
    checkAns(userseq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function highestScorefun(){
    h1.innerHTML = `<b> Highest Score : ${highestScore} </b>`;
}

function reset(){
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
    highestScorefun();
}
