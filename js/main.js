 class Main {
     loadPage() {
         let income = 0;
         let cost = 0;
         let items = JSON.parse(localStorage.getItem('financialManagement'));;
         for(let i=0;i<items.length;i++) {
             // for total income and cost
             if(items[i].type == 'هزینه'){
                 cost += items[i].price;
             }else if(items[i].type == 'درآمد'){
                 income += items[i].price;
             }
             // for data entry table from localStorage
             let tr_subject = document.createElement('tr');
             let td_row = document.createElement('td');
             td_row.textContent = i + 1;
             tr_subject.appendChild(td_row);
             let td_price = document.createElement('td');
             td_price.textContent = items[i].price;
             tr_subject.appendChild(td_price);
             let td_date = document.createElement('td');
             let date = items[i]['date'].year + '/' + items[i]['date'].month + '/' + items[i]['date'].day;
             td_date.textContent = date;
             tr_subject.appendChild(td_date);
             let td_type = document.createElement('td');
             td_type.textContent = items[i].type;
             tr_subject.appendChild(td_type);
             let td_desc = document.createElement('td');
             td_desc.textContent = items[i].desc;
             tr_subject.appendChild(td_desc);
             document.getElementById('table-body').appendChild(tr_subject);
         }
         // for data entry in total box
         document.getElementById('total-cost').textContent = cost;
         document.getElementById('total-income').textContent = income;
     }
 }