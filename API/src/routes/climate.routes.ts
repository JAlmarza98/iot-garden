import { getClimateData } from "@controllers/climate.controller";
import { Router } from "express";

const router = Router();

router.get("/", getClimateData);

export default router;