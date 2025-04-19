import data from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatient } from "../types";
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

export default { getPatients, getNonSensitivePatients, getNonSensitivePatient, addPatient }; 