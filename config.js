require('dotenv').config();

module.exports = {
    port : process.env.PORT || 5000,
    mongoUri : process.env.MONGO_URI,
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
    cookieSecure: process.env.COOKIE_SECURE === 'true'
}