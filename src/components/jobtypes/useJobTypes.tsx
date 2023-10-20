import { JobType, getJobTypes } from '@/functions/dataFetching/jobtypes/JobTypes'
import React, { useState, useEffect } from 'react'

const useJobTypes = () => {

    const [data, setData] = useState<JobType[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getJobTypes()
            setData(data)
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
            data,
            createJobType,
        }
    )
}

export default useJobTypes