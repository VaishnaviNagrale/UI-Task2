import Post from '../models/postModel.js';
import { validationResult } from 'express-validator';

export async function getPosts(req, res) {
    try {
        const posts = await Post.find().populate('user', ['username', 'profilePicture']).sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
