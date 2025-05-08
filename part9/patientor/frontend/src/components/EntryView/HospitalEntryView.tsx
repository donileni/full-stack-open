import { HospitalEntry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface HospitalEntryProps {
    entry: HospitalEntry
}

const HospitalEntryView = ({entry}: HospitalEntryProps) => {
    return (
        <div>
            <div>{entry.date} <LocalHospitalIcon /></div>
            <div>diagnosed by {entry.specialist}</div>
            <div><i>{entry.description}</i></div>
            <div>discharged {entry.discharge.date}: {entry.discharge.criteria}</div>
        </div>
    );
};

export default HospitalEntryView;