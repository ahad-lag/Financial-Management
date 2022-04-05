 class Main {
     numberToPersian(number){
         const persian = { 0: "۰", 1: "۱", 2: "۲", 3: "۳", 4: "۴", 5: "۵", 6: "۶", 7: "۷", 8: "۸", 9: "۹", ',': "," , '/': "/"};
         number = number.toString().split("");
         let persianNumber = "";
         for (let i = 0; i < number.length; i++) {
             number[i] = persian[number[i]];
         }
         for (let i = 0; i < number.length; i++) {
             persianNumber += number[i];
         }
         return persianNumber;
     }
     separate(Number) {
         Number+= '';
         Number= Number.replace(',', '');
         let x = Number.split('.');
         let y = x[0];
         let z= x.length > 1 ? '.' + x[1] : '';
         var rgx = /(\d+)(\d{3})/;
         while (rgx.test(y))
             y= y.replace(rgx, '$1' + ',' + '$2');
         return y + z;
     }
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
             td_date.textContent = this.numberToPersian(date);
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
         document.getElementById('total-cost').textContent = this.numberToPersian(this.separate(cost));
         document.getElementById('total-income').textContent = this.numberToPersian(this.separate(income));
     }
 }