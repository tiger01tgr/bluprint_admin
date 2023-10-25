'use client'
import { SessionResponse, SessionForReview, getAllCompletedPracticeSessions, getCompletedPracticeSession } from '@/functions/dataFetching/feedback/Feedback'
import { useState, useEffect } from 'react'

const useFeedback = (page: number, limit: number) => {

    const [sessions, setSessions] = useState<SessionResponse>()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            const sessions = await getAllCompletedPracticeSessions(page, limit).catch((err) => {
                console.log(err)
            })
            if (sessions != null) setSessions(sessions)
            setLoading(false)
        }
        fetchData()
    }, [page, limit])

    return (
        {
            sessions,
            loading,
        }
    )
}

export default useFeedback