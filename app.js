const port = process.env.port || 8080;
const mysql = require('mysql');
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/build'));

app.listen(port,()=>{
const conn = mysql.createConnection({
        host:"localhost",
        user:"root",
        database:"first",
        password:"1234"
    });

    conn.connect(err=>{
        if(err){
            throw err;
        }else{
            console.log("Connected!");
        }

        app.use(express.urlencoded());
        app.use(express.json());

        app.post('/slt', (req,res)=>{
            var tableFromClient = Object.keys(req.body)[0];
            console.log(tableFromClient);
            app.post('/inp', (req,res)=>{
                var d = Object.keys(req.body)[0];
                console.log(d);
                console.log(tableFromClient);
                if (tableFromClient === 'for_example_nodejs') 
                querySelect = `select * from ${tableFromClient} where name = '${d}' || id = '${d}';`;
                else if (tableFromClient ==='students')                 
                querySelect = `select * from ${tableFromClient} where Фамилия = '${d}' || Имя = '${d}' || Номер_зачетки = '${d}' || Отчество = '${d}' || Институт = '${d}' || Курс = '${d}'`;
                
                conn.query(querySelect,(err, result)=>{
                    if (err) console.log(err);
                    console.log('ok3');
                    res.writeHead(200, {"Content-Type": "text/json"});
                    res.end(JSON.stringify(result)); // Передает данные result на клиента
                });
            });

            let querySelect = `select * from ${tableFromClient} ;`;
                
            conn.query(querySelect,(err, result)=>{
                if (err) console.log(err);
                console.log('ok1');
                res.writeHead(200, {"Content-Type": "text/json"});
                res.end(JSON.stringify(result)); // Передает данные result на клиента
            });
            
            //res.end(JSON.stringify('normal')); // Передает сообщение на клиента
            //вывод for_example_nodejs / students
            
            /*conn.end(err=>{
                if(err){
                    console.log(err);
                }else{
                    console.log("database--close");
                }
            });*/
        });
        
        
        //вывод всех таблиц
        let allTables = "show tables from first;";
        conn.query(allTables,(err, result)=>{
            if (err) console.log(err);
            console.log('ok2');
            app.get('/DBtables', (req,res)=>{
                res.writeHead(200, {"Content-Type": "text/json"});
                res.end(JSON.stringify(result)); // Передает данные result на клиента
            });
        });
    });
});
// отправляем сообщение
console.log(`Server running on port ${port}`);
