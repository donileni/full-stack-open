import data from "../../data/patients";
import { Patient, NonSensitivePatient } from "../types";

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

export default { getPatients, getNonSensitivePatient }; 