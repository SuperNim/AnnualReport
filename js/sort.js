function sort(colNumber = 1) {
    let tbody = document.getElementById("tbody")
    let balance = tbody.querySelector("#balance")
    let row_template = tbody.querySelector("#row_template")
    let folder_template = tbody.querySelector("#folder_template")
    sortTableRowsWithHierarchy(tbody, colNumber);
    tbody.appendChild(balance)
    tbody.appendChild(row_template)
    tbody.appendChild(folder_template)

}
function sortTableRowsWithHierarchy(tbody, colNumber) {

    const rows = Array.from(tbody.querySelectorAll('tr:not(.not_calc)'));

    function compareRows(a, b) {
        if(colNumber == 1){
            const aNum = parseFloat(getNumberFromField(a.children[colNumber]));
            const bNum = parseFloat(getNumberFromField(b.children[colNumber]));
            if(aNum != 0 || bNum != 0){
                return -aNum.toString().localeCompare(bNum.toString(), 'en', {numeric: true});
            }
        }
        const aText = a.children[0].textContent.trim();
        const bText = b.children[0].textContent.trim();
        return aText.localeCompare(bText);
    }

    function buildHierarchy(rows) {
        const root = { children: [] };
        const levelMap = { '-1': root };

        rows.forEach(row => {
            const level = parseInt(row.dataset.level, 10);
            const parentLevel = level - 1;
            const parent = levelMap[parentLevel] || root;

            if (!parent.children) {
                parent.children = [];
            }
            const node = { element: row, children: [] };
            parent.children.push(node);
            levelMap[level] = node;
        });

        return root;
    }

    function sortHierarchy(node) {
        if (node.children) {
            node.children.sort((a, b) => compareRows(a.element, b.element));
            node.children.forEach(sortHierarchy);
        }
    }

    function flattenHierarchy(node) {
        let result = [];
        if (node.element) {
            result.push(node.element);
        }
        if (node.children) {
            node.children.forEach(child => {
                result = result.concat(flattenHierarchy(child));
            });
        }
        return result;
    }

    const hierarchy = buildHierarchy(rows);

    sortHierarchy(hierarchy);

    const sortedRows = flattenHierarchy(hierarchy);

    sortedRows.forEach(row => tbody.appendChild(row));
}

