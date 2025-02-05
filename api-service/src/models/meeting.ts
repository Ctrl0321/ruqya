import mongoose, { Schema, Document } from 'mongoose';



export enum MeetingStatus {
    SCHEDULED = 'scheduled',
    RESCHEDULED = 'rescheduled',
    CANCELLED = 'cancelled'
}

export interface IMeeting extends Document {
    id: string;
    meetingId: string;
    topic: string;
    date:Date;
    rakiId:string;
    userId:string,
    notificationSend:boolean,
    status:string,
    isPaid:boolean,
    requestedAt:Date,
    note:string
}

const meetingSchema: Schema<IMeeting> = new Schema({
    meetingId: { type: String, required: true },
    topic: { type: String, required: true, unique: true },
    date:{type:Date,required:true},
    rakiId: { type: String, required: true },
    userId: { type: String },
    notificationSend:{type:Boolean},
    status:{type:String},
    isPaid:{type:Boolean, default: false},
    requestedAt:{type:Date},
    note:{type:String}
});



export default mongoose.model<IMeeting>('Meeting', meetingSchema);
