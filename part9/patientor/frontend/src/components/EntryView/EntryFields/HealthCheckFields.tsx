import { HealthCheckRating } from "../../../types";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

interface HealthCheckFieldsProps {
    setHealthCheckRating: React.Dispatch<React.SetStateAction<HealthCheckRating | "">>

}

const HealthCheckFields = ({ setHealthCheckRating}: HealthCheckFieldsProps) => {

    return (
        <div style={{marginTop: 10}}>
            <FormControl required>
                <FormLabel id="healthcheck-radio">HealthCheck Rating</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={({target}) => setHealthCheckRating(Number(target.value))}
                >
                    {Object.entries(HealthCheckRating)
                        .filter(([_, value]) => typeof value === "number")
                        .map(([label, value]) => (
                            <FormControlLabel
                                key={value}
                                value={value}
                                control={<Radio />}
                                label={`${value} - ${label}`}
                            />
                        ))}


                </RadioGroup>
            </FormControl>
        </div>  
    );
};

export default HealthCheckFields;