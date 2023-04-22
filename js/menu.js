


function openMenu(e){
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

function PlayAudio()
{
    var audio = new Audio('audio_file.mp3');
    audio.play();
    
}

function Play(){
    ClearMenu();
}

let languages = ["Ukrainian", "English"];
let wordsSet = {
    "Play":"Грати",
    "Settings":"Налаштування",
    "Mods":"Моди",
    "Exit":"Вихід",
    "Menu":"Меню",
    "Back":"Назад",
    "Music":"Музика",
    "Language":"Мова"
}

let ThisLng = languages[0];

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

function Settings(){
    ClearMenu();
    let mns = document.querySelector("#menues");
    let mainDiv = document.createElement('div');
    mainDiv.className = "menu-bar";

    let music = createCheckBox( GetTranslated("Music"), "cbd");
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
function ClearMenu()
{
    document.querySelector('#menues').innerHTML = "";
}