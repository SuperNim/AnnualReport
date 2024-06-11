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









