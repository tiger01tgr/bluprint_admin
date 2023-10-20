'use client'
import React, { useState, useEffect } from 'react'
import useJobs from './useJobs'
import SelectDropdown from '@/components/general/Select/Select'
import useEmployers from '@/components/employers/table/useEmployers'
import useRoles from '@/components/roles/table/useRoles'
import { Job } from '@/functions/dataFetching/jobs/Jobs'
import usePractice from '../practice/table/usePractice'
import useJobTypes from '../jobtypes/useJobTypes'


const JobsTable = () => {
    const { createJob } = useJobs()
    const { employers } = useEmployers()
    const { questionSets } = usePractice()
    const { roles } = useRoles()
    const { jobTypes } = useJobTypes()
    const [showEditModal, setShowEditModal] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [createJobName, setCreateJobName] = useState('')
    const [createQuestionSetId, setCreateQuestionSetId] = useState<number>()
    const [createEmployerId, setCreateEmployerId] = useState<number>()
    const [createRoleId, setCreateRoleId] = useState<number>()
    const [createJobTypeId, setCreateJobTypeId] = useState<number>()
    const [createDescription, setCreateDescription] = useState('')
    const [selectedRow, setSelectedRow] = useState<Job>()

    const [data, setData] = useState<Job[]>([])

    const openEditModal = (row: Job) => {
        setSelectedRow(row)
        setShowEditModal(true)
    }

    const closeEditModal = () => {
        setShowEditModal(false)
        setSelectedRow(undefined)
    }

    const openCreateModal = () => {
        setShowCreateModal(true)
    }

    const closeCreateModal = () => {
        setShowCreateModal(false)
    }

    const createPracticeSetModal = () => {
        console.log(createJobName)
        console.log(createQuestionSetId)
        console.log(createEmployerId)
        console.log(createRoleId)
        console.log(createJobTypeId)
        console.log(createDescription)
        if (createJobName && createQuestionSetId && createEmployerId && createRoleId && createJobTypeId && createDescription) {
            createJob(createJobName, createQuestionSetId, createEmployerId, createRoleId, createJobTypeId, createDescription)
            setShowCreateModal(false)
        }

    }

    return (
        <div className="py-4 w-full">
            <div className="flex justify-evenly mb-4">
                <h2 className="text-2xl font-semibold">Jobs Table</h2>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={openCreateModal}
                >
                    Create a Job
                </button>
            </div>
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200 text-left">
                    <tr>
                        <th className="p-2 sticky top-0 bg-white border-b border-gray-300">
                            Name
                        </th>
                        <th className="p-2 sticky top-0 bg-white border-b border-gray-300">
                            Question Set
                        </th>
                        <th className="p-2 sticky top-0 bg-white border-b border-gray-300">
                            Employer
                        </th>
                        <th className="p-2 sticky top-0 bg-white border-b border-gray-300">
                            Role
                        </th>
                        <th className="p-2 sticky top-0 bg-white border-b border-gray-300">
                            Job Type
                        </th>
                        <th className="p-2 sticky top-0 bg-white border-b border-gray-300">
                            Description
                        </th>
                        <th className="p-2 sticky top-0 bg-white border-b border-gray-300">
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id}>
                            <td className="p-2 border-b border-gray-300">{row.name}</td>
                            <td className="p-2 border-b border-gray-300">
                                {row.employer}
                            </td>
                            <td className="p-2 border-b border-gray-300">{row.role}</td>
                            <td className="p-2 border-b border-gray-300">{row.jobType}</td>
                            <td className="p-2 border-b border-gray-300">{row.industry}</td>
                            <td className="p-2 border-b border-gray-300">
                                <button
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                    onClick={() => openEditModal(row)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* {showEditModal && selectedRow && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded shadow-md">
                <h2 className="text-2xl font-semibold">Edit Employer</h2>
                <p>Employer Name:
                    <input 
                        className="w-5/6 px-2" 
                        value={selectedRow.name}
                        onChange={(e) => setSelectedRow({id: selectedRow.id, name: e.target.value, logo: selectedRow.logo, industry: selectedRow.industry, industryId: selectedRow.industryId, deleted: selectedRow.deleted})}
                    ></input>
                </p>
                <div className="flex flex-row justify-evenly">
                        <div>
                            <label>Select a new Logo</label>
                            <input id="file" type="file" onChange={handleLogoSelected}/>
                        </div>
                        <div>
                            <SelectDropdown title="Industry" placeholder="select an industry" options={industry} setter={setCreateIndustry}/>
                        </div>
                    </div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={closeEditModal}
                >
                    Close
                </button>
                </div>
            </div>
            )} */}

            {showCreateModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-md flex justify-center flex-col gap-4 w-1/2">
                        <h2 className="text-2xl font-semibold">Create a Practice Set</h2>
                        <div className="flex flex-row w-full">
                            <p className="p-1">Name: </p>
                            <input
                                className="w-5/6 px-2"
                                value={createJobName}
                                onChange={(e) => setCreateJobName(e.target.value)}
                            ></input>
                        </div>
                        <div className="flex flex-row justify-evenly">
                            <div>
                                <SelectDropdown title="Question Set" placeholder="select a question set" options={questionSets} setter={setCreateQuestionSetId} />
                            </div>
                            <div>
                                <SelectDropdown title="Employer" placeholder="select an employer" options={employers} setter={setCreateEmployerId} />
                            </div>
                            <div>
                                <SelectDropdown title="Roles" placeholder="select a role" options={roles} setter={setCreateRoleId} />
                            </div>
                            <div>
                                <SelectDropdown title="Job Types" placeholder="select a job type" options={jobTypes} setter={setCreateJobTypeId} />
                            </div>
                        </div>
                        <div>
                            <p>Description: </p>
                            <input value={createDescription} onChange={(e) => setCreateDescription(e.target.value)}></input>
                        </div>
                        <div className="w-full flex flex-row">
                            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={createPracticeSetModal}>
                                Create
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={closeCreateModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobsTable
