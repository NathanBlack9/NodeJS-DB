var xhr = new XMLHttpRequest();


xhr.open('GET', 'DBresult', true);

xhr.onreadystatechange = function () {
  if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      //alert('Все данные передались нормально');
      db_arr = JSON.parse(xhr.responseText);
      console.log('result: ', db_arr); //test
    }
};
xhr.send(null);
/*-----------------------*/
var xhr2 = new XMLHttpRequest();

xhr2.open('GET', 'DBtables', true);

xhr2.onreadystatechange = function () {
  if(xhr2.readyState === XMLHttpRequest.DONE && xhr2.status === 200) {
      //alert('Все данные передались нормально');
      var tables = JSON.parse(xhr2.responseText);
      console.log('db_tables: ', tables); //test
      
      let selectBox = document.querySelector('.select');
      for (let i = 0; i < tables.length; i++) {
        selectBox.append(new Option(tables[i].Tables_in_first,tables[i].Tables_in_first));
      }

      selectBox.addEventListener('change', () => {
        var selectedTable = selectBox.value;
        postSelectedTab(selectedTable);
      });
    }
};
xhr2.send(null);
/*-----------------------*/
function postSelectedTab(param){
  fetch("http://localhost:8080/slt",{
    method : "POST",
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded'
    },
    body   : param
  })
  .then(response => response.text())
  .then(response =>{
    console.log(response);
  });
}

