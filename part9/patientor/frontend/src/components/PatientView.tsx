import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import patientService from "../services/patients";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Patient } from '../types';

const PatientView = () => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const id = useParams().id;

    useEffect(() => {
        if (!id) return;

        const getPatient = async () => {
            try {
                const data = await patientService.findById(id);
                setPatient(data);
            } catch (error) {
                console.log("Something went wrong: ", error);
            }
        }; 
        getPatient();
    }, [id]);
    
    if (!patient) {
        return <div>Patient not found...</div>;
    }

    let GenderIcon = MaleIcon;
    if (patient.gender === "female") GenderIcon = FemaleIcon;
    else if (patient.gender === "other") GenderIcon = QuestionMarkIcon;

    return(
        <div>
            <h2>{patient.name} <GenderIcon /></h2> 
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
        </div>
    );
};

export default PatientView;