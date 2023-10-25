'use client'
import { SessionForReview, getCompletedPracticeSession, postFeedbackByIds } from '@/functions/dataFetching/feedback/Feedback'
import { useState, useEffect } from 'react'



const useFeedbackEntry = (id: number) => {

    const [ session, setSession ] = useState<SessionForReview[]>()
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(false)
    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            const session = await getCompletedPracticeSession(id).catch((err) => {
                console.log(err)
                setError(true)
                return undefined
            })
            if (session !== undefined && session !== null) setSession(session)
            setLoading(false)
        }
        fetchData()
    }, [id])

    const postFeedback = async (responsesArray: string[], feedbackArray: string[]) => {
        if (!id || responsesArray.length === 0 || feedbackArray.length === 0) {
            return
        }
        await postFeedbackByIds(id, responsesArray, feedbackArray)
    }

    return {
        session,
        loading,
        error,
        postFeedback
    }
}

export default useFeedbackEntry