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
    "Press SPACE to start":"Нажміть SPACE для старту"
}

let menu_bat_wisible = true;

//Menu functions
function openMenu(e){
    //menu_bat_wisible = false;
    //UpdateShowMenuButton();
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
    //menu_bat_wisible = false;
    //UpdateShowMenuButton();
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
    //menu_bat_wisible = true;
   // UpdateShowMenuButton();
   ClearMenu();
   StartExecution();
}

function Settings(){
    ClearMenu();
    let mns = document.querySelector("#menues");
    let mainDiv = document.createElement('div');
    mainDiv.className = "menu-bar";

    let music = createCheckBox( GetTranslated("Music"), "cbd", ChangeAudio);
    let languagesDiv = createSelect(GetTranslated("Language"), "sd", languages, ChangeLng, ThisLng, "Language");
    let back = createButton(GetTranslated("Back"),"b in",openMenu);

    mainDiv.appendChild(music);
    mainDiv.appendChild(languagesDiv);
    mainDiv.appendChild(back);

    mns.appendChild(mainDiv);
}
function Mods(){

    
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
    //UpdateMenuButton();
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
function UpdateShowMenuButton()
{
    menu_bat_wisible ?
    document.querySelector('.ba.menu').style.opacity = 1 :
    document.querySelector('.ba.menu').style.opacity = 0
}