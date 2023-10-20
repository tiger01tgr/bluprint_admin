'use client'
import React, { useState, useEffect } from 'react'
import useJobTypes from './useJobTypes'
import { JobType } from '@/functions/dataFetching/jobtypes/JobTypes'

const IndustryTable = () => {
    const { jobTypes, createJobType } = useJobTypes()
    const [showEditModal, setShowEditModal] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [createJobTypeName, setCreateJobTypeName] = useState('')
    const [selectedRow, setSelectedRow] = useState<JobType>()

    const openEditModal = (row: JobType) => {
        setSelectedRow(row)
        setShowEditModal(true)
    }

    const closeEditModal = () => {
        setShowEditModal(false)
        setSelectedRow(undefined)
    }

    const submitEditIndustryModal = () => {
        if (selectedRow) {
            // editIndustry(selectedRow);
        }
        setShowEditModal(false);
    }

    const openCreateModal = () => {
        setShowCreateModal(true)
    }

    const closeCreateModal = () => {
        setShowCreateModal(false)
    }

    const createIndustryModal = () => {
        createJobType(createJobTypeName)
        setShowCreateModal(false)
    }

    return (
        <div className="py-4 w-full">
            <div className="flex justify-evenly mb-4">
            <h2 className="text-2xl font-semibold">Job Type Table</h2>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={openCreateModal}
            >
                Create a Job Type
            </button>
            </div>
            <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200 text-left">
                <tr>
                <th className="p-2 sticky top-0 bg-white border-b border-gray-300">
                    Job Type
                </th>
                <th className="p-2 sticky top-0 bg-white border-b border-gray-300">
                    Delete
                </th>
                <th className="p-2 sticky top-0 bg-white border-b border-gray-300">
                    Edit
                </th>
                </tr>
            </thead>
            <tbody>
                {jobTypes.map((row) => (
                <tr key={row.id}>
                    <td className="p-2 border-b border-gray-300">{row.name}</td>
                    <td className="p-2 border-b border-gray-300">
                    <button
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        // onClick={() => deleteIndustry(row.id)}
                    >
                        Delete
                    </button>
                    </td>
                    <td className="p-2 border-b border-gray-300">
                    <button
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        // onClick={() => openEditModal(row)}
                    >
                        Edit
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>

            {/* Edit Modal */}
            {showEditModal && selectedRow && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded shadow-md">
                {/* Edit form can go here */}
                <h2 className="text-2xl font-semibold">Edit Industry</h2>
                <div className="flex flex-row w-full">
                        <p className="p-1">Industry Name: </p>
                        <input 
                            className="w-5/6 px-2" 
                            value={selectedRow.name}
                            onChange={(e) => setSelectedRow({id: selectedRow.id, name: e.target.value})}
                            ></input>
                    </div>
                    <div className="w-full flex flex-row">
                        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={submitEditIndustryModal}>
                            Submit
                        </button>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={closeEditModal}
                            >
                        Close
                        </button>
                    </div>
                </div>
            </div>
            )}

            {showCreateModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded shadow-md flex justify-center flex-col gap-4 w-1/2">
                    {/* Create form can go here */}
                    <h2 className="text-2xl font-semibold">Create a Job Type</h2>
                    <div className="flex flex-row w-full">
                        <p className="p-1">Name: </p>
                        <input 
                            className="w-5/6 px-2" 
                            value={createJobTypeName}
                            onChange={(e) => setCreateJobTypeName(e.target.value)}
                            />
                    </div>
                    <div className="w-full flex flex-row">
                        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={createIndustryModal}>
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

export default IndustryTable;
