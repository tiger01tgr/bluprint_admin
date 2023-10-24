'use client'
import React from 'react'
import useFeedbackEntry from './useFeedbackEntry'

interface Props {
    id: number
}

const FeedbackEntry: React.FC<Props> = ({id}) => {

    const { session, loading, error, createFeedbackEntry } = useFeedbackEntry(id)

    if (error) {
        return (
            <div>error</div>
        )
    }

    if (loading || !session) { 
        return (
            <div>loading</div>
        )
    }

    return (
        <div className="py-4 w-full">
            <div className="flex justify-evenly mb-4">
                <h2 className="text-2xl font-semibold">Write Feedback</h2>
            </div>
            <div className="flex-1 align-middle justify-center">
            {
                session.map((row) => (
                    <div className="flex align-middle justify-center">
                        <iframe src={row.url} width="640" height="480"></iframe>
                    </div>
                ))

            }
            </div>
        </div>
    )
}

export default FeedbackEntry