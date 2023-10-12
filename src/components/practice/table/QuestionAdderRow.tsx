import React, { useState } from 'react'

interface Props {
    setter: (value: any) => void
}

const QuestionAdderRow: React.FC<Props> = ({setter}) => {

    const [ text, setText ] = useState<string>("");
    const [ timeLimit, setTimeLimit ] = useState<number>();
    const [ added, setAdded ] = useState<boolean>(false);

  return (
    <div className='p-5'>
        <input type="text" placeholder="Question" onChange={(e) => setText(e.target.value)}/>
        <input type="text" placeholder="Timelimit" onChange={(e) => setTimeLimit(Number(e.target.value))}/>
        {!added && <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={() => {
            setter({text, timeLimit})
            setAdded(true)
            }}>Add</button>}
    </div>
  )
}

export default QuestionAdderRow