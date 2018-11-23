/*
Imports
*/
    const express = require('express');
    const authRouter = express.Router({ mergeParams: true });
    const { register, login } = require('./auth.controller');

    const { checkFields } = require('../../services/request.checker');
    const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/server.response');
//

/*
Routes definition
*/
    class AuthRouterClass {
        routes(){
            // HATEOAS
            authRouter.get('/', (req, res) => {
                res.json('HATEOAS for auth');
            });
            
            // Register
            authRouter.post('/register', (req, res) => {
                if( typeof req.body === 'undefined' || req.body === null ) sendBodyError( res, 'No body data provided' );

                // Check for mandatories
                const { miss, extra, ok } = checkFields(['first_name', 'last_name', 'email', 'password'], req.body);
                if( !ok ){ sendFieldsError( res, 'Bad fields provided', miss, extra ) }

                // Use controller function
                register(req.body)
                .then( apiRes =>  sendApiSuccessResponse(res, 'User registered', apiRes))
                .catch( apiErr => sendApiErrorResponse(res, 'User not registered', apiErr));
            });

            // Login
            authRouter.post('/login', (req, res) => {
                if( typeof req.body === 'undefined' || req.body === null ) sendBodyError( res, 'No body data provided' );

                // Check for mandatories
                const { miss, extra, ok } = checkFields(['email', 'password'], req.body);
                if( !ok ){ sendFieldsError( res, 'Bad fields provided', miss, extra ) }

                // Use controller function
                login(req.body)
                .then( apiRes =>  sendApiSuccessResponse(res, 'User logged', apiRes))
                .catch( apiErr => sendApiErrorResponse(res, 'User not logged', apiErr));
            });
        };

        init(){
            this.routes();
            return authRouter;
        }
    }
//

/*
Export
*/
    module.exports = AuthRouterClass;
//