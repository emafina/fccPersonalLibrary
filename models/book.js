const mongoose = require('mongoose');

function cleanRetDoc(doc, ret, options) {
    delete ret.__v;
    delete ret.id;
    return ret;
};

function cleanForList(doc,ret,options) {
    delete ret.__v;
    delete ret.id;
    delete ret.comments;
}

const options = {
    // timestamps: true,
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
    },
    comments:[String]
},options);

bookSchema.virtual('commentcount').get(function(){
    return this.comments.length;
});

bookSchema.static('getList',async function(){
    const books = await this.find();
    return books.map(book=>(book.toJSON({transform:cleanForList})));
})

bookSchema.method('getPostLog',function(){
    function cleanForPostLog(doc,ret,options) {
        delete ret.__v;
        delete ret.comments;
    } 
    return this.toJSON({transform:cleanForPostLog,virtuals:false});
})

module.exports = mongoose.model('Book',bookSchema);