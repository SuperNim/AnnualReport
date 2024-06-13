trList = document.getElementsByTagName('tr')

for (var tr of trList) {
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
    var level = parseInt(tr.dataset.level)
    if(level<0)
        level = 0;
    var padding = 32
    padding = 32 + 16*level
    tr.children[0].setAttribute("style", "padding-left: "+padding+"px!important")
}

var mySVG = document.getElementsByClassName("delete")
for (delete_icon of mySVG) {
    delete_icon.addEventListener('click', deleteRow)
}
function deleteRow (event) {
    event.target.closest('tr').remove()
}
var plus_list = document.getElementsByClassName('plus')
for (plus of plus_list) {
    plus.addEventListener('click', plusRow)
}
var row_template = document.getElementById('row_template')
var tbody = document.getElementById('tbody')
function plusRow (e) {
    tr = e.target.parentElement.parentElement
    var row = row_template.cloneNode(true)
    row.removeAttribute('id')
    tbody.appendChild(row)
    del = row.querySelector(".delete")
    del.addEventListener('click', deleteRow)
    console.log(row.children[0])

    var level = tr.dataset.level
    row.dataset.level = parseInt(level) + 1
    applyPadding(row)
    tr.after(row)
}








