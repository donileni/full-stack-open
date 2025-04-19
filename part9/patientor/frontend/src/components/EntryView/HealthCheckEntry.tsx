import { HealthCheckEntry } from "../../types";
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';

interface HospitalEntryProps {
    entry: HealthCheckEntry
}

const HealthCheckEntryView = ({entry}: HospitalEntryProps) => {
    return (
        <div>
            <div>{entry.date} <TroubleshootIcon /></div>
            <div>diagnosed by {entry.specialist}</div>
            <div><i>{entry.description}</i></div>
            <div>healthcheck rating: {entry.healthCheckRating}</div>
        </div>
    );
};

export default HealthCheckEntryView;