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