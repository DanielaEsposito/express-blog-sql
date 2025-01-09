        const mysql= require('mysql2');
        const connection= mysql.createConnection({
            host: 'localhost',
            user:'root',
            password:'JJb2dUiyMZ',
            database:'blog_db'
        });

        connection.connect((err)=>{
            if (err) throw err;
            console.log('connected to MySql');
            
        });

        module.exports = connection;