import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IMeeting extends Document {
    id: string;
    meetingId: string;
    topic: string;
    rakiId:string;
    userId:string,
    notificationSend:boolean,
}

const meetingSchema: Schema<IMeeting> = new Schema({
    meetingId: { type: String, required: true },
    topic: { type: String, required: true, unique: true },
    rakiId: { type: String, required: true },
    userId: { type: String },
    notificationSend:{type:Boolean},
});



export default mongoose.model<IMeeting>('User', meetingSchema);
