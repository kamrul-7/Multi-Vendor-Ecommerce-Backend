const adminModal = require('../models/adminModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Corrected to 'jsonwebtoken'
const { responseReturn } = require('../utiles/response');
const { createToken } = require('../utiles/tokenCreate');

class authControllers {
    admin_login = async (req, res) => {
        const { email, password } = req.body;
        try {
            const admin = await adminModal.findOne({ email }).select('+password');
            if (admin) {
                const match = await bcrypt.compare(password, admin.password);
                if (match) {
                    const token = await createToken({
                        id: admin.id,
                        role: admin.role
                    });
                    
                    // Set the cookie with the token
                    res.cookie('access_token', token, {
                        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Set the correct expiration time
                        httpOnly: true // Security: ensure cookie is not accessible via client-side scripts
                    });

                    responseReturn(res, 200, { token, message: "Login successfully" });
                } else {
                    responseReturn(res, 404, { error: "Password is incorrect! Try again" });
                }
            } else {
                responseReturn(res, 404, { error: "Email not found" });
            }
        } catch (err) {
            responseReturn(res, 500, { error: err.message }); // Fixed err.message handling
        }
    }
}

module.exports = new authControllers();
