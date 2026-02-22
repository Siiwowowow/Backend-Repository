import { Request, Response } from "express";
import { PatientService } from "./patient.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";

// CREATE
const createPatients = catchAsync (async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await PatientService.createPatients(payload);
  sendResponse(res, {
    httpCode: 201,
    success: true,
    message: "Patient created successfully",
    data: result,
  });
});


// GET
const getAllPatients = catchAsync (async (req: Request, res: Response) => {
  const result = await PatientService.getAllPatients();
  sendResponse(res, {
    httpCode: 200,
    success: true,
    message: "Patients retrieved successfully",
    data: result,
  });
});

const deletePatient = catchAsync (async (req: Request, res: Response) => {
  const { id } = req.params;
  await PatientService.deletePatient(id as string);
  sendResponse(res, {
    httpCode: 200,
    success: true,
    message: "Patient deleted successfully",
  });
});
// UPDATE
const updatePatient = catchAsync (async (req: Request, res: Response) => {  
  const { id } = req.params;
  const payload = req.body;
  const result = await PatientService.updatePatient(id as string, payload);
  sendResponse(res, {
    httpCode: 200,
    success: true,
    message: "Patient updated successfully",
    data: result,
  });
});


export const PatientController = {
  createPatients,
  getAllPatients,
  updatePatient,
  deletePatient,
};