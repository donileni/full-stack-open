import { OccupationalHealthcareEntry } from "../../types";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

interface HospitalEntryProps {
    entry: OccupationalHealthcareEntry
}

const OccupationalHealthcareEntryView = ({entry}: HospitalEntryProps) => {
    return (
        <div>
            <div>{entry.date} <MedicalInformationIcon /> <i>{entry.employerName}</i></div>
            <div>diagnosed by {entry.specialist}</div>
            <div><i>{entry.description}</i></div>
            {entry.sickLeave && (
                <>
                    <div>sick leave: </div>
                    <ul>
                        <li>from: {entry.sickLeave?.startDate}</li>
                        <li>from: {entry.sickLeave?.endDate}</li>
                    </ul>
                
                </>
            )}
        </div>
    );
};

export default OccupationalHealthcareEntryView;