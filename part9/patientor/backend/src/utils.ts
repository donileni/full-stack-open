import { NewPatient, Gender } from "./types";
import { z } from "zod";

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string()

});

const toNewPatient = (object: unknown): NewPatient => {
    return NewPatientSchema.parse(object);
};

export default toNewPatient;