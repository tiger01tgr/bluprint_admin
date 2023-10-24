import React from 'react'

interface Props {
    isSelected: boolean
    isDotDotDot: boolean
    pageNumber: number
    changePageNumber: (page: number) => void
}

const PaginationNumber: React.FC<Props> = ({ isSelected, isDotDotDot, pageNumber, changePageNumber }) => {
    if (isDotDotDot) {
        return (        
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
        )
    }
    if (isSelected) {
        return (
            <a onClick={() => changePageNumber(pageNumber)} aria-current="page" className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{pageNumber}</a>
        )
    }
    return (
        <a onClick={() => changePageNumber(pageNumber)} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">{pageNumber}</a>
    )
}

export default PaginationNumber