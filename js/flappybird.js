//SOUNDS
const s_score = new Audio();
s_score.src = "./music/s_point.wav";
const s_hit = new Audio();
s_hit.src = "./music/s_hit.wav";
//BOARD AND OTHER EQUIPMENT
let moveupY = 0, gravity = 0.5, score = 0, gameover = false, pipesfuncId, animationfuncId, started = false, soundon = true, paused = false;
let presssart = "Click to start";
let board = document.querySelector("#board");
let context;
let bird = {
    x: window.innerWidth / 6,
    y: window.innerHeight / 3,
    width: 68,
    height: 44,
    imgsrc: "./images/flappybird.png"
}
//IMAGES 
const birdImage = new Image(), pipetopImage = new Image(), pipebottomImage = new Image();
birdImage.src = bird.imgsrc;
pipetopImage.src = "./images/pipetop.png";
pipebottomImage.src = "./images/pipebottom.png";
//PIPE
let pipes = [];
let pipeheight = (window.innerHeight * 2) / 3;
class Pipe {
    x = window.innerWidth;
    y = 0;
    width = 100;
    height = pipeheight;
    img;
    passed = false;
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
    }
}
//WINDOW FUNCTIONS
window.onresize = () => {
    UpdateWindow();
    if (!started) {
        context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
        context.font = "25px Calibri";
        context.fillText(GetTranslated(presssart), board.width / 2 - textWidth / 1.35, window.innerHeight / 2 - 50);
    }
}
window.onload = function () {
    board = UpdateWindow();
    UpdateMenuButton();
    
    context.fillStyle = "white";
    context.font = "25px Calibri";
    textWidth = context.measureText(presssart).width;
    context.fillText(GetTranslated(presssart), board.width / 2 - textWidth / 1.35, window.innerHeight / 2 - 50);

    context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);

    board.addEventListener("click", moveFlappy);
}
document.addEventListener("visibilitychange", function (event) {
    openMenu();
});
document.addEventListener("keypress", function (e) {
    if(e.code == "Space" && !paused){
        moveFlappy();
    }
    else if(!paused){
        openMenu();
    }
    else if(paused && started){
        ClearMenu();
        StartExecution();
    }else if(paused){
        paused = false;
        ClearMenu();
    }
});
//GAME FUNCTIONS
function animate() {
    if (gameover) {
        StopExecution();
        GameOvered();
        return;
    }
    animationfuncId = requestAnimationFrame(animate);

    context.clearRect(0, 0, board.width, board.height);
    moveupY -= gravity;
    bird.y -= moveupY;

    if (bird.y > board.height) {
        gameover = true;
        context.clearRect(0, 0, board.width, board.height);
        if (soundon) s_hit.play();
    }

    context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);

    for (let i = 0; i < pipes.length; i++) {
        let pipe = pipes[i];
        pipe.x -= 2.7;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            pipe.passed = true;
            score += 0.5;
            if (soundon) s_score.play();
        }

        if (detectTouch(bird, pipe)) {
            gameover = true;
            context.clearRect(0, 0, board.width, board.height);
            context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
            if (soundon) s_hit.play();
            return;
        }
    }

    context.font = "50px Calibri";
    context.fillText(score, 5, 45);
}

function setPipes() {
    let randomPosY = Math.random() * (pipeheight / 2) - pipeheight / 2;
    let openspace = board.height / 4.1;

    let topPipe = new Pipe(window.innerWidth, randomPosY, pipetopImage);
    pipes.push(topPipe);

    let bottomPipe = new Pipe(window.innerWidth, randomPosY + pipeheight + openspace, pipebottomImage);
    pipes.push(bottomPipe);

    while (pipes.length > 0 && pipes[0].x + 100 < 0) {
        pipes.shift();
    }
}
function detectTouch(bird, pipe) {
    return bird.x < pipe.x + pipe.width &&
        bird.x + bird.width > pipe.x &&
        bird.y < pipe.y + pipe.height &&
        bird.y + bird.height > pipe.y;
}

function moveFlappy(e) {
    if (!started) StartExecution();
    moveupY = 10;
}

//Preset functions
function UpdateWindow() {
    board.height = window.innerHeight;
    board.width = window.innerWidth;
    context = board.getContext("2d");
    context.fillStyle = "white";
    return board;
}
function StartExecution() {
    started = true;
    paused = false;
    pipesfuncId = setInterval(setPipes, 3000);
    requestAnimationFrame(animate);
    board.addEventListener("click", moveFlappy);
}
function StopExecution() {
    paused = true;
    clearInterval(pipesfuncId);
    cancelAnimationFrame(animationfuncId);
    board.removeEventListener("click", moveFlappy);
}
function ResetSession() {
    StopExecution();
    context.clearRect(0, 0, board.width, board.height);
    pipes = [];
    gameover = false;
    started = false;
    paused = false;
    bird.x = window.innerWidth / 6;
    bird.y = window.innerHeight / 3;

    context.font = "25px Calibri";
    textWidth = context.measureText(presssart).width;
    context.fillText(GetTranslated(presssart), board.width / 2 - textWidth / 1.35, window.innerHeight / 2 - 50);
    context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);

    score = 0;

    board.addEventListener("click", moveFlappy);
}

function SwitchSound() {
    soundon = !soundon;
}
function ChangeVolume(volume){
    s_hit.volume = volume;
    s_score.volume = volume;
}

