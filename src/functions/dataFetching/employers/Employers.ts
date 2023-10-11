
// /api/employers

export type Employer = {
    id: number;
    name: string;
    logo: string
    industry: string;
    industryId: number;
    deleted: boolean;
}

export const getEmployers = async (): Promise<Employer[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/employers/?all=true`)
    const data = await res.json();
    let parsedData: Employer[] = [];
    if (!data) return parsedData;
    data.forEach((row: any) => {
        console.log(row);
        parsedData.push({
            id: row.ID,
            name: row.Name,
            logo: row.Logo,
            industry: row.Industry,
            industryId: row.IndustryID,
            deleted: row.Deleted,
        });
    });
    return parsedData;
};

export const createEmployerCall = async (name: string, industryId: string, file: File) => {
    const formData = new FormData();
    formData.append('logo', file);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/employers/?name=${name}&industryId=${industryId}`, {
        method: 'POST',
        body: formData,
    })
    if (res.status === 201) {
        return true;
    }
    return false;
}

export const deleteEmployerCall = async (id: string) => {
    fetch(`${process.env.NEXT_PUBLIC_API}/employers/?id=${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const editEmployerCall = async (id: string, name: string, industryId: number, file: File) => {
    fetch(`${process.env.NEXT_PUBLIC_API}/employers/?id=${id}&name=${name}&industryId=${industryId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            industryId,
        }),
    })
    .then((res) => res.json())
}

