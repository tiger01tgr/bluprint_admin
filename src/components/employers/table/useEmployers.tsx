import { Employer, getEmployers, createEmployerCall, deleteEmployerCall } from '@/functions/dataFetching/employers/Employers';
import { Industry, getIndustries } from '@/functions/dataFetching/industries/Industries';
import React, { useState, useEffect } from 'react'

const useEmployers = () => {

  const [data, setData] = useState<Employer[]>([]);
  const [industry, setIndustry] = useState<Industry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [data, industry] = await Promise.all([getEmployers(), getIndustries()])
      setData(data);
      setIndustry(industry);
      console.log(data)
      console.log(industry)
    };
    fetchData();
  }, [])

  const createEmployer = async (name: string, industryId: string, logo: File) => {
    const res = createEmployerCall(name, industryId, logo);
  }

  const deleteEmployer = async (id: string) => {
    const res = await deleteEmployerCall(id);
  }
  return (
    {
      data,
      industry,
      createEmployer,
      deleteEmployer,
    }
  )
}

export default useEmployers