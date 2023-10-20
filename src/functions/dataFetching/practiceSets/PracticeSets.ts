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
    const queryParams = `name=${name}&employerId=${employerId}&roleId=${roleId}&type=${interviewType}`;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/practice/?${queryParams}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questions: questionList }),
    });
    console.log(res)
}

interface GetPracticeSetsProps {
    limit: number;
}

interface Question {
    id: string;
    text: string;
    timeLimit: string;
}

interface QuestionSetBase {
    id: number;
    name: string;
    employerName: string;
    employerId: number;
    roleName: string;
    roleId: number;
    interviewType: string;
}

interface QuestionSet extends QuestionSetBase {
    logo: string;
    industryName: string;
    industryId: number;
}

const parsePracticeSet = (practiceSet: any): QuestionSet => {
    return {
        id: practiceSet.id,
        name: practiceSet.name,
        logo: practiceSet.logo,
        employerName: practiceSet.employer,
        employerId: practiceSet.employerId,
        roleName: practiceSet.role,
        roleId: practiceSet.roleId,
        industryName: practiceSet.industry,
        industryId: practiceSet.industryId,
        interviewType: practiceSet.interviewType,
    }
}


export const getPracticeSets = async (props: GetPracticeSetsProps): Promise<any> => {
    const response = await fetch(process.env.NEXT_PUBLIC_API + `/practice/?limit=${props.limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) throw new Error('Error occurred')

    const json = await response.json()
    const practiceSets = [] as QuestionSet[]
    json.data.map((practiceSet: any) => {
        practiceSets.push(parsePracticeSet(practiceSet))
    })
    return {practiceSets};
}