//const { json } = require("body-parser");

//const { json } = require("body-parser");

/*var xhr = new XMLHttpRequest();
xhr.open(
  'GET',
  'http://localhost:3000',
  true
);
xhr.send();

xhr.onreadystatechange = function() {
  if (xhr.status === 200) {
    console.log('result: ', JSON.parse(xhr.responseText));
  } else {
    console.log('err: ', xhr.responseText);
  }
};*/

//JSON.parse(result);
  var xhr = new XMLHttpRequest();
  // alert(xhr.responseType);

  xhr.open('GET', 'DBresult', true);
  // alert(xhr.response);
  // alert(xhr.responseText);

  xhr.onreadystatechange = function () {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        alert('Все данные передались нормально');
    }
};

xhr.send(null);