import { useState } from "react"
import { NonSensitiveDiaryEntry } from "../types";
import { createDiary } from "../services/diaryService";

interface InputProps {
    setDiaries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>> 
    diaries: NonSensitiveDiaryEntry[]
}

const DiaryInputForm = ({setDiaries, diaries}: InputProps) => {
    const [date, setDate] = useState("");
    const [visibility, setVisibility] = useState("");
    const [weather, setWeather] = useState("");
    const [comment, setComment] = useState("");


    const diaryCreation = (event: React.SyntheticEvent) => {
        event.preventDefault()

        const diaryToAdd = {
            date: date,
            visibility: visibility,
            weather: weather,
            comment: comment
        }

        createDiary(diaryToAdd).then(data => {
            setDiaries(diaries.concat(data))
        })
        setDate("")
        setVisibility("")
        setWeather("")
        setComment("")

    }

    return(
        <div>
            <h2>Add new entry</h2>
            <form onSubmit={diaryCreation}>
                <div>
                    date
                   <input
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                   /> 
                </div>
                <div>
                    visibility
                   <input
                        value={visibility}
                        onChange={(event) => setVisibility(event.target.value)} 
                   /> 
                </div>
                <div>
                    weather
                   <input 
                        value={weather}
                        onChange={(event) => setWeather(event.target.value)}
                   /> 
                </div>
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