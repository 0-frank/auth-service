import User from "../models/User.js";
import Role from "../models/Role.js";

async function mapROleNamesToIds(roleNames) {
    if (!roleNames) return null;

    const foundRoles = await Role.find({ name: { $in: roleNames } });
    return foundRoles.map(role => role._id);
}

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

export async function updateUserById(req, res) {
    try {
        const { roles, ...otherData } = req.body;
        const updateData = { ...otherData };

        const rolesIds = await mapROleNamesToIds(roles)
        if (rolesIds) updateData.roles = rolesIds;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).populate("roles", "name");

        if (!updatedUser) return res.status(404).json({ message: "Usuario no encontrado" });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar usuario" });
    }
};
export async function deleteUserById(req, res) {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "Usuario no encontrado" });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar usuario" });
    }
}