trList = document.getElementsByTagName('tr')
fieldList = document.querySelectorAll("td .field")
firstColFieldList = document.querySelectorAll("th .field")
var focusOnNewFolder = false
for(let field of firstColFieldList) {
    field.addEventListener("keypress", checkEnter)
}
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
    row.removeAttribute('class')
    let del = row.querySelector(".delete")
    del.addEventListener('click', deleteRow)
    let level = tr.dataset.level
    row.dataset.level = parseInt(level) + 1
    applyPadding(row)
    let fieldList = row.querySelectorAll("td .field")
    attachEventsToFieldList(fieldList)
    row.querySelector("th .field").addEventListener("keypress", checkEnter)
    row.querySelector("th .field").addEventListener("blur", blurNewFolder)
    tr.after(row)
    row.children[0].querySelector(".field").focus()
    focusOnNewFolder = true
}
function addFolder(e){
    tr = e.target.parentElement.parentElement
    let row = folder_template.cloneNode(true)
    row.removeAttribute('id')
    row.removeAttribute('class')
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
    row.querySelector("th .field").addEventListener("keypress", checkEnter)
    row.querySelector("th .field").addEventListener("blur", blurNewFolder)
    tr.after(row)
    row.children[0].querySelector(".field").focus()
    focusOnNewFolder = true
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
    let number =  field.textContent.trim().slice(0, -2).replaceAll(/\s/g, '').replaceAll(",", ".")
    let result = parseFloat(number).toFixed(2)
    return result
}

function getStringFromNumber(number){

    let num = Math.floor(parseFloat(number)).toLocaleString()
    let non_integer_part = parseFloat(number).toFixed(2).toString().slice(-3)
    if(num === "NaN" || non_integer_part === "NaN")
        return "0.00 ₽"
    return (num+non_integer_part).replace(".", ",") + " ₽"
}

function removeR(e){
    e.target.innerText = getNumberFromField(e.target)
}
function addR(e){
    e.target.innerText = getStringFromNumber(e.target.innerText)
    calcTable()
}

function blurNewFolder(e){
    if(focusOnNewFolder || e.target.innerText == ""){
        e.target.closest("tr").remove()
    }
}
function checkEnter(e){
    if(e.code == "Enter"){
        focusOnNewFolder = false
        e.target.blur()
    }
}

function filterInput(e){
    let theEvent = e || window.event
    let key
    if(theEvent.code == "Enter"){
        e.target.blur()
    }
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain')
    } else {
        key = theEvent.keyCode || theEvent.which
        key = String.fromCharCode(key)
    }
    let regex = /[0-9]|\.|-/
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
        sort(1)
    } else {
        e.target.classList.remove("arrow_sorting_az")
        e.target.classList.add("arrow_sorting_number")
        sort(0)
    }
}
function getPlaceForInsertFromTd(td){
    if (td.children.length > 0 && td.children[0].classList.contains("field")) {
        el = td.children[0]
    } else {
        el = td
    }
    return el
}

calcTable()
function calcTable(){
    tbody = document.getElementById('tbody')

    for(const [tr_index, tr] of Array.from(tbody.children).entries()){
        if(tr_index == 0)
            continue
        let sum = 0

        for(const [index, td] of Array.from(tr.children).entries()) {
            if(index < 2)
                continue
            let el = getPlaceForInsertFromTd(td)
            let number = parseFloat(getNumberFromField(el))
            sum += number
        }
        let result_td = tr.children[1]
        let el = getPlaceForInsertFromTd(result_td)
        el.innerHTML = getStringFromNumber(sum)

    }

    for(let col = 1; col < 14; col++) {
        let stack_el = []
        let stack_sum = []
        let last_level = null
        let last_elem = null
        let sum = 0
        for(let tr of tbody.children) {
            if (!tr.classList.contains("not_calc") || tr.dataset.level == -1) {
                if (last_level === null) {
                    last_level = parseInt(tr.dataset.level)
                    last_elem = tr
                    continue
                }

                let isFolder = parseInt(tr.dataset.level) == parseInt(tr.nextElementSibling.dataset.level)-1
                if (parseInt(tr.dataset.level) > last_level) {
                    stack_el.push(last_elem)
                    if(!isFolder) {
                        sum = parseFloat(getNumberFromField(tr.children[col].querySelector(".field") || tr.children[col]))
                        for (let i = 0; i < stack_sum.length; i++) {
                            stack_sum[i] += sum;
                        }
                        stack_sum.push(sum)
                    } else {
                        stack_sum.push(0)
                    }
                }
                if (parseInt(tr.dataset.level) == last_level) {
                    if(!isFolder) {
                        let new_sum = parseFloat(getNumberFromField(tr.children[col].querySelector(".field") || tr.children[col]))
                        for (let i = 0; i < stack_sum.length; i++) {
                            stack_sum[i] += new_sum;
                        }
                    }
                }
                if (parseInt(tr.dataset.level) < last_level) {

                    sum = 0
                    while (true) {
                        let curr = stack_el.pop()
                        el = getPlaceForInsertFromTd(curr.children[col])
                        el.innerText = getStringFromNumber(stack_sum.pop())
                        if (curr.dataset.level == tr.dataset.level) {
                            break;
                        }
                    }
                    if(!isFolder) {
                        let new_sum = parseFloat(getNumberFromField(tr.children[col].querySelector(".field") || tr.children[col]))
                        for (let i = 0; i < stack_sum.length; i++) {
                            stack_sum[i] += new_sum;
                        }
                    }
                }
                last_level = parseInt(tr.dataset.level)
                last_elem = tr
            }

        }
    }

    let income = document.getElementById("income")
    let expenses = document.getElementById("expenses")
    let balance = document.getElementById("balance")
    for(let i = 1; i < income.children.length; i++){
        let sum = parseFloat(getNumberFromField(income.children[i])) + parseFloat(getNumberFromField(expenses.children[i]))
        balance.children[i].innerText = getStringFromNumber(sum)
    }
}