import { Prisma, Patient } from "../../../generated/prisma/client";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import status from "http-status";

// CREATE
const createPatients = async (
  payload: Prisma.PatientCreateManyInput[]
) => {
  const result = await prisma.patient.createMany({
    data: payload,
    skipDuplicates: true, // duplicate email থাকলে skip করবে
  });

  return result;
};

// GET ALL
const getAllPatients = async (): Promise<Patient[]> => {
  const result = await prisma.patient.findMany();
  return result;
};

// UPDATE
const updatePatient = async (
  id: string,
  payload: Partial<Prisma.PatientUpdateInput>
): Promise<Patient> => {
  const patient = await prisma.patient.findUnique({
    where: { id },
  });

  if (!patient) {
    throw new AppError(status.NOT_FOUND, "Patient not found");
  }

  const result = await prisma.patient.update({
    where: { id },
    data: payload,
  });

  return result;
};

// DELETE
const deletePatient = async (id: string): Promise<Patient> => {
  const patient = await prisma.patient.findUnique({
    where: { id },
  });

  if (!patient) {
    throw new AppError(status.NOT_FOUND, "Patient not found or already deleted");
  }

  const result = await prisma.patient.delete({
    where: { id },
  });

  return result;
};

export const PatientService = {
  createPatients,
  getAllPatients,
  updatePatient,
  deletePatient,
};