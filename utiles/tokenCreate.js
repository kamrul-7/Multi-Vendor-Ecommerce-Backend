const jwt = require('jsonwebtoken'); // Corrected to lowercase

module.exports.createToken = async (data) => {
    const token = await jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '7d' });
    return token;
};
