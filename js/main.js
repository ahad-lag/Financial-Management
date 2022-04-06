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
         document.getElementById('table-body').remove();
         let items = JSON.parse(localStorage.getItem('financialManagement'));
         if(items !== null){
             let table_body = document.createElement('tbody');
             table_body.id = 'table-body';
             for(let i=0;i<items.length;i++) {
                 // for total income and cost
                 if(items[i].type == 'هزینه'){
                     cost += Number(items[i].price);
                 }else if(items[i].type == 'درآمد'){
                     income += Number(items[i].price);
                 }
                 // for data entry table from localStorage
                 let tr_subject = document.createElement('tr');
                 table_body.appendChild(tr_subject);
                 let td_row = document.createElement('td');
                 td_row.textContent = this.numberToPersian(i + 1);
                 tr_subject.appendChild(td_row);
                 let td_price = document.createElement('td');
                 td_price.textContent = this.numberToPersian(this.separate(items[i].price));
                 tr_subject.appendChild(td_price);
                 let td_date = document.createElement('td');
                 let date = items[i]['date'].year + '/' + items[i]['date'].month + '/' + items[i]['date'].day;
                 td_date.textContent = this.numberToPersian(date);
                 tr_subject.appendChild(td_date);
                 let td_type = document.createElement('td');
                 td_type.textContent = items[i].type;
                 if(items[i].type == 'هزینه') {
                     td_type.setAttribute('class', 'text-danger');
                 }else if(items[i].type == 'درآمد'){
                     td_type.setAttribute('class', 'text-success');
                 }
                 tr_subject.appendChild(td_type);
                 let td_desc = document.createElement('td');
                 let a_desc = document.createElement('a');
                 a_desc.textContent = 'نمایش';
                 a_desc.setAttribute('class', 'btn btn-primary btn-sm me-2 px-2');
                 a_desc.setAttribute('data-bs-toggle', 'modal');
                 a_desc.setAttribute('data-bs-target', '#descModal');
                 a_desc.setAttribute('onclick', 'document.getElementById("desc_text").textContent = "'+ items[i].desc +'";');
                 let a_delete = document.createElement('a');
                 a_delete.textContent = 'حذف';
                 a_delete.setAttribute('class', 'btn btn-outline-danger btn-sm px-2');
                 a_delete.setAttribute('data-bs-toggle', 'modal');
                 a_delete.setAttribute('data-bs-target', '#deleteModal');
                 td_desc.appendChild(a_desc);
                 td_desc.appendChild(a_delete);

                 tr_subject.appendChild(td_desc);
                 document.getElementById('dataTable').appendChild(table_body);
             }
             // for data entry in total box
             document.getElementById('total-cost').textContent = this.numberToPersian(this.separate(cost));
             document.getElementById('total-income').textContent = this.numberToPersian(this.separate(income));
         }
     }
     addItem(price,type,year,month,day,desc) {
         if(localStorage.getItem('financialManagement') !== null){
             let result = JSON.parse(localStorage.getItem('financialManagement'))
             let newItem = {
                 "id":result.length + 1,
                 "price":price,
                 "type":type,
                 "date":{
                     "year":year,
                     "month":month,
                     "day":day
                 },
                 "desc":desc,
                 "is_deleted": false
             };
             result.push(newItem);
             localStorage.setItem('financialManagement',JSON.stringify(result));
         }else{
             let newItem = [
                 {
                     "id": 1,
                     "price":price,
                     "type":type,
                     "date":{
                         "year":year,
                         "month":month,
                         "day":day
                     },
                     "desc":desc,
                     "is_deleted": false
                 }
             ];
             localStorage.setItem('financialManagement',JSON.stringify(newItem));
         }
         this.loadPage();
     }
 }