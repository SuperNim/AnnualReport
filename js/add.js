trList = document.getElementsByTagName('tr')
fieldList = document.querySelectorAll("td .field")
attachEventsToFieldList(fieldList)
function attachEventsToFieldList(fieldList){
    for(let field of fieldList) {
        field.addEventListener("focus", removeR)
        field.addEventListener("blur", addR)
        field.addEventListener("keypress", filterInput)
    }
}

for (let tr of trList) {
    applyPadding(tr)
}

function applyPadding(tr){
    let level = parseInt(tr.dataset.level)
    if(level<0)
        level = 0;
    let padding = 32
    padding = 32 + 16*level
    let left = 15 + 16*level
    if(tr.children[0].querySelector(".field")) {
        tr.children[0].querySelector(".field").setAttribute("style", "padding-left: " + padding + "px")
    }
    if(tr.children[0].querySelector(".arrow")) {
        tr.children[0].querySelector(".arrow").setAttribute("style", "left: " + left + "px")
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
const row_template = document.getElementById('row_template');
const folder_template = document.getElementById('folder_template');
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
    let fieldList = row.querySelectorAll("td .field")
    attachEventsToFieldList(fieldList)
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
    let fieldList = row.querySelectorAll("td .field")
    attachEventsToFieldList(fieldList)
    tr.after(row)
}

const arrows = document.getElementsByClassName("arrow");
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
function getNumberFromField(field){
    let number =  field.innerText.slice(0, -2).replaceAll(/\s/g, '').replaceAll(",", ".")
    let result = parseFloat(number).toFixed(2)
    return result
}

function getStringFromNumber(number){
    let num = Math.floor(parseFloat(number)).toLocaleString()
    let non_integer_part = parseFloat(number).toFixed(2).toString().slice(-3)
    return (num+non_integer_part).replace(".", ",") + " ₽"
}

function removeR(e){
    e.target.innerText = getNumberFromField(e.target)
    calcTable()
}
function addR(e){
    e.target.innerText = getStringFromNumber(e.target.innerText)
}

function filterInput(e){
    let theEvent = e || window.event
    let key
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain')
    } else {
        key = theEvent.keyCode || theEvent.which
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

let sort_button = document.getElementById("sort")
sort_button.addEventListener("click", changeSortingTypeAndSort)

function changeSortingTypeAndSort(e){
    if(e.target.classList.contains("arrow_sorting_number")){
        e.target.classList.remove("arrow_sorting_number")
        e.target.classList.add("arrow_sorting_az")
        //sortAZ()
    } else {
        e.target.classList.remove("arrow_sorting_az")
        e.target.classList.add("arrow_sorting_number")
        //sortNumber()
    }
}

function sortAZ(){
    console.log("az")

    let trs = document.getElementsByTagName("tr")
    console.log(trs);
    tbody.appendChild(trs[0]);
    for(let i = trs.length-1; i > 0; i--){
        tbody.appendChild(trs[i])
    }
}

function sortNumber(){
    console.log("number")
}


calcTable()
function calcTable(){

    for(const [tr_index, tr] of Array.from(tbody.children).entries()){
        if(tr_index == 0)
            continue
        let sum = 0

        for(const [index, td] of Array.from(tr.children).entries()) {
            if(index < 2)
                continue
            let el
            if (td.children.length > 0 && td.children[0].classList.contains("field")) {
                el = td.children[0]
            } else {
                el = td
            }
            let number = parseFloat(getNumberFromField(el))
            sum += number
        }
        console.log(sum);
        let result_td = tr.children[1]
        let el
        if (result_td.children.length > 0 && result_td.children[0].classList.contains("field")) {
            el = result_td.children[0]
        } else {
            el = result_td
        }
        el.innerHTML = getStringFromNumber(sum)

    }
}