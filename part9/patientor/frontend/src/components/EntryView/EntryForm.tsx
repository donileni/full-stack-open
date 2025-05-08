import { SyntheticEvent, useState } from "react";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import { Patient, EntryWithoutId, HealthCheckRating, Diagnosis } from "../../types";
import OccupationalHealthcareFields from "./EntryFields/OccupationalHealthcareFields";
import HealthCheckFields from "./EntryFields/HealthCheckFields";
import HospitalFields from "./EntryFields/HospitalFields";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField
} from "@mui/material";


interface EntryFormProps {
    setPatient: React.Dispatch<React.SetStateAction<Patient | null>>
    patient: Patient
    diagnoses: Diagnosis[]
}

const EntryForm = ({ patient, setPatient, diagnoses }: EntryFormProps) => {
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [specialist, setSpecialist] = useState<string>("");
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating | "" >("");
    const [sickLeaveStart, setSickLeaveStart] = useState<string>("");
    const [sickLeaveEnd, setSickLeaveEnd] = useState<string>("");
    const [employerName, setEmployerName] = useState<string>("");
    const [dischargeDate, setDischargeDate] = useState<string>("");
    const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
    const [type, setType] = useState<"HealthCheck" | "Hospital" | "OccupationalHealthcare" | "">("");

    const [error, setError] = useState("");

    const resetStateVariables = () => {
        setType("");
        setDescription("");
        setDate("");
        setSpecialist("");
        setDiagnosisCodes([]);
        setHealthCheckRating(""); 
        setEmployerName("");
        setSickLeaveEnd("");
        setSickLeaveStart("");
        setDischargeCriteria("");
        setDischargeDate("");
    };

    const { id } = useParams();
    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();

        let newEntry: EntryWithoutId;

        if (!id) {
            console.error("Missing patient ID");
            return;
        }

        switch (type) {
            case "HealthCheck":
                newEntry = {
                    type,
                    description,
                    date,
                    specialist,
                    diagnosisCodes: diagnosisCodes, 
                    healthCheckRating: Number(healthCheckRating)
                };
                break;
            case "Hospital":
                newEntry = {
                    type,
                    description,
                    date,
                    specialist,
                    diagnosisCodes: diagnosisCodes,
                    discharge: {date: dischargeDate, criteria: dischargeCriteria}
                };
                break;
            case "OccupationalHealthcare":
                newEntry = {
                    type,
                    description,
                    date,
                    specialist,
                    diagnosisCodes: diagnosisCodes,
                    employerName,
                    ...(sickLeaveStart && sickLeaveEnd ? { sickLeave: {startDate: sickLeaveStart, endDate: sickLeaveEnd} } : null)
                };
                break;
            default:
                throw new Error("Unknown entry type");
        }

        patientService.addNewEntry(id, newEntry)
            .then(data => {
                setPatient({
                    ...patient,
                    entries: [...patient.entries, data]
                });
            }) 
            .catch(error => {
                setError("Error: " + error.response?.data.error[0].message);
                    setTimeout(() => {
                        setError("");
                    }, 5000);
            });

        resetStateVariables();
    };

    const renderFields = () => {
        switch (type) {
            case "HealthCheck":
                return <HealthCheckFields 
                    setHealthCheckRating={setHealthCheckRating}
                />;
            case "Hospital":
                return <HospitalFields 
                    dischargeDate={dischargeDate}
                    dischargeCriteria={dischargeCriteria}
                    setDischargeCriteria={setDischargeCriteria}
                    setDischargeDate={setDischargeDate}
                />;
            case "OccupationalHealthcare": 
                return <OccupationalHealthcareFields 
                    employerName={employerName}
                    setEmployerName={setEmployerName}
                    sickLeaveStart={sickLeaveStart}
                    setSickLeaveStart={setSickLeaveStart}
                    sickLeaveEnd={sickLeaveEnd}
                    setSickLeaveEnd={setSickLeaveEnd}
                />;
            default:
                return null;
        }
    };

    const handleChangeType = (event: SelectChangeEvent) => {
        if(event.target.value === "Hospital" || event.target.value === "HealthCheck" || event.target.value === "OccupationalHealthcare") {
            resetStateVariables();
            setType(event.target.value);
        }
    };

    const handleDiagnosesChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
        const {
            target: { value },
        } = event;
            setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
    };

    return (
        <div>
            <h3>Select Entry Type</h3>
            <Box sx={{ minWidth: 120 }} padding={1}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Entry</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Type"
                onChange={handleChangeType}
                >
                <MenuItem value={"HealthCheck"}>HealthCheck</MenuItem>
                <MenuItem value={"Hospital"}>Hospital</MenuItem>
                <MenuItem value={"OccupationalHealthcare"}>OccupationalHealthcare</MenuItem>
                </Select>
            </FormControl>
            </Box>

            {type && (
                <div>
                    <p style={{color: "red"}}>{error}</p>
                    <div 
                        style={
                            {
                                border: '1px dashed #ccc',
                                borderRadius: '4px',
                                padding: '10px',
                                marginBottom: '10px',
                            }
                        }>
                            <h4>New {type} Entry</h4>
                            <form onSubmit={addEntry}>
                                
                                <TextField 
                                    id="description" 
                                    value={description} 
                                    label="Description" 
                                    variant="standard" 
                                    fullWidth 
                                    onChange={({target}) => setDescription(target.value)}
                                    style={{ marginBottom: '10px' }}
                                    required
                                />
                                <TextField 
                                    id="date" 
                                    type="date"
                                    value={date} 
                                    label="Date" 
                                    variant="standard" 
                                    fullWidth 
                                    onChange={({target}) => setDate(target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    style={{ marginBottom: '10px' }}
                                    required
                                />
                                <TextField 
                                    id="specialist" 
                                    value={specialist} 
                                    label="Specialist" 
                                    variant="standard" fullWidth 
                                    onChange={({target}) => setSpecialist(target.value)}
                                    style={{ marginBottom: '10px' }}
                                    required
                                />
                                <FormControl fullWidth>
                                    <InputLabel>Diagnoses</InputLabel>
                                    <Select
                                        labelId="diagnosisSelect"
                                        id="diagnosisSelect"
                                        multiple
                                        value={diagnosisCodes}
                                        onChange={handleDiagnosesChange}
                                        input={<OutlinedInput label="Diagnosis"/>}
                                        renderValue={(selected) => selected.join(", ")}
                                        MenuProps={MenuProps}
                                    >
                                        {diagnoses.map((diagnosis) => (
                                            <MenuItem key={diagnosis.code} value={diagnosis.code}>
                                                <Checkbox checked={diagnosisCodes.includes(diagnosis.code)}/>
                                                <ListItemText primary={diagnosis.code}/>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {renderFields()}

                                <div style={{ padding: "10px", display: "flex", justifyContent: "space-between"}}>
                                    <Button variant="outlined" color="error" onClick={() => resetStateVariables()}>Cancle</Button>
                                    <Button type="submit" variant="contained">Add</Button>
                                </div>
                            </form>
                    </div>
                </div>
            )} 
        </div>
    
    );
};

export default EntryForm;