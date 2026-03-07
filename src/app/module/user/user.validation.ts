import z from "zod";
import { Gender } from "../../../generated/prisma/enums";

export const createDoctorZodSchema = z.object({
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
  doctor: z.object({
    name: z.string()
      .min(3, "Name must be at least 3 characters")
      .max(100, "Name must be less than 100 characters"),
    email: z.string().email("Valid email is required"),
    contactNumber: z.string()
      .min(11, "Contact number must be at least 11 digits")
      .max(15, "Contact number must be at most 15 digits"),
    address: z.string()
      .min(5, "Address must be at least 5 characters")
      .max(200, "Address must be less than 200 characters")
      .optional(),
    registrationNumber: z.string(),
    experience: z.number().nonnegative().optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE]).optional(),
    appointmentFee: z.number().nonnegative(),
    qualifications: z.string() // <-- fixed to plural
      .min(5, "Qualifications must be at least 5 characters")
      .max(200, "Qualifications must be less than 200 characters"),
    currentWorkingPlace: z.string()
      .min(3, "Current working place must be at least 3 characters")
      .max(100, "Current working place must be less than 100 characters"),
    designation: z.string()
      .min(3, "Designation must be at least 3 characters")
      .max(100, "Designation must be less than 100 characters"),
  }),
  specialties: z.array(z.string().uuid("Specialty ID must be a valid UUID"))
    .min(1, "At least one specialty is required"),
});