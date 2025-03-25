import data from "../../data/diagnoses"; 
import { Diagnosis } from "../types";

const diagnoses: Diagnosis[] = data;

const getDiagnosis = (): Diagnosis[] => {
    return diagnoses;
};

export default { getDiagnosis }; 