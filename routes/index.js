var express = require('express');
var app=express()
var router = express.Router();
var db = require('../controller/dbController')
var mongoose = require('mongoose');
var config = require('../config.json')
const jwt = require('jsonwebtoken');

mongoose.connect(config.dbUrl, {
  keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}, function (err, db) {
  if (err) {
    console.log('error', err)
  }

  else {
    console.log('connected to db')
  }
})
/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("working");
});
//For creating a note
router.post('/createNote', function (req, res, next) {
  
  console.log('token',req.headers,req.headers['access_token'])
   var token = req.headers['access_token'];
   console.log(token)
  
  if (token) {

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
         res.send({ message: 'invalid token' });
      } else {
        console.log('encoded',decoded)
   
        db.addNotes(req.body).then(resp => {
          res.send(resp)
        }).catch(err => {
          console.log(err)
          res.status(400).send(err);
        });
     }
   });



   }
  else {
    res.status(500).send({status:false,error:'No Token Provider'})
  }

});

//To edita Note
router.put('/editNote', function (req, res, next) {
  var token = req.headers['access_token'];
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
         res.send({ message: 'invalid token' });
      } else {
    db.updateNote(req.body).then(resp => {
      res.send(resp)
    }).catch(err => {
      console.log(err)
      res.status(400).send(err);
    });
  }
})
  }
  else {
    req.status(500).send('UnAuthorized Access')
  }

});
//to get list of notes with limit
router.post('/getNotes', function (req, res, next) {
  //console.log('req.headers',req.headers)
  var token = req.headers['access_token'];
  console.log(token)
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
         res.send({ message: 'invalid token' });
      } else {
    db.notesList(req.body).then(resp => {
      res.send(resp)
    }).catch(err => {
      console.log(err)
      res.status(400).send(err);
    });
  }
})
  }
  else {
    req.status(500).send('UnAuthorized Access')
  }

});
//to remove notes
router.post('/deleteNotes', function (req, res, next) {
  var token = req.headers['access_token'];
  console.log(req.body,'req.body')
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
         res.send({ message: 'invalid token' });
      } else {
    db.removeNotes(req.body).then(resp => {
      res.send(resp)
    }).catch(err => {
      console.log(err)
      res.status(400).send(err);
    });
  }
})
  }
  else {
    req.status(500).send('UnAuthorized Access')
  }

});
//to get a note data with refrence to id
router.post('/getNotesById', function (req, res, next) {
  var token = req.headers['access_token'];
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
         res.send({ message: 'invalid token' });
      } else {
    db.NotesById(req.body).then(resp => {
      res.send(resp)
    }).catch(err => {
      console.log(err)
      res.status(400).send(err);
    });
      }
})
  }
  else {
    req.status(500).send('UnAuthorized Access')
  }

});


router.post('/login', function (req, res, next) {
  db.loggedIn(req.body).then(resp => {
    res.send(resp)
  }).catch(err => {
    console.log(err)
    res.status(400).send(err);
  });
});

module.exports = router;
