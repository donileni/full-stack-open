import { useState } from "react"
import { NonSensitiveDiaryEntry, Weather, Visibility } from "../types";
import { createDiary } from "../services/diaryService";
import axios from "axios";
import RadioButtons from "./RadioButtons";

interface InputProps {
    setDiaries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>> 
    diaries: NonSensitiveDiaryEntry[]
}

const DiaryInputForm = ({setDiaries, diaries}: InputProps) => {
    const [date, setDate] = useState("");
    const [visibility, setVisibility] = useState<Visibility | "">("");
    const [weather, setWeather] = useState<Weather | "">("");
    const [comment, setComment] = useState("");
    const [error, setError] = useState("")

    const diaryCreation = (event: React.SyntheticEvent) => {
        event.preventDefault()

        const diaryToAdd = {
            date: date,
            visibility: visibility,
            weather: weather,
            comment: comment
        }

        createDiary(diaryToAdd)
            .then(data => {
                setDiaries(diaries.concat(data));
                })
            .catch(error => {
                if (axios.isAxiosError(error)) {
                    setError(error.response?.data)
                    setTimeout(() => {
                        setError("")
                    }, 5000);
                }
            });
        
        setDate("")
        setComment("")
    }

    return(
        <div>
            <h2>Add new entry</h2>
            <p style={{color: "red"}}>{error}</p>
            <form onSubmit={diaryCreation}>
                <div>
                    date
                   <input
                        type="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                   /> 
                </div>
                <RadioButtons buttons={Object.values(Visibility)} label="visibility" setSelection={setVisibility}/>
                <RadioButtons buttons={Object.values(Weather)} label="weather" setSelection={setWeather}/>
                <div>
                    comment
                   <input
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                   /> 
                </div>
                <button type="submit">add</button>
            </form>
        </div>
    )

}

export default DiaryInputForm