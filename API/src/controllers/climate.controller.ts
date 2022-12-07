import { Request, Response } from "express";
import { IClimate, IClimateFilter } from '@interfaces/climate.interface';
import { getDayEndTime, getDayTimeCero, getWeekFirstDay, getWeekLastDay, getMounthFirstDay, getMounthLastDay } from "@utils/date-transforms.utils";
import Climate from "@models/climate.models";

export const getClimateData = async( req: Request , res: Response ) => {
    const filter: IClimateFilter = req.body;

    try {
        let data;

        if ( filter.time_end !== null ) { // Quering between two dates
            data = await Climate.find({ time_date: { $gte: filter.time_end, $lt: filter.time_start } });
        } else if( filter.time_end === null && filter.time_lapse === "day") { // Quering current day
            data = await Climate.find({ time_date: { $gte: getDayTimeCero(filter.time_start) , $lt: getDayEndTime(filter.time_start) } }); 
        } else if( filter.time_end === null && filter.time_lapse === "week" ) { // Quering current week
            data = await Climate.find({ time_date: { $gte: getWeekFirstDay(filter.time_start) , $lt: getWeekLastDay(filter.time_start) } }); 
        } else if( filter.time_end === null && filter.time_lapse === "mounth") { // Quering current mounth
            data = await Climate.find({ time_date: { $gte: getMounthFirstDay(filter.time_start) , $lt: getMounthLastDay(filter.time_start) } });
        }

        res.json({
            data: {
                status: 200,
                data
            },
            error: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            error: {
                status: 500,
                message: "Ha ocurrido un error inesperado, por favor pongase en contacto con el administrador del servicio"
            }
        });
    }

};

export const saveClimateData = async( req: Request , res: Response ) => {
    const climateData: IClimate = req.body;
    try {
        const data = new Climate(climateData);
        await data.save();
        res.json({
            data: {
                status: 200,
                message: "Datos guardados correctamente"
            },
            error: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            error: {
                status: 500,
                message: "Ha ocurrido un error inesperado, por favor pongase en contacto con el administrador del servicio"
            }
        });
    }

};