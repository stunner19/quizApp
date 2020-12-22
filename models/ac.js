const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const acSchema = new Schema({
    QId: {
        type: Number
    },
    QState: {
        type: Number
    },
    QTt: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});

const modelClass = mongoose.model('AC',acSchema);
module.exports = modelClass;