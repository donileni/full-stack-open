import data from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatient, EntryWithoutId, Entry } from "../types";
import { v1 as uuid } from 'uuid';

const patientData: Patient[] = data; 

const getPatients = (): Patient[] => {
    return patientData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
  }));
};

const getNonSensitivePatient = (id: string): Patient | undefined => {
    return patientData.find(patient => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
    const newId = uuid();
    const newPatient = {
        id: newId,
        entries: [],
        ...patient,
    };
    data.push(newPatient);
    return newPatient;
};

const addEntry = (id: string, entry: EntryWithoutId): Entry => {
    const newId = uuid();
    const newEntry = {
        id: newId,
        ...entry
    };
    const patient = data.find(patient => patient.id === id); 

    if (!patient) {
        throw new Error("Patient not found");
    }

    patient.entries.push(newEntry);
    return newEntry;  
};

export default { getPatients, getNonSensitivePatients, getNonSensitivePatient, addPatient, addEntry }; 