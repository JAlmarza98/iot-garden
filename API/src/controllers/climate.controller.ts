import { Request, Response } from "express";

export const getClimateData = async( req: Request , res: Response ) => {
    try {
        res.json({
            data: {
                status: 200,
                message: "Datos del proyecto seleccionado"
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