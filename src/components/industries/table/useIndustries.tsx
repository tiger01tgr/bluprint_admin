import { Industry, getIndustries } from '@/functions/dataFetching/industries/Industries';
import React, { useState, useEffect } from 'react'

const useIndustries = () => {

    const [data, setData] = useState<Industry[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getIndustries();
            setData(data);
        }
        fetchData();
    }, [])

    const createIndustry = async (name: string) => {
        await fetch(`${process.env.NEXT_PUBLIC_API}/industries?name=${name}`, {
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

    const editIndustry = async (row: Industry) => {
        await fetch(`${process.env.NEXT_PUBLIC_API}/industries/?id=${row.id}&name=${row.name}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const deleteIndustry = async (id: number) => {
        await fetch(`${process.env.NEXT_PUBLIC_API}/industries/?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }


    return (
        {
            data,
            createIndustry,
            editIndustry,
            deleteIndustry,
        }
    )
}

export default useIndustries