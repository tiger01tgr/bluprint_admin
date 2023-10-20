export type Job = {
    id: number;
    name: string;
    employer: string;
    employerId: number;
    role: string;
    roleId: number;
    jobType: string;
    jobTypeId: number;
    industry: string;
    industryId: number;
    description: string;
    questionSetId: number;
    logo: string;
}

export const createJobCall = async (name: string, questionSetId: number, employerId: number, roleId: number, jobTypeId: number, description: string) => {
    const queryParams = `name=${name}&employerId=${employerId}&roleId=${roleId}&jobTypeId=${jobTypeId}&description=${description}&questionSetId=${questionSetId}`
    console.log('hello')

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/jobs/?${queryParams}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    console.log(res)
}

export const getJobs = async (): Promise<Job[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/jobs`);
    const data = await res.json()
    let parsedData: Job[] = []
    if (data === undefined || data.length === 0) return parsedData;
    data.forEach((row: any) => {
        parsedData.push({
            id: row.id,
            name: row.name,
            employer: row.employer,
            employerId: row.employer_id,
            role: row.role,
            roleId: row.role_id,
            jobType: row.job_type,
            jobTypeId: row.job_type_id,
            industry: row.industry,
            industryId: row.industry_id,
            description: row.description,
            questionSetId: row.question_set_id,
            logo: row.logo
        })
    })
    return parsedData
}