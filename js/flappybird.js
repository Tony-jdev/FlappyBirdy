//BOARD AND OTHER EQUIPMENT
let pipeheight = 580, moveupY = 0, gravity = 0.5, score = 0, gameover = false;
let board = document.querySelector("#board");
let context = board.getContext("2d");
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
let pipes = [];

window.onload = function () {
    board = UpdateWindow();

    context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);

    StartExecution();
}

function animate() {
    requestAnimationFrame(animate);

    if (gameover) return;

    context.clearRect(0, 0, board.width, board.height);
    moveupY -= gravity;
    bird.y -= moveupY;

    console.log(board.height);
    if (bird.y > board.height) {
        gameover = true;
        context.clearRect(0, 0, board.width, board.height);
    }

    context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);

    for (let i = 0; i < pipes.length; i++) {
        let pipe = pipes[i];
        pipe.x -= 2.5;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            pipe.passed = true;
            score += 0.5;
        }

        if (detectTouch(bird, pipe)) {
            gameover = true;
            context.clearRect(0, 0, board.width, board.height);
            context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
            return;
        }
    }

    context.fillStyle = "white";
    context.font = "50px Calibri";
    context.fillText(score, 5, 45);
}

function setPipes() {
    let randomPosY = Math.random() * (pipeheight / 2) - pipeheight / 2;
    let openspace = board.height / 4.5;

    let topPipe = new Pipe(window.innerWidth, randomPosY, pipetopImage);
    pipes.push(topPipe);

    let bottomPipe = new Pipe(window.innerWidth, randomPosY + pipeheight + openspace, pipebottomImage);
    pipes.push(bottomPipe);

    while (pipes.length > 0 && pipes[0].x - 100 < 0) {
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
    if (e.code == "Space") moveupY = 10;
}

//Preset functions
function UpdateWindow() {
    board.height = window.innerHeight;
    board.width = window.innerWidth;
    return board;
}
function StartExecution() {
    document.addEventListener("keypress", moveFlappy);
    setInterval(setPipes, 2900);
    requestAnimationFrame(animate);
}

