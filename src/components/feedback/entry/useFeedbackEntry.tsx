'use client'
import { SessionForReview, getCompletedPracticeSession } from '@/functions/dataFetching/feedback/Feedback'
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

    const createFeedbackEntry = async (id: number, feedback: string) => {
        // implement here
    }

    return {
        session,
        loading,
        error,
        createFeedbackEntry
    }
}

export default useFeedbackEntry