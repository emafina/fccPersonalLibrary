const mongoose = require('mongoose');

function cleanRetDoc(doc, ret, options) {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    delete ret.id;
    return ret;
};

const options = {
    timestamps: true,
    toJSON: {
        virtuals: true,
        getters: true,
        transform: cleanRetDoc
    }
};

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
},options);

bookSchema.virtual('created_on').get(function(){
    return this.createdAt;
});

bookSchema.virtual('updated_on').get(function(){
    return this.updatedAt;
});

module.exports = mongoose.model('Book',bookSchema);