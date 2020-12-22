const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const signalSchema = new Schema({
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

const modelClass = mongoose.model('SIGNAL',signalSchema);
module.exports = modelClass;