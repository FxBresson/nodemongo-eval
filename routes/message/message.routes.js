/*
Imports
*/
const express = require('express');
const messageRouter = express.Router({ mergeParams: true });

// Inner
const { send, deleteOne, getOne, getAll } = require('./message.controller');
const { checkFields, isConnected } = require('../../services/request.checker');
const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/server.response');
//

const jwt = require('jsonwebtoken');


/*
Routes definition
*/
class MessageRouterClass {
    routes(){
        // HATEOAS
        messageRouter.get('/', (req, res) => {
            res.json('HATEOAS for message');
        });
        
        // Post a message
        messageRouter.post('/', (req, res) => {
            if( typeof req.body === 'undefined' || req.body === null ) sendBodyError( res, 'No body data provided' );

            isConnected(req.body.token).then(decodedToken => {
                // Check for body data

                // Check for mandatories
                const { miss, extra, ok } = checkFields(['content'], req.body);
                if( !ok ){ sendFieldsError( res, 'Bad fields provided', miss, extra ) }

                //Set the author
                req.body.author = decodedToken._id

                // Use controller function
                send(req.body)
                .then( apiRes =>  sendApiSuccessResponse(res, 'Message sent', apiRes))
                .catch( apiErr => sendApiErrorResponse(res, 'Message not sent', apiErr));
            })
            .catch( apiErr => sendApiErrorResponse(res, 'User not connected', apiErr));
        });

        // Delete a message
        messageRouter.delete('/:id', (req, res) => {
            isConnected(req.body.token).then(decodedToken => {
                if (!req.params || !req.params.id) { sendBodyError(res, 'No param provided') }
                // Set the id of the requester user 
                req.body.requester = decodedToken._id

                // Use controller function
                deleteOne(req.body, req.params)
                .then( apiRes =>  sendApiSuccessResponse(res, 'Message seleted', apiRes))
                .catch( apiErr => sendApiErrorResponse(res, 'Message not deleted', apiErr));
            })
            .catch( apiErr => sendApiErrorResponse(res, 'User not connected', apiErr));
        });

        // Get 1 message
        messageRouter.get('/:id', (req, res) => {
            isConnected(req.body.token).then(decodedToken => {
                if (!req.params || !req.params.id) { sendBodyError(res, 'No param provided') }

                // Use controller function
                deleteOne(req.body, req.params)
                .then( apiRes =>  sendApiSuccessResponse(res, 'Message retrieved', apiRes))
                .catch( apiErr => sendApiErrorResponse(res, 'Message not retrieved', apiErr));
            })
            .catch( apiErr => sendApiErrorResponse(res, 'User not connected', apiErr));
        })

        // Get all messages
        messageRouter.get('/all', (req, res) => {
            isConnected(req.body.token).then(decodedToken => {
                // Use controller function
                deleteOne(req.body)
                .then( apiRes =>  sendApiSuccessResponse(res, 'Messages retrieved', apiRes))
                .catch( apiErr => sendApiErrorResponse(res, 'Messages not retrieved', apiErr));
            })
            .catch( apiErr => sendApiErrorResponse(res, 'User not connected', apiErr));
        })
    };

    init(){
        this.routes();
        return messageRouter;
    }
}
//

/*
Export
*/
module.exports = MessageRouterClass;
//