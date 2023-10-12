import { Role, getRoles, createARole, editARole, deleteARole } from '@/functions/dataFetching/roles/Roles';
import React, { useState, useEffect } from 'react'

const useRoles = () => {

    const [data, setData] = useState<Role[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRoles();
            setData(data);
        }
        fetchData();
    }, [])

    const createRole = async (name: string) => {
        createARole(name)
    }

    const editRole = async (row: Role) => {
        editARole(row.id, row.name)
    }

    const deleteRole = async (id: number) => {
        deleteARole(id)
    }


    return (
        {
            data,
            createRole,
            editRole,
            deleteRole,
        }
    )
}

export default useRoles