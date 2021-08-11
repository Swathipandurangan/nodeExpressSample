var mysql = require('mysql');

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '1234'
});

connection.connect();
connection.query('SELECT * from nodejs.customer', function(err, rows, fields) {
if (err) throw err;
	console.log('Name   | Email | address | Phone');
	for (var i = 0; i < rows.length; i++) {
		console.log(rows[i].name + "  |  " + rows[i].email + "  |  "+ rows[i].address +" | " +rows[i].phone  );
	}
	
});
connection.end();