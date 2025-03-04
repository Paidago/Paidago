import User  from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        if (username) user.username = username;
        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10);

        const updatedUser = await user.save();

        return res.status(200).json({
            id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            paymentID: updatedUser.paymentID,
            profilePicture: updatedUser.profilePicture,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        return res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
