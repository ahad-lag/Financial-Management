$(document).ready(function() {
    $('#dataTable').DataTable({searching: false, paging: false, info: false, sort: false});
} );

let main = new Main();
main.loadPage();

let form = document.getElementById('form');
form.addEventListener('submit', (e) => {
    let type;
    if (document.getElementById('radio-button-cost').checked){
        type = 'هزینه';
    }else{
        type = 'درآمد';
    }
    main.addItem(form.price.value,type,form.year.value,form.month.value,form.day.value,form.desc.value);
    e.preventDefault();
});