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
     loadChart(){
         let items = JSON.parse(localStorage.getItem('financialManagement'));
         if(items !== null){
             let date_income = {};
             let date_cost = {};
             for(let i=0;i<items.length;i++){
                 if(items[i].is_deleted == false){
                     let total_cost = 0;
                     let total_income = 0;
                     for(let j=0;j<items.length;j++){
                         if(items[i].date.year == items[j].date.year && items[i].date.month == items[j].date.month && items[j].is_deleted == false){
                             if(items[j].type == 'درآمد'){
                                 total_income += Number(items[j].price);
                             }else if(items[j].type == 'هزینه'){
                                 total_cost += Number(items[j].price);
                             }
                         }
                     }
                     date_income = Object.assign({},date_income,{
                         [items[i].date.year+'/'+items[i].date.month] : total_income
                     })
                     date_cost = Object.assign({},date_cost,{
                         [items[i].date.year+'/'+items[i].date.month] : total_cost
                     })
                 }
             }

             let key = Object.keys(date_cost);
             for(let i=0;i<key.length;i++){
                 key[i] = key[i].replace("/12", " اسفند");
                 key[i] = key[i].replace("/11", " بهمن");
                 key[i] = key[i].replace("/10", " دی");
                 key[i] = key[i].replace("/9", " آذر");
                 key[i] = key[i].replace("/8", " آبان");
                 key[i] = key[i].replace("/7", " مهر");
                 key[i] = key[i].replace("/6", " شهریور");
                 key[i] = key[i].replace("/5", " مرداد");
                 key[i] = key[i].replace("/4", " تیر");
                 key[i] = key[i].replace("/3", " خرداد");
                 key[i] = key[i].replace("/2", " اردیبهشت");
                 key[i] = key[i].replace("/1", " فروردین");
             }
             let val_cost = Object.values(date_cost);
             let val_income = Object.values(date_income);
             // remove chart
             for(let i=0;i<myChart.data.labels.length;i++){
                 myChart.data.labels.pop();
                 myChart.data.datasets[0].data.pop();
                 myChart.data.datasets[1].data.pop();
             }
             // add chart
             for(let i=0;i<key.length;i++){
                 myChart.data.labels.push(key[i]);
                 myChart.data.datasets[0].data.push(val_income[i]);
                 myChart.data.datasets[1].data.push(val_cost[i]);
             }
             myChart.update();
         }
     }
     loadPage() {
         let income = 0;
         let cost = 0;
         if(document.getElementById('table-body')){
             document.getElementById('table-body').remove();
         }else{
             document.getElementsByTagName('tbody')[0].remove();
         }
         let items = JSON.parse(localStorage.getItem('financialManagement'));
         if(items !== null){
             let table_body = document.createElement('tbody');
             table_body.id = 'table-body';
             let counter = 0;
             for(let i=0;i<items.length;i++) {
                 if(items[i].is_deleted == false){
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
                     td_row.textContent = this.numberToPersian(counter += 1);
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
                     a_delete.setAttribute('onclick', 'document.getElementById("btn_delete").setAttribute("onclick","main.removeItem('+ items[i].id +')");document.getElementById("btn_delete").setAttribute("data-bs-dismiss", "modal");');
                     td_desc.appendChild(a_desc);
                     td_desc.appendChild(a_delete);

                     tr_subject.appendChild(td_desc);
                     document.getElementById('dataTable').appendChild(table_body);
                 }
             }
             // for data entry in total box
             document.getElementById('total-cost').textContent = this.numberToPersian(this.separate(cost));
             document.getElementById('total-income').textContent = this.numberToPersian(this.separate(income));
         }else if (items == null){
             let tbody = document.createElement('tbody');
             let tr = document.createElement('tr');
             tr.setAttribute('className', 'odd');
             let td = document.createElement('td');
             td.setAttribute('valign', 'top');
             td.setAttribute('colSpan', '5');
             td.setAttribute('className', 'dataTables_empty');
             td.textContent = 'داده ای جهت نمایش وجود ندارد';
             tr.appendChild(td);
             tbody.appendChild(tr);
             document.getElementById('dataTable').appendChild(tbody);
         }
         this.loadChart();
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
         let form = document.getElementById('form');
         form.price.value = '';
         form.year.value = '';
         form.month.value = '';
         form.day.value = '';
         form.desc.value = '';
         this.loadPage();
     }
     removeItem(id){
         let items = JSON.parse(localStorage.getItem('financialManagement'));
         for(let i=0;i<items.length;i++){
             if(items[i].id == id){
                 items[i].is_deleted = true;
             }
         }
         localStorage.setItem('financialManagement',JSON.stringify(items));
         this.loadPage();
     }
 }