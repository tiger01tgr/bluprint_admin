export type Industry = {
    id: number;
    name: string;
}

export const getIndustries = async (): Promise<Industry[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/industries`);
    const data = await res.json();
    let parsedData: Industry[] = [];
    console.log(data)
    if (data === undefined || data.length === 0) return parsedData;
    data.forEach((row: any) => {
        parsedData.push({
            id: row.ID,
            name: row.Name,
        });
    });
    return parsedData;
}