$(document).ready(function() {
    $('#dataTable').DataTable();
} );

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'درآمد',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                '#2CBE26'
            ],
            borderColor: [
                '#2CBE26'
            ],
            borderWidth: 2
        },{
            label: 'هزینه',
            data: [9, 1, 3, 2, 7, 5],
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