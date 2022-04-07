$(document).ready(function() {
    $('#dataTable').DataTable({searching: false, paging: false, info: false, sort: false});
} );

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'درآمد',
            data: [],
            backgroundColor: [
                '#2CBE26'
            ],
            borderColor: [
                '#2CBE26'
            ],
            borderWidth: 2
        },{
            label: 'هزینه',
            data: [],
            backgroundColor: [
                '#E03F3F'
            ],
            borderColor: [
                '#E03F3F'
            ],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

let main = new Main();
main.loadPage();

let form = document.getElementById('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let type;
    if (document.getElementById('radio-button-cost').checked){
        type = 'هزینه';
    }else{
        type = 'درآمد';
    }
    main.addItem(form.price.value,type,form.year.value,form.month.value,form.day.value,form.desc.value);
    e.preventDefault();
});