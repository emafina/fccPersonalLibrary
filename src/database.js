const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

class Database {
    constructor() {
        this._connect();
    };
    _connect() {
        mongoose
            .connect(mongoURI)
            .then(()=>{
                console.log('Database connection successful');
            })
            .catch((error)=>{
                console.log('Database connection error');
                console.log(error);
            });
    };
};

module.exports = new Database();