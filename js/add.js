trList = document.getElementsByTagName('tr')
fieldList = document.querySelectorAll("td .field")
for(let field of fieldList){
    field.addEventListener("focus", removeR)
    field.addEventListener("blur", addR)
    field.addEventListener("keypress", filterInput)
}

for (let tr of trList) {
    if (!tr.classList.contains("header_tr")) {
        tr.addEventListener('click', (e) => {
            e.target.parentElement.parentElement
                .setAttribute("style", "--bs-table-bg-state: #ffffff;")
        })
        tr.addEventListener('mouseleave', (e) => {
            e.target
                .removeAttribute("style")
        })
    }

    applyPadding(tr)
}

function applyPadding(tr){
    let level = parseInt(tr.dataset.level)
    if(level<0)
        level = 0;
    let padding = 32
    padding = 32 + 16*level
    if(tr.children[0].querySelector(".field")) {
        tr.children[0].querySelector(".field").setAttribute("style", "padding-left: " + padding + "px!important")
    }
}

var mySVG = document.getElementsByClassName("delete")
for (let delete_icon of mySVG) {
    delete_icon.addEventListener('click', deleteRow)
}
function deleteRow (event) {
    event.target.closest('tr').remove()
}
var plus_list = document.getElementsByClassName('plus')
var folder_list = document.getElementsByClassName('folder')
for (let plus of plus_list) {
    plus.addEventListener('click', addRow)
}
for (let folder of folder_list) {
    folder.addEventListener('click', addFolder)
}
var row_template = document.getElementById('row_template')
var folder_template = document.getElementById('folder_template')
var tbody = document.getElementById('tbody')
function addRow (e) {
    tr = e.target.parentElement.parentElement
    let row = row_template.cloneNode(true)
    row.removeAttribute('id')
    let del = row.querySelector(".delete")
    del.addEventListener('click', deleteRow)
    let level = tr.dataset.level
    row.dataset.level = parseInt(level) + 1
    applyPadding(row)
    tr.after(row)
}
function addFolder(e){
    tr = e.target.parentElement.parentElement
    let row = folder_template.cloneNode(true)
    row.removeAttribute('id')
    let plus = row.querySelector(".plus")
    plus.addEventListener('click', addRow)
    let folder = row.querySelector(".folder")
    folder.addEventListener('click', addFolder)
    let arrow = row.querySelector(".arrow")
    arrow.addEventListener('click', toggleExpandCollapse)
    let level = tr.dataset.level
    row.dataset.level = parseInt(level) + 1
    applyPadding(row)
    tr.after(row)
}

var arrows = document.getElementsByClassName("arrow")
for(let arrow of arrows){
    arrow.addEventListener("click", toggleExpandCollapse)
}

function toggleExpandCollapse(e){
    if(e.target.classList.contains("arrow_right")){
        e.target.classList.remove('arrow_right')
        expand(e.target.closest('tr'))
    } else {
        e.target.classList.add('arrow_right')
        collapse(e.target.closest('tr'))
    }
}
function expand(tr){
    let level = parseInt(tr.dataset.level)
    while(parseInt(tr.nextElementSibling.dataset.level) != level){
        tr = tr.nextElementSibling
        tr.style.display = ""
    }
}


function collapse(tr){
    let level = parseInt(tr.dataset.level)
    while(parseInt(tr.nextElementSibling.dataset.level) > level){
        tr = tr.nextElementSibling
        if(tr.children[0].children[0].classList.contains('arrow_right'))
            tr.children[0].children[0].classList.remove('arrow_right')
        tr.style.display = "none"
    }
}

function removeR(e){
    let a =  e.target.innerText.slice(0, -2).replaceAll(/\s/g, '').replaceAll(",", ".")
    console.log(a);
    e.target.innerText = parseFloat(
        a
    ).toFixed(2)
}
function addR(e){
    let num = Math.floor(parseFloat(e.target.innerText)).toLocaleString();
    let non_integer_part = parseFloat(e.target.innerText).toFixed(2).toString().slice(-3);
    e.target.innerText = (num+non_integer_part).replace(".", ",") + " ₽"
}

function filterInput(e){
    let theEvent = e || window.event
    if (theEvent.type === 'paste') {
        var key = event.clipboardData.getData('text/plain')
    } else {
        var key = theEvent.keyCode || theEvent.which
        key = String.fromCharCode(key)
    }
    let regex = /[0-9]|\./
    if( !regex.test(key) ) {
        theEvent.returnValue = false
        if(theEvent.preventDefault) {
            theEvent.preventDefault()
            return false
        }
    }
}