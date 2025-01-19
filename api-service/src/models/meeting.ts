import mongoose, { Schema, Document } from 'mongoose';

export interface IMeeting extends Document {
    id: string;
    meetingId: string;
    topic: string;
    date:Date;
    rakiId:string;
    userId:string,
    notificationSend:boolean,
}

const meetingSchema: Schema<IMeeting> = new Schema({
    meetingId: { type: String, required: true },
    topic: { type: String, required: true, unique: true },
    date:{type:Date,required:true},
    rakiId: { type: String, required: true },
    userId: { type: String },
    notificationSend:{type:Boolean},
});



export default mongoose.model<IMeeting>('User', meetingSchema);
