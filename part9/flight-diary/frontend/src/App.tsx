import { useEffect, useState } from 'react';
import axios from 'axios';
import { NonSensitiveDiaryEntry } from "../../backend/src/types";
import Diaries from './components/diaries';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    axios
    .get<NonSensitiveDiaryEntry[]>("http://localhost:3000/api/diaries")
    .then(response => setDiaries(response.data))
  },[])

  return (
    <div>
      <Diaries diaries={diaries}/>
    </div>
  )
}

export default App