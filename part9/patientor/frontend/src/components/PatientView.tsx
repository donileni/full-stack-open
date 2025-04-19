import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import patientService from "../services/patients";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Diagnosis, Patient } from '../types';

interface PatientViewProps {
    diagnoses: Diagnosis[];
}

const PatientView = ({ diagnoses }: PatientViewProps) => {
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

            <h3>entries</h3>
            {patient.entries.map(entry => (
                <div key={entry.date}>
                    <div>{entry.date} <i>{entry.description}</i></div>
                    <ul>
                        {entry.diagnosisCodes?.map(code => {
                            const diagnosis = diagnoses.find(d => d.code === code);
                            return (
                                <li key={code}>
                                    {code} {diagnosis?.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default PatientView;