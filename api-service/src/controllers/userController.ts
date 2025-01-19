import {  Request,  Response } from 'express';
import User, {IUser} from '../models/user';
import {AuthenticatedRequest} from "../@types/express";
import moment from "moment-timezone";
import {getAllCountries, getTimezone} from "countries-and-timezones";



export const updateUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { name, email, country, timezone, languages, mobileNumber, age, yearOfExperience, description } = req.body;

        const userId = req.user?.id;
        if (!userId) {
            res.status(400).json({ message: 'User ID not found in request' });
            return;
        }

        const user = await User.findById(userId);

        if (!user) {
            res.status(400).json({ message: 'User not found' });
            return;
        }

        const countries = getAllCountries();


        if (name) user.name = name;
        if (email) user.email = email;
        if (country) user.country = country;
        if (languages) user.languages = languages;
        if (mobileNumber) user.mobileNumber = mobileNumber;
        if (age) user.age = age;

        if (user.role === 'admin') {
            if (yearOfExperience) user.yearOfExperience = yearOfExperience;
            if (description) user.description = description;
        }

        if (timezone) {
            if (!moment.tz.zone(timezone)) {
                res.status(400).json({ message: 'Invalid timezone format' });
                return;
            }
            user.timezone = timezone;
        } else if (country) {
            const timeZoneInfo = getTimezone(country);
            if (timeZoneInfo && timeZoneInfo.name) {
                user.timezone = timeZoneInfo.name;
            } else {
                res.status(400).json({ message: 'Could not find timezone for the provided country' });
                return;
            }
        }

        await user.save();

        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            country: user.country,
            timezone: user.timezone,
            languages: user.languages,
            mobileNumber: user.mobileNumber,
            age: user.age,
            yearOfExperience: user.yearOfExperience,
            description: user.description,
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: 'Server error', error });
    }
};

export const changePassword = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            res.status(400).json({ message: 'User ID not found in request' });
            return;
        }

        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const isMatch = await user.matchPassword(currentPassword);
        if (!isMatch) {
            res.status(400).json({ message: 'Current password is incorrect' });
            return;
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const updateUserRole = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { userId, role } = req.body;
        console.log(req.body)

        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        user.role = role;
        await user.save();

        res.status(200).json({ message: `Role updated to ${role} for user ${user.name}` });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


export const getAllUsers = async (req: Request, res: Response): Promise<void> => {

    try {
        const users = await User.find({ role: 'user' }).select("-password");

        if (!users || users.length === 0) {
            res.status(404).json({ message: 'No users found' });
            return;
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;

        const user = await User.findById(userId).select("-password");

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

