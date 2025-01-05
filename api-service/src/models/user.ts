import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    id: string;
    name: string;
    email: string;
    country:string;
    languages:[string],
    mobileNumber:string,
    yearOfExperience:number,
    description:string,
    firstTimeLogin:boolean,
    age:number,
    role: string;
    password: string;
    matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'raki', 'user'], default: 'user' },
    country: { type: String },
    languages: { type: [String] },
    mobileNumber: { type: String },
    age: { type: Number },
    firstTimeLogin:{type:Boolean},
    yearOfExperience: { type: Number, required: function() { return this.role === 'doctor'; } },
    description: { type: String, required: function() { return this.role === 'doctor'; } },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
