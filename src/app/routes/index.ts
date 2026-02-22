import { Router } from "express";
import { SpecialtyRoutes } from "../module/specialty/specialty.route";
import { PatientRoutes } from "../module/patient/patient.route";
import { AuthRoutes } from "../module/auth/auth.route";

const router=Router();
router.use("/auth", AuthRoutes);
router.use("/specialties",SpecialtyRoutes);
router.use("/patient", PatientRoutes);

export const IndexRoutes=router;