trList = document.getElementsByTagName('tr')

for (var tr of trList) {
    if (!tr.classList.contains("header_tr")) {
        tr.addEventListener('click', (e) => {
            for (tr of trList) {
                if (!tr.classList.contains("header_tr")) {
                    tr.classList.remove('table-active')
                }
            }
            if (e.target.parentElement.classList.contains("table-active")) {
                e.target.parentElement.classList.remove('table-active')
            } else {
                e.target.parentElement.classList.add('table-active')
            }
        })
    }
    var level = tr.dataset.level
    var padding = 32
    padding = 32 + 16*level
    tr.children[0].style.paddingLeft = padding + 'px'
}
document.querySelectorAll('td').forEach(td => {
    if (!td.parentElement.classList.contains("header_tr")) {
        td.contentEditable = true;
    }
    td.addEventListener('click', (e) => {
        e.target.style.background = 'white'
        e.target.classList.add('active')
    })
});
document.querySelectorAll('th').forEach(th => {
    if (!th.parentElement.classList.contains("header_tr")) {
        th.contentEditable = true;
    }
});
var mySVG = document.getElementsByClassName("del")
for (SVG of mySVG) {
        SVG.addEventListener('click', deleteRow)
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
    del = row.querySelector(".del")
    del.addEventListener('click', deleteRow)
    console.log(row.children[0])
    row.children[0].contentEditable = 'true';
    tr.after(row)
}








