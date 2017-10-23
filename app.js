// DB Connection settings
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : "",
  user     : "",
  password : "",
  port     : "3306",
  database : "mydb"
});

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var dbOutput;


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});



socketTags = {connInit:'connection',connLogin:'send',connSignup:'sendsignup',connListFiles:'sendlistfile',connUploadFiles:'sendufile',connDeleteFiles:'senddel'};
sqlQueries = {
              sqlSelectUsername:"SELECT * FROM users WHERE username = ",
              sqlInsertUsers:"INSERT INTO users (username,password,firstname,lastname) VALUES ?",
              sqlSelectFiles:"SELECT * FROM Files WHERE username = ",
              sqlSelectFilenames:"SELECT * FROM Files WHERE filename = ",
              sqlqueryFilenames:"SELECT * FROM Files WHERE filename = ? AND username = ?",
              sqlReplaceFiles:"REPLACE INTO Files (filename,username,filedescription,folder,filecreatetime,fileupdatetime,downloadlink) VALUES ?",
              sqlInsertFiles:"INSERT INTO Files (filename,username,filedescription,folder,filecreatetime,fileupdatetime,downloadlink) VALUES ?",
              sqlDeleteFiles:"DELETE FROM Files WHERE filename = ? AND username = ?"
              };

logger = {
          errorMsg:'error',
          errorsqlmsg:"Error: Unable to fetch data!",
          welcomeMsg:'Welcome, ', 
          dupEntry:"Duplicate Entry",
          lstn:'listening on *:8081',
          okStatus:'ok',
          };



// Turn on the socket to listen to the events triggered from index.html
// Socket code for login authentication
io.on(socketTags.connInit, function(socket){
  socket.on(socketTags.connLogin, function(logindetails){

    connection.query(sqlQueries.sqlSelectUsername + mysql.escape(logindetails[0].toLowerCase()) , function (err, result) {
      if (err){
        console.log(err);
        socket.emit(socketTags.connLogin, logger.errorMsg);
        return;
      }

      if(result.length>0){
        if (result[0].username == logindetails[0].toLowerCase()&& result[0].password == logindetails[1]) 
         socket.emit(socketTags.connLogin, logger.welcomeMsg + result[0].firstname + ' ' + result[0].lastname);
       else{
        socket.emit(socketTags.connLogin, logger.errorMsg);
       }
     }
     else{
       socket.emit(socketTags.connLogin, logger.errorMsg);
     }
   });
  });

});

io.on(socketTags.connInit, function(socket){
  socket.on(socketTags.connSignup, function(signupdetails){

    connection.query(sqlQueries.sqlSelectUsername + mysql.escape(signupdetails.username.toLowerCase()) , function (err, result) {
      if (err){
        socket.emit(socketTags.connSignup, logger.errorMsg);
        console.log(err);
        return;
      }

      if(result.length>0){
        socket.emit(socketTags.connSignup, logger.dupEntry);
        console.log(logger.dupEntry);
     }
     else{
var values =[[signupdetails.username.toLowerCase(),signupdetails.password,signupdetails.firstname,signupdetails.lastname]];
    connection.query(sqlQueries.sqlInsertUsers,[values], function (err, resu) {
    if (err){
      console.log(err);
    }

    socket.emit(socketTags.connSignup,logger.welcomeMsg + signupdetails.firstname+ ' ' + signupdetails.lastname);
    return;
  });
}
     
   });
  });

});

// Socket Code to fetch entries from database
io.on(socketTags.connInit, function(socket){
socket.on(socketTags.connListFiles, function(username){
  connection.query(sqlQueries.sqlSelectFiles + mysql.escape(username.toLowerCase()), function (err, resu) {
    if (err){
      console.log(err);
    }
    io.emit(socketTags.connListFiles, resu);
    return;
  });
});
});

//Socket code to upload files into database table
io.on(socketTags.connInit, function(socket){
  socket.on(socketTags.connUploadFiles, function(filedetails){
    var values;

//Validate if the entry alreay exists in the database table 'Files'
connection.query(sqlQueries.sqlqueryFilenames,[filedetails[0],filedetails[1].toLowerCase()], function (err, result) {
  // console.log(result);
  if (err){
    console.log(err);
    return;
  }
  else{
// If an entry exixts, replace the file with new one and update 'Updated Time'
if(result.length>0){
  values = [
  [filedetails[0],filedetails[1].toLowerCase(),filedetails[2],filedetails[3],
  result[0].filecreatetime,filedetails[5],filedetails[6]]];
  connection.query(sqlQueries.sqlReplaceFiles, [values], function (err, result) {
    if (err){
      console.log(err);
      return;
    }
    io.emit(socketTags.connUploadFiles, logger.okStatus);
  }); 
}

// If it is a new entry then insert in to the database table 'Files'
else{

  values = [
  [filedetails[0],filedetails[1].toLowerCase(),filedetails[2],filedetails[3],
  filedetails[4],filedetails[5],filedetails[6]]];
  connection.query(sqlQueries.sqlInsertFiles, [values], function (err, result) {
       if (err){
         console.log(err);
         return;
      }
      socket.emit(socketTags.connUploadFiles, logger.okStatus);
     });
    }
   }
  });
 });
});


//Socket code to delete entries from the database table 'Files'
io.on(socketTags.connInit, function(socket){
  socket.on(socketTags.connDeleteFiles, function(filedel){
    connection.query(sqlQueries.sqlDeleteFiles,[filedel.filename,filedel.username], function (err, result) {
      if (err){
        console.log(err);
        return;
      }
    });
    socket.emit(socketTags.connDeleteFiles, logger.okStatus);
  });
});


// Configure the port as 8081
http.listen(8081, function(){
  console.log(logger.lstn);
});

