//const { json } = require("body-parser");

//const { json } = require("body-parser");



  var xhr = new XMLHttpRequest();
  // alert(xhr.responseType);

  xhr.open('GET', 'DBresult', true);
  // alert(xhr.response);
  // alert(xhr.responseText);
  xhr.onreadystatechange = function () {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        alert('Все данные передались нормально');
        db_arr = JSON.parse(xhr.responseText);
        console.log('result: ', db_arr); //test
      }
  };
  xhr.send(null);

  var xhr2 = new XMLHttpRequest();
  // alert(xhr.responseType);

  xhr2.open('GET', 'DBtables', true);
  // alert(xhr.response);
  // alert(xhr.responseText);
  xhr2.onreadystatechange = function () {
    if(xhr2.readyState === XMLHttpRequest.DONE && xhr2.status === 200) {
        alert('Все данные передались нормально');
        tables = [];
        tables = JSON.parse(xhr2.responseText);
        
        console.log('db_tables: ', tables); //test
      }
  };
  xhr2.send(null);