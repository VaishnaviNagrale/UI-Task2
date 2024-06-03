import User from '../models/userModel.js';
import pkg from 'jsonwebtoken';
const { sign } = pkg;
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator';

export async function signup(req, res) {
    // console.log('testing signup route');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log('errorsssssssss');
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, name, profilePicture } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            username,
            email,
            password,
            name,
            profilePicture,
        });

        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        // console.log('error 2');
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
