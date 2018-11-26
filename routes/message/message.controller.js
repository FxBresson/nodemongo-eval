/*
Import
*/
const MessageModel = require('../../models/message.model');
//

/*
Functions
*/
const send = body => {
    return new Promise( (resolve, reject) => {
        MessageModel.create(body, (err, newMessage) => {
            if (err) return reject(err);
            return resolve(newMessage)
        });
    })
}

const deleteOne = (body, reqParams) => {
    return new Promise( (resolve, reject) => {
        MessageModel.findById(reqParams.id, function (err, message) {
            if (err) return reject(err);
            if (message.author != body.requester) {
                return reject('Not author of message')
            } else {
                MessageModel.deleteOne(message, function(err) {
                    if (err) return reject(err);
                    return resolve('deleted')
                })
            }
        });
    })
}

const getOne = (body, reqParams) => {
    return new Promise( (resolve, reject) => {
        MessageModel.findById(reqParams.id, (err, message) => {
            if (err) return reject(err);
            return resolve(message)
        });
    })
}

const getAll = body => {
    return new Promise( (resolve, reject) => {
        MessageModel.find((err, messages) => {
            if (err) return reject(err);
            return resolve(messages)
        });
    })
}
//


/*
Export
*/
module.exports = {
    send, 
    deleteOne, 
    getOne, 
    getAll 
}
//