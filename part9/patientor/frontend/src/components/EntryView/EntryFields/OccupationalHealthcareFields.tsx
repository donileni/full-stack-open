import TextField from "@mui/material/TextField";

interface OccupationalHealthcareFieldsProps {
    employerName: string
    sickLeaveStart: string
    sickLeaveEnd: string
    setEmployerName: React.Dispatch<React.SetStateAction<string>>
    setSickLeaveStart: React.Dispatch<React.SetStateAction<string>>
    setSickLeaveEnd: React.Dispatch<React.SetStateAction<string>>
}

const OccupationalHealthcareFields = ({
    employerName, setEmployerName,
    sickLeaveStart, setSickLeaveStart,
    sickLeaveEnd, setSickLeaveEnd
}: OccupationalHealthcareFieldsProps) => {
    return (
        <div>
            <TextField id="employerName" 
                value={employerName} 
                label="Employer Name" 
                variant="standard" 
                fullWidth 
                onChange={({target}) => setEmployerName(target.value)}
                required
            />
            <h4 style={{ marginBottom: 5 }}>Sick Leave</h4>
            <div style={{ marginLeft: '16px' }}>
                <TextField 
                    id="sickLeaveStart" 
                    type="date"
                    value={sickLeaveStart} 
                    label="Start Date" 
                    variant="standard" 
                    fullWidth onChange={({target}) => setSickLeaveStart(target.value)} 
                    style={{ marginBottom: '10px' }}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField 
                    id="sickLeaveEnd" 
                    type="date"
                    value={sickLeaveEnd} 
                    label="End Date" 
                    variant="standard" 
                    fullWidth 
                    onChange={({target}) => setSickLeaveEnd(target.value)}
                    style={{ marginBottom: '10px' }}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                />
            </div>
        </div>  
    );
};

export default OccupationalHealthcareFields;