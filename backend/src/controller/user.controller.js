import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.auth().userId;
    const users = await User.find({ clerkId: { $ne: currentUserId } });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const myId = req.auth().userId;
    const otherClerkId = req.params.clerkId;

    console.log("Fetching messages for:", otherClerkId);
    console.log("Current user Clerk ID:", myId);

    const messages = await Message.find({
      $or: [
        {
          senderId: myId,
          receiverId: otherClerkId,
        },
        {
          senderId: otherClerkId,
          receiverId: myId,
        },
      ],
    }).sort({ createdAt: 1 });

    console.log("Messages found:", messages);

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
