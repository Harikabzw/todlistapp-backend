
var notes = require('../model/notes')
const jwt = require('jsonwebtoken');
const config = require('../config.json');
var mongoose = require('mongoose')
var model = require('../model/notes')

module.exports.addNotes = (req) => {
    console.log('req', req)
    return new Promise((resolve, reject) => {
        model.user.find({ "username": req.createdBy }).exec(function (error, data) {
            if (data != '') {
                let data = {
                    title: req.title,
                    description: req.description,
                    createdBy: req.createdBy,
                    createdDate: new Date()

                }
                note = new model.notes(data)

                note.save(function (err, doc) {
                    console.log(doc)
                    if (err) {
                        reject({
                            'status': false,
                            'error': err
                        });
                    }
                    else {
                        resolve({
                            status: true,
                            result: 'Created Note Succesfully'
                        })
                    }
                })
            }
            else {
                resolve({
                    status: true,
                    result: 'No matched username found with the name'
                })
            }
        })

    })
}

module.exports.removeNotes = (req) => {
    console.log('req', req)
    return new Promise((resolve, reject) => {
        model.notes.deleteOne({ _id: req.id }).exec(function (err, res) {
            if (err) {
                reject({
                    'status': false,
                    'error': err
                });
            }
            else {
                console.log(res)
                resolve({
                    status: true,
                    result: 'Deleted Note Succefully'
                })

            }
        })
    })
}
module.exports.NotesById = (req) => {
    console.log('req', req)
    return new Promise((resolve, reject) => {
        model.notes.find({ _id: req.id }).exec(function (err, res) {
            if (err) {
                reject({
                    'status': false,
                    'error': err
                });
            }
            else {
                console.log(res)
                resolve({
                    status: true,
                    result: res
                })

            }
        })
    })
}
module.exports.notesList = (req) => {
    console.log('req', req)
    return new Promise((resolve, reject) => {
        var page = parseInt(req.page - 1) || 0; //for next page pass 1 here
        var limit = parseInt(req.limit) || 3;
        model.notes.find({})
            .sort({
                title: 1
            }).skip(limit * page).limit(limit)

            .exec(function (error, events) {
                console.log(events)
                model.notes.count().exec(function (err, count) {


                    if (err) {
                        reject({
                            'status': false,
                            'error': err
                        });
                    }
                    else {
                        resolve({
                            status: true,
                            Notes: events,
                            count:count,
                            page: req.page,
                            pages: Math.ceil(count / req.limit)
                        })

                    }
                })
            })
    })
}
module.exports.updateNote = (req) => {
    console.log('req', req)
    return new Promise((resolve, reject) => {
        var page = parseInt(req.page - 1) || 0; //for next page pass 1 here
        var limit = parseInt(req.limit) || 3;
        model.user.find({ "username": req.modifiedBy }).exec(function (error, data) {
            if (data != '') {
                model.notes.findOneAndUpdate({ _id: req.id },
                    { $set: { "title": req.title, "description": req.description, "modifiedBy": req.modifiedBy, "modifiedDate": new Date() } })


                    .exec(function (error, notes) {
                        console.log(notes)


                        if (error) {
                            reject({
                                'status': false,
                                'error': error
                            });
                        }
                        else {
                            if (notes != null) {
                                resolve({
                                    status: true,
                                    data: notes,
                                    result: 'updated Notes succesfully'

                                })
                            }
                            else {
                                resolve({
                                    status: true,
                                    result: 'No Document matched with the id'

                                })
                            }

                        }
                    })
            }
            else {
                resolve({
                    status: true,
                    result: 'No user found with the name'
                })
            }
        })

    })

}

module.exports.loggedIn = function (req) {
    return new Promise((resolve, reject) => {

        model.user.find({ username: req.username }).select()

            .exec(function (err, user) {
                console.log('HRdata', user)
                if (user.length == 0) {


                    resolve({ 'message': 'User Not found' })
                }
                else {
                    console.log('Password', user[0].password)


                    if (req.password == user[0].password) {

                        let data = {
                            "email": user[0].email,
                            "name": user[0].username
                        }
                        console.log('dara', data)
                        // do the database authentication here, with user name and password combination.
                        const token = jwt.sign(data, config.secret, { expiresIn: config.tokenLife })
                        const refreshToken = jwt.sign(data, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife })
                        // return the information including token as JSON
                        resolve({
                            success: true,
                            message: 'you have successfully logged in',
                            token: token,
                            data: {
                                _id: user[0]._id,
                                email: user[0].email,
                                username: user[0].username
                            }
                        });

                    }
                    else {
                        resolve({ 'message': 'Invalid Username or Password' })
                    }



                }


            })




    })









};
