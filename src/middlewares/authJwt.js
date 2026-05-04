import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Role from '../models/Role.js'


function extractToken(req) {
    return req.headers["x-access-token"];
};

async function decodeToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error("Token invalido o expirado");
    }
};

async function findUserToken(userId) {
    const user = await User.findById(userId, { password: 0 });
    if (!user) throw new Error("Usuario no encontrado");
    return user;
};



export const verifyToken = async (req, res, next) => {
    try {
        const token = await extractToken(req);
        if (!token) return res.status(403).json({ message: "No se proporcionó un token" });

        const decoded = await decodeToken(token);
        req.userId = decoded.id;

        await findUserToken(req.userId);

        next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).populate("roles");
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        const hasAdminRole = user.roles.some(role => role.name === "admin");

        if (hasAdminRole) {
            next();
        } else {
            return res.status(403).json({ message: "Requiere rol de Administrador" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al verificar permisos" });
    }
};