import React, { useEffect, useState } from 'react'
import { PracticeQuestion, getPracticeSets } from '@/functions/dataFetching/practiceSets/PracticeSets'
import { createPracticeSetCall } from '@/functions/dataFetching/practiceSets/PracticeSets'

const usePractice = () => {
  const [questionSets, setQuestionSets] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const questions = await getPracticeSets({limit: 1000})
      setQuestionSets(questions.practiceSets)
    }
    fetchData()
  }, [])

  const createPracticeSet = async (name: string, employerId: number, roleId: number, interviewType: string, questionList: PracticeQuestion[]) => {
    const res = createPracticeSetCall(name, employerId, roleId, interviewType, questionList)
  }

  return (
    {
      questionSets,
      createPracticeSet
    }
  )
}

export default usePractice