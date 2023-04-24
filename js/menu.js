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
    "Sounds":"Звуки",
    "Language":"Мова",
    "Restart":"Спробувати ще",
    "Sc☺re":"Рахун☺к",
    "Game over":"Кінець гри",
    "Click to start":"Нажміть для старту",
    "Change":"Змінити"
}

let menu_bat_wisible = true;

const regex = /\.jpe?g|png|gif$/i;


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
    let sounds = createCheckBox( GetTranslated("Sounds"), "cbd", SwitchSound, true);
    let languagesDiv = createSelect(GetTranslated("Language"), "sd", languages, ChangeLng, ThisLng, "Language");
    let back = createButton(GetTranslated("Back"),"b in",openMenu);

    mainDiv.appendChild(music);
    mainDiv.appendChild(sounds);
    mainDiv.appendChild(languagesDiv);
    mainDiv.appendChild(back);

    mns.appendChild(mainDiv);
}

async function Mods(){
    ClearMenu();
    let mns = document.querySelector("#menues");
    let mainDiv = document.createElement('div');
    let imgs_div = document.createElement('div');
    let elems_div = document.createElement('div');
    let bts_div = document.createElement('div');

    imgs_div.className = "img-div";
    elems_div.className = "img-div";
    bts_div.className = "img-div c";
    mainDiv.className = "menu-bar c";

    let list = [];

    try
    {
        const value = await getFileNamesFromFolder("images", regex) 
        {
            for (const it of value) {
                list.push(it);
            }
        };
    }
    catch(error)
    {
        console.log(error);
    }
    
    let list_els = [
        "Background",
        "Bird",
        "TopPipe",
        "BottomPipe"
    ]
   
    var img = document.getElementById('board'),
    style = img.currentStyle || window.getComputedStyle(img, false),
    bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
    let list_vs = [
        bi,
        birdImage.src,
        pipetopImage.src,
        pipebottomImage.src
    ]

    let obj_list = [];
    for (let i of list) {
        const img = createObjDiv(i, "image");
        obj_list.push(imgs_div.appendChild(img));
    }

    for (const i of obj_list) {
        i.onclick = ()=>{UpdateClass("image","image s", i, "selected", obj_list);}
    }

    let obj_list2 = [];
    for (let i = 0; i < list_els.length; i++) {
        const img = createObjDivT(list_vs[i], "image", list_els[i]);
        obj_list2.push(elems_div.appendChild(img));
    }
    for (const i of obj_list2) {
        i.onclick = ()=>{UpdateClass("image","image s", i, "selected", obj_list2);}
    }

    let b_change;
    if(!started)
    {
        b_change = createButton(GetTranslated("Change"), "b in", ()=>{ChangeImgs(obj_list2, obj_list);});
        bts_div.appendChild(b_change);
    }

    let b_esc = createButton(GetTranslated("Back"), "b in", openMenu);
    bts_div.appendChild(b_esc);

    mainDiv.appendChild(elems_div);
    mainDiv.appendChild(bts_div);
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

function ChangeImgs(list_f, list_s)
{
    let f = "Non";
    let s = "Non";

    for (const i of list_f) {
        if(i.id === "selected")
        {
            f = i;
            break;
        }
    }
    for (const i of list_s) {
        if(i.id === "selected")
        {
            s = i;
            break;
        }
    }
    if(f !== "Non" && s !== "Non")
    {
        switch(f.children[1].innerHTML)
        {
            case "Background": document.querySelector('#board').style.backgroundImage = 'url('+s.children[0].src+')'; break;
            case "Bird": birdImage.src = s.children[0].src; break;
            case "TopPipe": pipetopImage.src = s.children[0].src; break;
            case "BottomPipe": pipebottomImage.src = s.children[0].src; break;
        }
        ClearMenu();
        Mods();
    }

}

let testL = [];

function getFileNamesFromFolder(folderPath, regex) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: folderPath,
        success: function(data) {
          const fileNames = [];
          $(data).find('a').attr('href', function(i, val) {
            if (val.match(regex)) {
              fileNames.push(val);
            }
            testL = fileNames;
          });
          resolve(fileNames);
        },
        error: function(err) {
          reject(err);
        }
      });
    });
  }