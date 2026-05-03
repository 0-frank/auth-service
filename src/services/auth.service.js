import User from '../models/User.js';
import Role from '../models/Role.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

async function encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

async function comparePassword(password, receivedPassword) {
    return await bcrypt.compare(password, receivedPassword);
}

async function generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 86400
    });
};

async function getRolesByNames(roles) {
    if (roles && roles.length > 0) {
        const foundRoles = await Role.find({ name: { $in: roles } });
        return foundRoles.map(role => role.id);
    }
    const defaultRole = await Role.findOne({ name: "user" });
    return defaultRole ? [defaultRole._id] : [];
};


export const registerUser = async (userData) => {
    const { username, email, password, roles } = userData;

    const hashedPassword = await encryptPassword(password);

    const rolesIds = await getRolesByNames(roles);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        roles: rolesIds
    });
    const savedUser = await newUser.save();

    return generateToken(savedUser._id);
};

export const loginUser = async (email, password) => {
    const userFound = await User.findOne({ email }).populate("roles");
    if (!userFound) throw new Error("Usuario no encontrado");

    const isMatch = await comparePassword(password, userFound.password);
    if (!isMatch) throw new Error("Contraseña incorrecta");

    const token = generateToken(userFound._id);
    return {
        token,
        username: userFound.username,
        roles: userFound.roles.map(r => r.name)
    };
};