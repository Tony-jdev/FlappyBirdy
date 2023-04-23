//Set Up
let languages = ["Ukrainian", "English"];
let ThisLng = languages[0];

var audio = new Audio('music/Default.mp3');
let AudioOn = false;

let wordsSet = {
    "Play":"Грати",
    "Settings":"Налаштування",
    "Mods":"Моди",
    "Exit":"Вихід",
    "Menu":"Меню",
    "Back":"Назад",
    "Music":"Музика",
    "Language":"Мова",
    "Restart":"Спробувати ще",
    "Sc☺re":"Рахун☺к",
    "Game over":"Кінець гри",
    "Click to start":"Нажміть для старту"
}

let menu_bat_wisible = true;



//Menu functions
function openMenu(e){
    StopExecution();
    ClearMenu();
    let mns = document.querySelector("#menues");
    let mainDiv = document.createElement('div');
    mainDiv.className = "menu-bar";
    let fns = [Play , Settings , Mods , Exit];
    let it = 0;
    for (const i of fns) {
        let b = createButton(GetTranslated(i.name),"b in", i);
        mainDiv.appendChild(b);
        ++it;
    }
    mns.appendChild(mainDiv);
}

function GameOvered()
{
    ClearMenu();
    let mns = document.querySelector("#menues");
    let mainDiv = document.createElement('div');
    let resDiv = document.createElement('div');
    mainDiv.className = "menu-bar jc";
    resDiv.className = "game-over";
    let res = printResults(score, 'res-h');
    let restart_b = createButton(GetTranslated("Restart"), "b in r", ()=>{ResetSession(); ClearMenu();});
    resDiv.appendChild(res);
    resDiv.appendChild(restart_b);
    mainDiv.appendChild(resDiv);
    mns.appendChild(mainDiv);
    score = 0;
}

function Play(){
   ClearMenu();
   StartExecution();
}

function Settings(){
    ClearMenu();
    let mns = document.querySelector("#menues");
    let mainDiv = document.createElement('div');
    mainDiv.className = "menu-bar";

    let music = createCheckBox( GetTranslated("Music"), "cbd", ChangeAudio);
    let sounds = createCheckBox( GetTranslated("Sounds"), "cbd", OfSounds);
    let languagesDiv = createSelect(GetTranslated("Language"), "sd", languages, ChangeLng, ThisLng, "Language");
    let back = createButton(GetTranslated("Back"),"b in",openMenu);

    mainDiv.appendChild(music);
    mainDiv.appendChild(sounds);
    mainDiv.appendChild(languagesDiv);
    mainDiv.appendChild(back);

    mns.appendChild(mainDiv);
}

function Mods(){
    ClearMenu();
    let mns = document.querySelector("#menues");
    let mainDiv = document.createElement('div');
    let imgs_div = document.createElement('div');
    let elems_div = document.createElement('div');

    imgs_div.className = "img-div";
    elems_div.className = "img-div";

    mainDiv.className = "menu-bar c";

    let list = [
        "images/pipebottom.png",
        "images/pipetop.png",
        "images/pipebottom.png",
        "images/pipetop.png",
        "images/pipebottom.png",
        "images/pipetop.png",
        "images/BirdSkins/flappybird.png"
    ]
    let list_els = [
        "Background",
        "Bird",
        "TopPipe",
        "BottomPipe"
    ]
    let list_vs = [
        backgroundImage.src,
        birdImage.src,
        pipetopImage.src,
        pipebottomImage.src
    ]

    let obj_list = [];
    for (const i of list) {
        const img = createObjDiv(i, "image");
        obj_list.push(imgs_div.appendChild(img));
    }
    for (const i of obj_list) {
        i.onclick = ()=>{UpdateClass("image","image s", i, "selected", obj_list);}
    }

    let obj_list2 = [];
    for (let i = 0; i < list_els.length; i++) {
        const img = createObjDivT(list_vs[i], "image p", list_els[i]);
        obj_list2.push(elems_div.appendChild(img));
    }
    for (const i of obj_list2) {
        i.onclick = ()=>{UpdateClass("image p","image s", i, "selected", obj_list2);}
    }

    mainDiv.appendChild(elems_div);
    mainDiv.appendChild(imgs_div);
    mns.appendChild(mainDiv);
    
}
function Exit()
{
    window.close();
}

//other
function ChangeAudio()
{
    AudioOn = !AudioOn;
    AudioOn ? audio.play() : audio.pause();
}

function ChangeLng()
{
    ThisLng = document.querySelector("#Language").value;
    UpdateMenuButton();
    ClearMenu();
    Settings();
}

function UpdateMenuButton()
{
    let b = document.querySelector(".ba.menu");
    b.innerHTML = GetTranslated("Menu");
}

function GetTranslated(english_variant)
{
    for (const key in wordsSet) {
        if(key == english_variant)
        {
            if(ThisLng == languages[1])
            return key;
            else if(ThisLng == languages[0])
            return wordsSet[key];
        }
    }
    return "Default( " + english_variant + " )";
}

function ClearMenu()
{
    document.querySelector('#menues').innerHTML = "";
}
