'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import useFeedback from './useFeedback'
import { Session } from '@/functions/dataFetching/feedback/Feedback'
import Pagination from '@/components/general/Pagination/Pagination'
/*
export type Feedback = {
    id: number;
    userId: number;
    questionSetId: number;
    practiceSessionId: number;
    createdAt: Date;
    seen: boolean;
}
*/

const FeedbackTable = () => {

    const searchParams = useSearchParams()
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string) : 20
    const { sessions, loading } = useFeedback(page, limit)

    const changeCurrentPage = (page: number) => {
        window.location.href = `/dashboard/feedback?page=${page}&limit=${limit}`
    }

    if (loading || sessions == null) {
        return (
            <div>loading...</div>
        )
    }

    return (
        <div className="py-4 w-full">
            <div className="flex justify-evenly mb-4">
            <h2 className="text-2xl font-semibold">Feedback</h2>
            </div>
            <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200 text-left">
                <tr>
                <th className="p-2 sticky top-0 bg-white border-b border-gray-300">
                    Practice Session Id
                </th>
                <th className="p-2 sticky top-0 bg-white border-b border-gray-300">
                    User Id
                </th>
                <th className="p-2 sticky top-0 bg-white border-b border-gray-300">
                    Question Set Id
                </th>
                <th className="p-2 sticky top-0 bg-white border-b border-gray-300">
                    Submitted Time
                </th>
                </tr>
            </thead>
            <tbody>
                {sessions?.data.map((row: Session) => (
                <tr key={row.id}>
                    <td className="p-2 border-b border-gray-300">{row.id}</td>
                    <td className="p-2 border-b border-gray-300">{row.userId}</td>
                    <td className="p-2 border-b border-gray-300">{row.questionSetId}</td>
                    <td className="p-2 border-b border-gray-300">{Math.floor((Date.now() - new Date(row.completedAt).getTime())/ (1000 * 60 * 60))} hours ago</td>
                    <td>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                            <a href={`/dashboard/feedback/${row.id}`}>Review</a>
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
            <Pagination currentPage={sessions.pagination.currentPage} totalPages={sessions.pagination.totalPages} totalResults={sessions.pagination.totalResults} changeCurrentPage={changeCurrentPage}/>
        </div>
    );
}

export default FeedbackTable