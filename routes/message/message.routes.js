/*
Imports
*/
const express = require('express');
const messageRouter = express.Router({ mergeParams: true });

// Inner
const { send, deleteOne, getOne, getAll } = require('./message.controller');
const { checkFields } = require('../../services/request.checker');
const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/server.response');
//

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
             // Check for body data
            if( typeof req.body === 'undefined' || req.body === null ) sendBodyError( res, 'No body data provided' );

            // Check for mandatories
            const { miss, extra, ok } = checkFields(['content', 'author'], req.body);
            if( !ok ){ sendFieldsError( res, 'Bad fields provided', miss, extra ) }

            // Use controller function
            send(req.body)
            .then( apiRes =>  sendApiSuccessResponse(res, 'Message sent', apiRes))
            .catch( apiErr => sendApiErrorResponse(res, 'Message not sent', apiErr));
        });

        // Delete a message
        messageRouter.delete('/:id', (req, res) => {
            if (!req.params || !req.params.id) { sendBodyError(res, 'No param provided') }

            // Use controller function
            deleteOne(req.body, req.params)
            .then( apiRes =>  sendApiSuccessResponse(res, 'Message seleted', apiRes))
            .catch( apiErr => sendApiErrorResponse(res, 'Message not deleted', apiErr));
        });

        // Get 1 message
        messageRouter.get('/:id', (req, res) => {
            if (!req.params || !req.params.id) { sendBodyError(res, 'No param provided') }

            // Use controller function
            deleteOne(req.body, req.params)
            .then( apiRes =>  sendApiSuccessResponse(res, 'Message retrieved', apiRes))
            .catch( apiErr => sendApiErrorResponse(res, 'Message not retrieved', apiErr));
        })

        // Get all messages
        messageRouter.get('/all', (req, res) => {
            // Use controller function
            deleteOne(req.body)
            .then( apiRes =>  sendApiSuccessResponse(res, 'Messages retrieved', apiRes))
            .catch( apiErr => sendApiErrorResponse(res, 'Messages not retrieved', apiErr));
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