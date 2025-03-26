import data from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatient } from "../types";
import { v1 as uuid } from 'uuid';

const patientData: Patient[] = data; 

const getPatients = (): Patient[] => {
    return patientData;
};

const getNonSensitivePatient = (): NonSensitivePatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
    const newId = uuid();
    const newPatient = {
        id: newId,
        ...patient,
    };
    data.push(newPatient);
    return newPatient;
};

export default { getPatients, getNonSensitivePatient, addPatient }; 