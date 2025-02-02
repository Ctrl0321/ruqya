import {  Request,  Response } from 'express';
import User from '../models/user';
import generateToken from '../utils/generateToken';
import {client, serverClientChat} from "../config/streamConfig";
import {getStreamAdminRole} from "../utils/getStreamAdminRole";
import {googleClient} from "../config/googleAuthConfig";



export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password ,role} = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const user = await User.create({
            name,
            email,
            password,
            role
        });


        if (user) {
            console.log(`Registering user in Stream Video: ${user._id}`);

            await client.upsertUsers([{
                id: user.id,
                name: user.name,
                role: getStreamAdminRole({role:user.role}),
                image: `https://getstream.io/random_svg/?id=${user.id}&name=${user.name}`
            }]);

            await serverClientChat.upsertUsers([{
                id: user.id,
                name: user.name,
                role: getStreamAdminRole({role:user.role}),
                image: `https://getstream.io/random_svg/?id=${user.id}&name=${user.name}`
            }]);

            console.log("User registered successfully in Stream Video.");


            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id, user.role)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id, user.role),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const loginWithGoogle = async (req: Request, res: Response): Promise<void> => {
    try {
        const { tokenId } = req.body;

        const ticket = await googleClient.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            res.status(400).json({ message: 'Invalid Google token' });
            return;
        }

        let user = await User.findOne({
            $or: [
                { email: payload.email },
                { googleId: payload.sub }
            ]
        });

        if (user) {
            if (!user.googleId) {
                user.googleId = payload.sub;
                await user.save();
            }

            await client.upsertUsers([{
                id: user.id,
                name: user.name,
                role: getStreamAdminRole({role: user.role}),
                image: `https://getstream.io/random_svg/?id=${user.id}&name=${user.name}`
            }]);

            await serverClientChat.upsertUsers([{
                id: user.id,
                name: user.name,
                role: getStreamAdminRole({role: user.role}),
                image: `https://getstream.io/random_svg/?id=${user.id}&name=${user.name}`
            }]);

            res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id, user.role)
            });


            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id, user.role),
                isGoogleAccount: true
            });
        } else {
            const newUser = await User.create({
                name: payload.name,
                email: payload.email,
                googleId: payload.sub,
                picture: payload.picture,
                role: 'user',
                password: ''
            });

            await client.upsertUsers([{
                id: newUser.id,
                name: newUser.name,
                role: getStreamAdminRole({role: newUser.role}),
                image: `https://getstream.io/random_svg/?id=${newUser.id}&name=${newUser.name}`
            }]);

            await serverClientChat.upsertUsers([{
                id: newUser.id,
                name: newUser.name,
                role: getStreamAdminRole({role:  newUser.role}),
                image: `https://getstream.io/random_svg/?id=${newUser.id}&name=${newUser.name}`
            }]);


            res.status(201).json({
                _id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                token: generateToken(newUser.id, newUser.role),
                isGoogleAccount: true
            });
        }
    } catch (error) {
        console.error('Google login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
