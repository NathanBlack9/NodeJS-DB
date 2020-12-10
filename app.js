const port = process.env.port || 3000;
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
        /*
        var query = "INSERT INTO for_example_nodejs (id, name) VALUES (66, 'molodec')";
        conn.query(query,(err, result)=>{
            if (err) console.log(err);
            //console.log(result);
            console.log("1 record inserted");
        });
        */
        let query = "select * from for_example_nodejs;";
        conn.query(query,(err, result)=>{
            if (err) console.log(err);
            
            app.get('/DBresult', (req,res)=>{
                res.writeHead(200, {"Content-Type": "text/json"});
                res.end(JSON.stringify(result)); // Передает данные result на клиента
            });

            /*for (let i = 0; i < result.length; i++) {
                if (result[i].name === 'asd') {
                   
                    //console.log(result[i]);
                }
                //console.log(result[index].name);
            }*/

        });
        conn.end(err=>{
            if(err){
                console.log(err);
            }else{
                console.log("database--close");
            }
        });
    });
});
// отправляем сообщение
console.log('Server running on port 3000');
