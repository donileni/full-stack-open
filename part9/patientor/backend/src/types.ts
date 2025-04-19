import { z } from "zod";
import { NewPatientSchema } from "./utils";

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export type Diagnosis = {
    code: string
    name: string
    latin?: string
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export type Patient = {
    id: string
    name: string
    dateOfBirth: string
    ssn: string
    gender: Gender
    occupation: string
    entries: Entry[]
};

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type NewPatient = z.infer<typeof NewPatientSchema>;