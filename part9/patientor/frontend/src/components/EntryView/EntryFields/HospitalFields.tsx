import TextField from "@mui/material/TextField";

interface HospitalFieldsProps {
    dischargeDate: string
    dischargeCriteria: string
    setDischargeDate: React.Dispatch<React.SetStateAction<string>>
    setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>
}

const HospitalFields = ({dischargeDate, dischargeCriteria, setDischargeDate, setDischargeCriteria}: HospitalFieldsProps) => {
    return (
        <div>
            <h4 style={{ marginBottom: 5 }}>Discharge Info</h4>
            <div style={{ marginLeft: '16px' }}>
                <TextField 
                    id="dischargeDate"
                    type="date"
                    value={dischargeDate} 
                    label="Date" 
                    variant="standard" 
                    fullWidth 
                    onChange={({target}) => setDischargeDate(target.value)}
                    style={{ marginBottom: '10px' }}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <TextField 
                    id="dischargeCriteria" 
                    value={dischargeCriteria} 
                    label="Criteria" 
                    variant="standard" 
                    fullWidth 
                    onChange={({target}) => setDischargeCriteria(target.value)}
                    style={{ marginBottom: '10px' }}
                    size="small"
                    required
                />
            </div>
        </div> 
    );
};

export default HospitalFields;