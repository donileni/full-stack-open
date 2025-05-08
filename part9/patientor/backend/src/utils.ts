import { NewPatient, Gender, EntryWithoutId, Diagnosis, SickLeave, HealthCheckRating, Discharge } from "./types";
import { z } from "zod";

const isSickLeave = (param: unknown): param is SickLeave => {
    if (typeof param === "object" && param !== null) {
        const data = param as Record<string, unknown>;
        return ( typeof data.startDate === "string" && typeof data.endDate === "string");
    }
    return false;
};

const isDischarge = (param: unknown): param is Discharge => {
    if (typeof param === "object" && param !== null) {
        const data = param as Record<string, string>;
        return ( typeof data.date === "string" && typeof data.criteria === "string");
    }
    return false;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
    if (!sickLeave) {
        return undefined;
    }

    if (!isSickLeave(sickLeave)) {
        throw new Error("Incorrect sick leave input");
    }
    return sickLeave;
};

const parseDischarge = (discharge: unknown): Discharge => {
    if(!isDischarge(discharge)) {
        throw new Error("Incorrect discharge");
    }
    return discharge;
};

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string()

});

export const toNewPatient = (object: unknown): NewPatient => {
    return NewPatientSchema.parse(object);
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
    if ( !object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }

    if ("description" in object && "date" in object && "specialist" in object && "type" in object) {
        const newEntry = {
            description: z.string().parse(object.description),
            date: z.string().date().parse(object.date),
            specialist: z.string().parse(object.specialist),
            diagnosisCodes: 
                "diagnosisCodes" in object && 
                Array.isArray(object.diagnosisCodes) &&
                !(object.diagnosisCodes.length === 0)
                ? parseDiagnosisCodes(object) : undefined
        };

        switch (object.type) {
            case "HealthCheck":
                if ("healthCheckRating" in object) {
                    return {
                    ...newEntry,
                    type: "HealthCheck",
                    healthCheckRating: z.nativeEnum(HealthCheckRating).parse(object.healthCheckRating)
                    };
                } 
                throw new Error("Incorrect data: health check rating missing");
            case "Hospital":
                if ("discharge" in object) {
                    return {
                        ...newEntry,
                        type: "Hospital",
                        discharge: parseDischarge(object.discharge)
                    };
                }
                throw new Error("Incorrect data: discharge missing");
            
            case "OccupationalHealthcare":
                if ("employerName" in object && "sickLeave" in object) {
                    return {
                        ...newEntry,
                        type: "OccupationalHealthcare",
                        employerName: z.string().parse(object.employerName),
                        sickLeave: object.sickLeave ? parseSickLeave(object.sickLeave) : undefined
                    };
                } else if ("employerName" in object) {
                    return {
                        ...newEntry,
                        type: "OccupationalHealthcare",
                        employerName: z.string().parse(object.employerName),
                    };
                };
                throw new Error("Incorrect data: employer name or sick leave missing");
        
            default:
                throw new Error("Incorrect type: " + object.type);
        }
    }
    throw new Error("Error: missing parameters");
};