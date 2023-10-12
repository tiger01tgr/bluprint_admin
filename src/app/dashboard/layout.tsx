import React from 'react'

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex h-screen bg-gray-200">
        <aside className="w-64 bg-blue-600 text-white p-4">
            <h2 className="text-2xl font-semibold mb-4">Bluprint Admin</h2>
            <ul className="space-y-2">
                <li>
                    <a href="/dashboard" className="block hover:bg-blue-700 px-4 py-2 rounded transition duration-300">Dashboard</a>
                </li>
                <li>
                    <a href="/dashboard/users" className="block hover:bg-blue-700 px-4 py-2 rounded transition duration-300">Users</a>
                </li>
                <li>
                    <a href="/dashboard/practice" className="block hover:bg-blue-700 px-4 py-2 rounded transition duration-300">Interview Questions</a>
                </li>
                <li>
                    <a href="/dashboard/employers" className="block hover:bg-blue-700 px-4 py-2 rounded transition duration-300">Employers</a>
                </li>
                <li>
                    <a href="/dashboard/industries" className="block hover:bg-blue-700 px-4 py-2 rounded transition duration-300">Industries</a>
                </li>
                <li>
                    <a href="/dashboard/jobs" className="block hover:bg-blue-700 px-4 py-2 rounded transition duration-300">Jobs</a>
                </li>
                <li>
                    <a href="/dashboard/roles" className="block hover:bg-blue-700 px-4 py-2 rounded transition duration-300">Roles</a>
                </li>
            </ul>
        </aside>
        <main className="flex-1">
            {children}
        </main>
    </div>
  )
}

export default DashboardLayout