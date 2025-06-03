import { User } from '../models/user.model.js';

export const getAllUsers = async (req, res, next) => { 
    try {
        //you can get the current user id because of the clerk middleware and because of your protectRoute middleware
        const currentUserId = req.auth.userId;
        const users = await User.find({ clerkId: { $ne: currentUserId } });
        res.status(200).json(users);
    }catch (error) {
        next(error) 
    }
}