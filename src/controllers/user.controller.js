import User from "../models/User.js";

export async function getUsers(req, res) {
    try {
        const users = await User.find().populate("roles", "name");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
};

export async function createUser(req, res) {
    res.status(200).json({ message: "Creando usuarios" });
};