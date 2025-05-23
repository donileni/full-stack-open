import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import patientService from "../services/patients";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Diagnosis, Patient } from '../types';
import EntryView from './EntryView';
import EntryForm from './EntryView/EntryForm';

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

            <EntryForm setPatient={setPatient} patient={patient} diagnoses={diagnoses}/>

            <h3>entries</h3>
            {patient.entries.map(entry => (
                <div 
                    key={entry.id}
                    style={{
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        padding: '10px',
                        marginBottom: '10px',
                    }}
                >
                    <EntryView entry={entry}/>
                    {entry.diagnosisCodes && (
                        <>
                            <div>Diagnoses:</div>
                            <ul>
                                {entry.diagnosisCodes?.map((code, index) => {
                                const diagnosis = diagnoses.find(d => d.code === code);
                                    return (
                                        <li key={`${code}-${index}`}>
                                            {code} {diagnosis?.name}
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PatientView;