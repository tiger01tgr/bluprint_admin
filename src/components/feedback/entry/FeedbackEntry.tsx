'use client'
import React, { useState, useEffect } from 'react'
import useFeedbackEntry from './useFeedbackEntry'

interface Props {
    id: number
}

const FeedbackEntry: React.FC<Props> = ({ id }) => {

    const { session, loading, error, postFeedback } = useFeedbackEntry(id)
    const [feedbackArray, setFeedbackArray] = useState<string[]>([])
    const [responsesArray, setResponsesArray] = useState<string[]>([])

    useEffect(() => {
        if (session) {
            const initialArray = Array.from({ length: session.length }, () => "")
            setFeedbackArray(initialArray)
            let responsesArray: string[] = []
            session.forEach((response) => {
                responsesArray.push((response.id).toString())
            })
            setResponsesArray(responsesArray)
        }
    }, [session])

    const handleFeedbackChange = (index: number, value: string) => {
        const updatedFeedbackArray = [...feedbackArray]
        updatedFeedbackArray[index] = value
        setFeedbackArray(updatedFeedbackArray)
    }

    const handleSubmit = async () => {
        if (feedbackArray.some((feedback) => feedback === "")) {
            return
        } else {
            await postFeedback(responsesArray, feedbackArray)
            location.href = '/dashboard/feedback'
        }
    }


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
                    session.map((row, index) => (
                        <div key={index} className="flex flex-col items-center" style={{ marginBottom: "30px" }}>
                            <div className="flex items-center justify-center mb-2">
                                {row.questionText}
                            </div>
                            <div className="flex items-center justify-center mb-2">
                                Time Limit: {row.timeLimit}
                            </div>
                            <div className="flex items-center justify-center mb-2">
                                <iframe title={`video-${index}`} src={row.url} width="640" height="480"></iframe>
                            </div>
                            <textarea
                                style={{ width: "800px", height: "200px" }}
                                className="p-2 border border-gray-300 rounded"
                                onChange={(e) => handleFeedbackChange(index, e.target.value)}
                                placeholder="Enter your feedback here"
                            />
                        </div>
                    ))
                }
            </div>
            <div className="flex justify-evenly mb-4">
                <button
                    className="text-2xl font-semibold bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default FeedbackEntry