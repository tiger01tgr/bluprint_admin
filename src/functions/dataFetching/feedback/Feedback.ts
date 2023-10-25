import { Pagination } from "../general/Pagination";

export type Session = {
    id: number;
    userId: number;
    questionSetId: number;
    completedAt: Date;
}

export type SessionResponse = {
    data: Session[];
    pagination: Pagination;
}

export const getAllCompletedPracticeSessions = async (page: number, limit: number): Promise<SessionResponse | null> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/sessions/completed?page=${page}&limit=${limit}`);
    if (!res.ok) throw new Error(res.statusText);
    const json = await res.json();
    let parsedData: Session[] = [];
    console.log(json)
    if (json === undefined || json.length === 0) return null;
    json.data.forEach((row: any) => {
        parsedData.push({
            id: row.id,
            userId: row.user_id,
            questionSetId: row.question_set_id,
            completedAt: row.completed_at,
        });
    });
    let pagination: Pagination = {
        currentPage: json.pagination.currentPage,
        limit: json.pagination.limit,
        totalPages: json.pagination.totalPages,
        totalResults: json.pagination.totalResults,
    }
    return {
        data: parsedData,
        pagination: pagination,
    };
}

export type SessionForReview = {
    id: number;
    practiceSessionId: number;
    questionId: number;
    url: string;
    questionText: string;
    timeLimit: number;
} 

export const getCompletedPracticeSession = async (id: number): Promise<SessionForReview[] | null> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/sessions/completed/${id}`);
    if (!res.ok) throw new Error(res.statusText);
    const json = await res.json();
    let parsedData: SessionForReview[] = [];
    console.log(json)
    if (json === undefined || json.length === 0) return null;
    json.forEach((row: any) => {
        parsedData.push({
            id: row.id,
            practiceSessionId: row.practice_session_id,
            questionId: row.question_id,
            url: row.url,
            questionText: row.question_text,
            timeLimit: row.time_limit
        });
    });
    return parsedData;
}

export const postFeedbackByIds = async (id: number, responsesArray: string[], feedbackArray: string[]) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/feedback/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            submission_ids: responsesArray,
            feedback: feedbackArray
        }),
    })
    if (!res.ok) {
        console.log('oops')
    }
}