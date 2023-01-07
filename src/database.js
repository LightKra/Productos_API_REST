import mongoose from 'mongoose';
mongoose.connect("mongodb://localhost/companyDb")
    .then(db => console.log('db is connect'))
    .catch(error => console.log(error));