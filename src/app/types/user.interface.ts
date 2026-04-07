import { Gender } from "../enums/gender";

export type ICreatePatient = {
  name: string;
  email: string;
  password: string;
};

export type ICreateDoctor = {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  registrationNumber: string;
  experience: number;
  gender: Gender;
  appointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;

};
