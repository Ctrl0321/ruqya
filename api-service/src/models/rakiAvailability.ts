import mongoose, { Schema, Document } from 'mongoose';

export interface IRakiAvailability extends Document {
    rakiId: string;
    date: string; // Date in YYYY-MM-DD format
    timeSlots: {
        startTime: string; // UTC time in ISO string format
        endTime: string; // UTC time in ISO string format
        isAvailable: boolean;
    }[];
}

const rakiAvailabilitySchema: Schema<IRakiAvailability> = new Schema({
    rakiId: { type: String, required: true },
    date: { type: String, required: true, unique: true },
    timeSlots:[
        {
            startTime: { type: String, required: true },
            endTime: { type: String, required: true },
            isAvailable: { type: Boolean, required: true }
        }
    ]
});



export default mongoose.model<IRakiAvailability>('RakiAvailability', rakiAvailabilitySchema);
