import { JobType, getJobTypes } from '@/functions/dataFetching/jobtypes/JobTypes'
import React, { useState, useEffect } from 'react'

const useJobTypes = () => {

    const [jobTypes, setJobTypes] = useState<JobType[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getJobTypes()
            setJobTypes(data)
        }
        fetchData()
    }, [])

    const createJobType = async (name: string) => {
        await fetch(`${process.env.NEXT_PUBLIC_API}/jobs/types?name=${name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => {
            if (res.status == 201) {
                return true;
            }
            return false;
        });
    }

    return (
        {
            jobTypes,
            createJobType,
        }
    )
}

export default useJobTypes