import z from "zod";

const createPatientValidationSchema = z.object({
  password: z.string(),
  patient: z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Invalid email address"),
    address: z.string().optional(),
  }),
});
const createDoctorValidationSchema = z.object({
  password: z.string(),
  doctor: z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Invalid email address"),
    address: z.string().optional(),
    contactNumber: z.string().nonempty("Contact number is required"),
    registrationNumber: z.string().nonempty("Registration number is required"),
    experience: z
      .number()
      .int()
      .nonnegative("Experience must be a non-negative integer"),
    gender: z
      .enum(["MALE", "FEMALE", "OTHER"])
      .nonoptional("Gender is required"),
    appointmentFee: z
      .number()
      .nonnegative("Appointment fee must be a non-negative number"),
    qualification: z.string().nonempty("Qualification is required"),
    currentWorkingPlace: z
      .string()
      .nonempty("Current working place is required"),
    designation: z.string().nonempty("Designation is required"),
  }),
});

const createAdminValidationSchema = z.object({
  password: z.string(),
  admin: z.object({ 
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Invalid email address"),
    contactNumber: z.string().nonempty("Contact number is required"),
  }),
});


export const UserValidation = {
  createPatientValidationSchema,
  createDoctorValidationSchema,
  createAdminValidationSchema
};
