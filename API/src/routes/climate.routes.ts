import { getClimateData, saveClimateData } from "@controllers/climate.controller";
import { Router } from "express";

const router = Router();

router.post("/", getClimateData);
router.post("/save", saveClimateData);

export default router;