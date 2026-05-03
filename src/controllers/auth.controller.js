import * as authService from '../services/auth.service.js';

export const signUp = async (req, res) => {
    try {
        const token = await authService.registerUser(req.body);
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await authService.loginUser(email, password);
        res.json(result);

    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};