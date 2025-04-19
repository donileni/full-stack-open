import { Entry } from "../../types";
import HealthCheckEntryView from "./HealthCheckEntry";
import HospitalEntryView from "./HospitalEntryView";
import OccupationalHealthcareEntryView from "./OccupationalHealthcareEntry";


interface EntryViewProps {
    entry: Entry
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryView = ({entry}: EntryViewProps) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntryView entry={entry}/>;
        case "HealthCheck":
            return <HealthCheckEntryView entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryView entry={entry}/>;
        default:
            return assertNever(entry);
    }
};

export default EntryView;