/*
Imports
*/
    const express = require('express');
    const authRouter = express.Router({ mergeParams: true });
    const { register, login } = require('./auth.controller');
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
                // Use controller function
                register(req.body)
                .then( apiResponse => res.json(apiResponse) )
                .catch( apiResponse => res.json(apiResponse) )
            });

            // Login
            authRouter.post('/login', (req, res) => {
                // Use controller function
                login(req.body)
                .then( apiResponse => res.json(apiResponse) )
                .catch( apiResponse => res.json(apiResponse) )
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