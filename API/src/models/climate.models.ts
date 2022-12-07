import { Schema, model } from "mongoose";
import { IClimate } from "@interfaces/climate.interface";

const climateSchema = new Schema<IClimate>({
    temperature: { type: Number, required: true},
    humidity: { type: Number, required: true},
    pollution: { type: Number, required: true},
    time_date: { type: Number, required: true},
});

const Climate = model<IClimate>("Climate", climateSchema);

export default Climate;