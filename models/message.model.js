/*
Imports & configs
*/
const mongoose = require('mongoose');
const { Schema } = mongoose;
//


/*
Model definition
*/
const messageSchema = new Schema({
    content: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    date: { type: Date, default: Date.now }
})
//

/*
Method
*/

//

/*
Export
*/
const MessageModel = mongoose.model('message', messageSchema);
module.exports = MessageModel;
//