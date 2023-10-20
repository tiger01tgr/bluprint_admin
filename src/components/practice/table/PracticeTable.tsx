'use client'
import React, { useState, useEffect } from 'react';
import usePractice from './usePractice';
import SelectDropdown from '@/components/general/Select/Select';
import { PracticeQuestion, PracticeSet } from '@/functions/dataFetching/practiceSets/PracticeSets';
import useEmployers from '@/components/employers/table/useEmployers';
import useRoles from '@/components/roles/table/useRoles';
import PracticeQuestionsCreator from './PracticeQuestionsCreator';


const PracticeTable = () => {
    const { questionSets, createPracticeSet } = usePractice();
    const { employers } = useEmployers();
    const { roles } = useRoles();

    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [createPracticeSetName, setCreatePracticeSetName] = useState('');
    const [createEmployerId, setCreateEmployerId] = useState(null);
    const [createRoleId, setCreateRoleId] = useState();
    const [createInterviewType, setCreateInterviewType] = useState('');
    const [createQuestionsList, setCreateQuestionsList] = useState<PracticeQuestion[]>([]);
    const [selectedRow, setSelectedRow] = useState<PracticeSet>();

    const [data, setData] = useState<PracticeSet[]>([]);

    const openEditModal = (row: PracticeSet) => {
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

    const createPracticeSetModal = () => {
        console.log(createPracticeSetName)
        console.log(createEmployerId)
        console.log(createRoleId)
        console.log(createInterviewType)
        console.log(createQuestionsList)

        if (createPracticeSetName && createEmployerId && createRoleId && createInterviewType){
            createPracticeSet(createPracticeSetName, createEmployerId, createRoleId, createInterviewType, createQuestionsList)
            setShowCreateModal(false);
        }

    }

    return (
        <div className="py-4 w-full">
            <div className="flex justify-evenly mb-4">
            <h2 className="text-2xl font-semibold">Practice Sets Table</h2>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={openCreateModal}
            >
                Create a Practice Set
            </button>
            </div>
            <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200 text-left">
                <tr>
                <th className="p-2 sticky top-0 bg-white border-b border-gray-300">
                    Name
                </th>
                <th className="p-2 sticky top-0 bg-white border-b border-gray-300">
                    Employer
                </th>
                <th className="p-2 sticky top-0 bg-white border-b border-gray-300">
                    Role
                </th>
                <th className="p-2 sticky top-0 bg-white border-b border-gray-300">
                    Interview Type
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
                        {row.employerName}
                    </td>
                    <td className="p-2 border-b border-gray-300">{row.roleName}</td>
                    <td className="p-2 border-b border-gray-300">{row.interviewType}</td>
                    <td className="p-2 border-b border-gray-300">
                    <button
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        onClick={() => {}}
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
                            value={createPracticeSetName}
                            onChange={(e) => setCreatePracticeSetName(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <p>Interview Type: </p>
                        <input value={createInterviewType} onChange={(e) => setCreateInterviewType(e.target.value)}></input>
                    </div>
                    <div className="flex flex-row justify-evenly">
                        <div>
                            <SelectDropdown title="Employer" placeholder="select an employer" options={employers} setter={setCreateEmployerId}/>
                        </div>
                        <div>
                            <SelectDropdown title="Roles" placeholder="select a role" options={roles} setter={setCreateRoleId}/>
                        </div>
                    </div>
                    <div>
                        <PracticeQuestionsCreator setter={setCreateQuestionsList}/>
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

export default PracticeTable;
