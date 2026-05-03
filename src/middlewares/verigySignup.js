import User from '../models/User.js';

export const checkDuplicateEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const emailFound = await User.findOne({ email });
        if (emailFound) return res.status(400).json({ message: "El email ya está en uso" });

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};