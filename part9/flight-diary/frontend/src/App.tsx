import { useEffect, useState } from 'react';
import { NonSensitiveDiaryEntry } from "./types";
import Diaries from './components/Diaries';
import { getAllDiaries } from './services/diaryService';
import DiaryInputForm from './components/DiaryInputForm';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then(data => setDiaries(data))
  },[])

  return (
    <div>
      <DiaryInputForm setDiaries={setDiaries} diaries={diaries} />
      <Diaries diaries={diaries}/>
    </div>
  )
}

export default App