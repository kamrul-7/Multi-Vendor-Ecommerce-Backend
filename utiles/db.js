const mongoose = require('mongoose');

module.exports.dbConnect = async () => {
    try {
        // Use the correct key name 'DB_URL'
        await mongoose.connect(process.env.DB_URL);
        console.log('Database Connected Successfully');
    } catch (err) {
        console.log(err.message);
    }
};
