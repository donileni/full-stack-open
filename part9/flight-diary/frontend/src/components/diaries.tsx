import { NonSensitiveDiaryEntry } from "../../../backend/src/types";
import Diary from "./diary";

interface DiariesProps {
    diaries: NonSensitiveDiaryEntry[];
}

const Diaries = (props: DiariesProps) => {
    return(
        <div>
            <h2>Diary entries</h2>
            {props.diaries.map(diary => (
                <Diary key={diary.date} diary={diary}/>
            ))}
        </div>
    )
}

export default Diaries