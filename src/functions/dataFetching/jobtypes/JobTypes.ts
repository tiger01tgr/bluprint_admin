export type JobType = {
    id: number;
    name: string;
}

export const getJobTypes = async (): Promise<JobType[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/jobs/types`);
    const data = await res.json()
    let parsedData: JobType[] = []
    if (data === undefined || data.length === 0) return parsedData;
    data.forEach((row: any) => {
        parsedData.push({
            id: row.id,
            name: row.name,
        })
    })
    return parsedData
}