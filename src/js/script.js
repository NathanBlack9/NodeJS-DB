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
var xhr3 = new XMLHttpRequest();


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


      let searchBtn = document.querySelector('.searchBtn');
      searchBtn.addEventListener('click',()=>{
        let inputValue = document.querySelector('.input').value;

        if (inputValue != '') {
          sendInputValue(inputValue);
          var outputWindow = document.querySelector('.output__window');
          outputWindow.style.display ='flex';
        }
        else alert('Введите данные для поиска');
      });
  }
};

xhr3.open('GET', 'inp', true);
xhr3.onreadystatechange = function () {
  if(xhr3.readyState === XMLHttpRequest.DONE && xhr3.status === 200) {
    console.log('output text: ', JSON.parse(xhr3.responseText));
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
  .then(response => response.json())
  .then(response =>{
    console.log(response);
  });
}

function sendInputValue(inputValue){
  fetch("http://localhost:8080/inp",{
    method : "POST",
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded'
    },
    body   : inputValue
  })
  .then(response => response.json())
  .then(response =>{
    console.log(response);
    var key = Object.keys(response[0]);
    var value;
    for (let j = 0; j < response.length; j++) {
      for (let i = 0; i < key.length; i++) {
        key = Object.keys(response[j]);
        value = response[j][`${key[i]}`];
        document.querySelector('.output__text').innerHTML += `${key[i]}: ${value}; </br>`;
      }
      document.querySelector('.output__text').innerHTML += ' <hr/>' ;
    }
  });
}

function Clear() {
  document.querySelector('.output__text').innerHTML  = '';
}

