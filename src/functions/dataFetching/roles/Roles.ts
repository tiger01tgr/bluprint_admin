
// /api/employers

export type Role = {
    id: number;
    name: string;
}

export const getRoles = async (): Promise<Role[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/roles`)
    const data = await res.json();
    let parsedData: Role[] = [];
    if (!data) return parsedData;
    data.forEach((row: any) => {
        parsedData.push({
            id: row.ID,
            name: row.Name,
        });
    });
    return parsedData;
};

export const createARole = async (name: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/roles/?name=${name}`, {
        method: 'POST',
    })
    if (res.status === 201) {
        return true;
    }
    return false;
}

export const deleteARole = async (id: number) => {
    fetch(`${process.env.NEXT_PUBLIC_API}/roles/?id=${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const editARole = async (id: number, name: string) => {
    const formData = new FormData();
    fetch(`${process.env.NEXT_PUBLIC_API}/roles/?id=${id}&name=${name}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((res) => res.json())
}

