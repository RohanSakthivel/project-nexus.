document.addEventListener('DOMContentLoaded', function () {
    const tables = document.querySelectorAll('.table');
    const tableInput = document.getElementById('table');

    tables.forEach(table => {
        table.addEventListener('click', function () {
            tables.forEach(t => t.classList.remove('selected'));
            table.classList.add('selected');
            tableInput.value = table.getAttribute('data-table-number');
        });
    });
});
function table(){
    alert("payment gateway is not intergeted");
}