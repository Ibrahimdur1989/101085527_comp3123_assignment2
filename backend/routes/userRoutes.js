
const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// validate request data
function validate(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errors.array().map(e => `${e.param}: ${e.msg}`).join(', ');
        return res.status(400).json({ status: false, message: msg });
    }
}

// user signup 
router.post('/signup',
    [
        body('username').trim().notEmpty(),
        body('email').isEmail(),
        body('password').isLength({ min:6 })
    ],
    async (req, res) => {
        const v = validate(req, res); if (v) return;

        const { username, email, password } = req.body;
        const exists = await User.findOne({ $or: [{ email }, { username }] });
        if (exists) return res.status(400).json({ status:false, message:'User already exists' });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashed });

        return res.status(201).json({
            message: 'User created successfully.',
            user_id: user._id.toString()
        });
    }
);

// user login
router.post('/login', 
    [
        body('password').notEmpty(),
        body('email').optional().isEmail(),
        body('username').optional().isString().notEmpty()
    ],
    async (req, res) => {
        const v = validate(req, res); if (v) return;

        const { username, email, password } = req.body;
        const user = await User.findOne( email ? { email } : { username });
        if (!user) return res.status(401).json({ status:false, message:'Invalid Username and password' });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ status:false, message:'Invalid Username and password'});

        let token;
        if (process.env.JWT_SECRET){
            token = jwt.sign({ sub: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
        }

        return res.status(200).json({
            message: 'Login successfully.',
            jwt_token: token || 'Optional implementation'
        });
    }
);

module.exports = router;