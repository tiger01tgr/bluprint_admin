import React, { useEffect, useState } from "react"
import { Job, createJobCall, getJobs } from "@/functions/dataFetching/jobs/Jobs"

const useJobs = () => {
    const [jobs, setJobs] = useState<Job[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getJobs()
            setJobs(data)
        }
        fetchData()
    }, [])

    const createJob = async (name: string, questionSetId: number, employerId: number, roleId: number, jobTypeId: number, description: string) => {
        const res = createJobCall(name, questionSetId, employerId, roleId, jobTypeId, description)
    }

    return (
        {
            jobs,
            createJob
        }
    )
}

export default useJobs