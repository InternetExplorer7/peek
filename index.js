  var wit = require('node-wit');
  var fs = require('fs');
  var ACCESS_TOKEN = "DVK7ANMWGHHZ22GFGR6OBPCNDQ4KNS2E";
  /* WIT.AI */

/* SOCKET.IO */ 

  var express = require('express');
  var app = express();
  var cons = require('consolidate');
  var mongodb = require('mongodb');
  var ObjectId = require('mongodb').ObjectId;
    app.use(express.static(__dirname + '/public'));

  /* MONGO DB */
var MongoClient = require('mongodb').MongoClient; // MONGO DB
var Server = require('mongodb').MongoClient;
  /* MONGO DB */ 
var http = require('http').Server(app);
var io = require('socket.io')(http);
require('es6-shim');


  MongoClient.connect('mongodb://Kavehk:Kevin231@ds051740.mongolab.com:51740/peek', function(err, db){ // mongodb://Kavehk:Kevin231@ds051740.mongolab.com:51740/peek
   /* db.collection('newcon').update({"_id":393,"comments":{"$elemMatch":{"name":"kevin"}}},
                         {$push:{"comments.$.messages":39}})
    console.log('updated newcon'); */

    io.on('connection', function(socket){
    console.log('a user connected');
    /* NEW USER CONNECTED */
    socket.on('newuser', function(id, callback){ // Get the JSON and send it back
      console.log("ID in index.js " + id);
      db.collection('con').findOne({_id: id}, function(err, doc){
        callback(doc);
      });
    });

    /* PRESSED PLAY */
    socket.on('play', function(id){
      console.log('got to play ' + id);
      db.collection('con').update({_id: id}, { $set: { play: 1, started: 1 }}, {upsert: true});
      change(id);
    });

    /* PRESSED PAUSE */
    socket.on('pause', function(id){
      db.collection('con').update({_id: id}, { $set: { play: 0  } }, {upsert: true});
      change(id);
    });

    /* ADD NAME */
    /*socket.on('addname', function(name, id){
      console.log("Adding name");
      db.collection('con').update({_id: id}, {$push: { chat: { name: name, arr:[] } }});
    });

    /* CHAT MESSAGE */
   /* socket.on('message', function(msg, id, name){
      //db.collection('con').update({_id: id}, { $push: { chat: msg }}); // Add message to collection
      console.log("Adding message to arr " + name);
      db.collection('con').update({_id:id, "chat":{ "$elemMatch":{ "name" : name}}},
                         {"$push":{"chat.$.arr":msg}});
      changemsg(id);//refresh chat to everyone
    }); 

    function changemsg(id){
      setTimeout(function(){
        db.collection('con').findOne({_id: id}, function(err, doc){
        io.emit('updatemsg', doc);
        });
      }, 100);
    } */
    
    function change(id){
      setTimeout(function(){
        db.collection('con').findOne({_id: id}, function(err, doc){
        io.emit('update', doc);
        });
      }, 250);
    }

  socket.on('start', function(vid, ip, id){ // User has created video, time to insert to new table
    var video;
    console.log('started ' + vid + ' ' + ip);
    video = vid.substring(vid.indexOf("=") + 1); // Video URL
    insert(video, ip, id)// Insert new table into collection
  });

  function insert(video, ip, id){
    db.collection('con').insert({_id: id, host: ip, url: video, play: 0, started: 0, chat: []}) // Setting ID, host, YouTube Video, Play Status (0 === pause) and Chat arr.
  };




});



  }); // MONGO CLIENT


  app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
}); 
