'use client'
import React, { useState, useEffect } from 'react';
import useEmployers from './useEmployers';
import { Employer } from '@/functions/dataFetching/employers/Employers';
import SelectDropdown from '@/components/general/Select/Select';

const EmployerTable = () => {
    const { data, industry, createEmployer, deleteEmployer, editEmployer } = useEmployers();

    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [createEmployerName, setCreateEmployerName] = useState('');
    const [createIndustry, setCreateIndustry] = useState('');
    const [selectedRow, setSelectedRow] = useState<Employer>();
    const [uploadedLogo, setUploadedLogo] = useState<File>();

    console.log(data)

    const openEditModal = (row: Employer) => {
        setSelectedRow(row);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setSelectedRow(undefined);
    };

    const openCreateModal = () => {
        setShowCreateModal(true);
    };

    const closeCreateModal = () => {
        setShowCreateModal(false);
    };

    const createEmployerModal = () => {
        if (uploadedLogo) {
            createEmployer(createEmployerName, createIndustry, uploadedLogo)
        }
        else {
            console.log("logo not found")
        }
        setShowCreateModal(false);
    }

    const handleLogoSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file = Object(e.currentTarget.files)[0];
        setUploadedLogo(file);
    }

    return (
        <div className="py-4 w-full">
            <div className="flex justify-evenly mb-4">
            <h2 className="text-2xl font-semibold">Employer Table</h2>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={openCreateModal}
            >
                Create an Employer
            </button>
            </div>
            <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200 text-left">
                <tr>
                <th className="p-2 sticky top-0 bg-white border-b border-gray-300">
                    Employer Name
                </th>
                <th className="p-2 sticky top-0 bg-white border-b border-gray-300">
                    Logo
                </th>
                <th className="p-2 sticky top-0 bg-white border-b border-gray-300">
                    Industry
                </th>
                <th className="p-2 sticky top-0 bg-white border-b border-gray-300">
                    Status
                </th>
                <th className="p-2 sticky top-0 bg-white border-b border-gray-300">
                    Edit
                </th>
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                <tr key={row.id}>
                    <td className="p-2 border-b border-gray-300">{row.name}</td>
                    <td className="p-2 border-b border-gray-300">
                        <img src={row.logo} alt="logo" className="h-10 w-10"/>
                    </td>
                    <td className="p-2 border-b border-gray-300">{row.industry}</td>
                    <td className="p-2 border-b border-gray-300">
                    <button
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        onClick={() => deleteEmployer(row.id.toString())}
                    >
                        {row.deleted === true ? "Deleted already/not implemented" : "Delete"}
                    </button>
                    </td>
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

            {/* Edit Modal */}
            {showEditModal && selectedRow && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded shadow-md">
                {/* Edit form can go here */}
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
            )}

            {showCreateModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded shadow-md flex justify-center flex-col gap-4 w-1/2">
                    <h2 className="text-2xl font-semibold">Create an Employer</h2>
                    <div className="flex flex-row w-full">
                        <p className="p-1">Employer Name: </p>
                        <input 
                            className="w-5/6 px-2" 
                            value={createEmployerName}
                            onChange={(e) => setCreateEmployerName(e.target.value)}
                        ></input>
                    </div>
                    <div className="flex flex-row justify-evenly">
                        <div>
                            <label>Logo</label>
                            <input id="file" type="file" onChange={handleLogoSelected}/>
                        </div>
                        <div>
                            <SelectDropdown title="Industry" placeholder="select an industry" options={industry} setter={setCreateIndustry}/>
                        </div>
                    </div>
                    <div className="w-full flex flex-row">
                        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={createEmployerModal}>
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

export default EmployerTable;
