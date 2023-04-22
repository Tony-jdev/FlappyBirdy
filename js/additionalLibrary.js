function createButton(value, clas, func)
{
    let button = document.createElement('button');
    button.innerHTML = value;
    button.className = clas;
    button.onclick = func;
    return button;
}

function createSelect(labelName, divClass, values, changeFunc)
{
    let m_div = document.createElement('div');
    m_div.className = divClass;
    let lb = document.createElement('label');
    lb.htmlFor = labelName;
    lb.innerHTML = labelName;
    let select = document.createElement('select');
    select.name = labelName;
    select.id = labelName;
    select.onchange = changeFunc;
    for (const i of values) {
        const o = document.createElement('option');
        o.value = i;
        o.innerHTML = i;
        select.appendChild(o);
    }
    m_div.appendChild(lb);
    m_div.appendChild(select);
    return m_div;
}
function createSelect(labelName, divClass, values, changeFunc, selected_key)
{
    let m_div = document.createElement('div');
    m_div.className = divClass;
    let lb = document.createElement('label');
    lb.htmlFor = labelName;
    lb.innerHTML = labelName;
    let select = document.createElement('select');
    select.name = labelName;
    select.id = labelName;
    select.onchange = changeFunc;
    for (const i of values) {
        const o = document.createElement('option');
        o.value = i;
        o.innerHTML = i;
        if(i === selected_key)
        o.selected = true;
        else o.selected = false;
        select.appendChild(o);
    }
    m_div.appendChild(lb);
    m_div.appendChild(select);
    return m_div;
}
function createSelect(labelName, divClass, values, changeFunc, selected_key, select_id)
{
    let m_div = document.createElement('div');
    m_div.className = divClass;
    let lb = document.createElement('label');
    lb.htmlFor = labelName;
    lb.innerHTML = labelName;
    let select = document.createElement('select');
    select.name = labelName;
    select.id = select_id;
    select.onchange = changeFunc;
    for (const i of values) {
        const o = document.createElement('option');
        o.value = i;
        o.innerHTML = i;
        if(i === selected_key)
        o.selected = true;
        else o.selected = false;
        select.appendChild(o);
    }
    m_div.appendChild(lb);
    m_div.appendChild(select);
    return m_div;
}

function createCheckBox(labelName, divClass)
{
    let m_div = document.createElement('div');
    m_div.className = divClass;
    let lb = document.createElement('label');
    lb.htmlFor = labelName;
    lb.innerHTML = labelName;
    let checkbox = document.createElement('input');
    checkbox.name = labelName;
    checkbox.type = "checkbox";
    checkbox.checked = true;
    m_div.appendChild(lb);
    m_div.appendChild(checkbox);
    return m_div;
}
function createCheckBox(labelName, divClass, ChangeFunc)
{
    let m_div = document.createElement('div');
    m_div.className = divClass;
    let lb = document.createElement('label');
    lb.htmlFor = labelName;
    lb.innerHTML = labelName;
    let checkbox = document.createElement('input');
    checkbox.onchange = ChangeFunc;
    checkbox.name = labelName;
    checkbox.type = "checkbox";
    checkbox.checked = false;
    m_div.appendChild(lb);
    m_div.appendChild(checkbox);
    return m_div;
}
function printResults(score, h_class)
{
    let m_div = document.createElement('div');
    let h = document.createElement('h3');
    h.innerHTML = GetTranslated("Game over")+"<br/>"+GetTranslated("Sc☺re") + ": "+score;
    h.className = h_class;
    m_div.appendChild(document.createElement('hr'));
    m_div.appendChild(h);
    m_div.appendChild(document.createElement('hr'));
    return m_div;
}