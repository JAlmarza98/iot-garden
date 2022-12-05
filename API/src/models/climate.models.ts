import { IClimate } from "@interfaces/climate.interface";
import { Schema, model } from "mongoose";

const userSchema = new Schema<IClimate>({
    temperature: { type: Number, required: true},
    humidity: { type: Number, required: true},
    pollution: { type: Number, required: true},
    time_date: { type: Number, required: true},
});

const User = model<IClimate>("User", userSchema);

export default User;