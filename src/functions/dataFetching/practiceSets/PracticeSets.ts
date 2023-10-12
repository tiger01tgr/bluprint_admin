export type PracticeSet = {
    id: number;
    name: string;
    employerId: number;
    employerName: string;
    roleId: number;
    roleName: string;
    interviewType: string
    deleted: boolean;
}

export type PracticeQuestion = {
    id: number;
    text: string;
    timelimit: number;
}

export const createPracticeSetCall = async (name: string, employerId: number, roleId: number, interviewType: string, questionList: PracticeQuestion[]) => {
    const queryParams = `name=${name}&employerId=${employerId}&roleId=${roleId}&interviewType=${interviewType}`;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/practice/?${queryParams}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questions: questionList }),
    });
    console.log(res)
}