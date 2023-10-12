import { PracticeQuestion } from '@/functions/dataFetching/practiceSets/PracticeSets'
import React, { useState } from 'react'
import QuestionAdderRow from './QuestionAdderRow';

interface Props {
    setter: (value: any) => void
}

const PracticeQuestionsCreator: React.FC<Props> = ({setter}) => {

    const [ data, setData ] = useState<PracticeQuestion[]>([]);
    const [ questionUI, setQuestionUI ] = useState<JSX.Element[]>([]);

    const submitQuestion = (newData: PracticeQuestion) => {
        setData([...data, newData])
    }

    const addQuestion = () => {
        setQuestionUI([...questionUI, <QuestionAdderRow setter={submitQuestion}/>])
    }


  return (
    <div>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={() => addQuestion()}>Add Question</button>
        <div className='gap-2'>
            {questionUI}
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => setter(data)}>Finish adding questions</button>
    </div>
  )
}

export default PracticeQuestionsCreator