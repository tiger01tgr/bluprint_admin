import React from 'react'
import PaginationNumber from './PaginationNumber'

interface Props {
    currentPage: number
    setCurrentPage: (page: number) => void
    totalPages: number
}
const PaginationNumbers: React.FC<Props> = ({ currentPage, setCurrentPage, totalPages }) => {

    if (totalPages <= 7) {
        const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
        return (
            <>
            {pages.map((page) => (
                <PaginationNumber isSelected={page === currentPage} isDotDotDot={false} pageNumber={page} changePageNumber={setCurrentPage} />
            ))}
            </>
        )
    }

    if (currentPage >= 4 && totalPages - currentPage >= 4) {
        return (
            <>
            <PaginationNumber isSelected={false} isDotDotDot={false} pageNumber={1} changePageNumber={setCurrentPage} />
            <PaginationNumber isSelected={false} isDotDotDot={true} pageNumber={1} changePageNumber={setCurrentPage} />
            <PaginationNumber isSelected={false} isDotDotDot={false} pageNumber={currentPage - 1} changePageNumber={setCurrentPage} />
            <PaginationNumber isSelected={true} isDotDotDot={false} pageNumber={currentPage} changePageNumber={setCurrentPage} />
            <PaginationNumber isSelected={false} isDotDotDot={false} pageNumber={currentPage + 1} changePageNumber={setCurrentPage} />
            <PaginationNumber isSelected={false} isDotDotDot={true} pageNumber={1} changePageNumber={setCurrentPage} />
            <PaginationNumber isSelected={false} isDotDotDot={false} pageNumber={totalPages} changePageNumber={setCurrentPage} />
            </>
        )
    }

    if (currentPage >= 4) {
        const after = Array.from({ length: totalPages - currentPage }, (_, i) => currentPage + i);
        return (
            <>
            <PaginationNumber isSelected={false} isDotDotDot={false} pageNumber={1} changePageNumber={setCurrentPage} />
            <PaginationNumber isSelected={false} isDotDotDot={true} pageNumber={1} changePageNumber={setCurrentPage} />
            <PaginationNumber isSelected={false} isDotDotDot={false} pageNumber={currentPage - 1} changePageNumber={setCurrentPage} />
            <PaginationNumber isSelected={true} isDotDotDot={false} pageNumber={currentPage} changePageNumber={setCurrentPage} />
            {after.map((page) => (
                <PaginationNumber isSelected={false} isDotDotDot={false} pageNumber={page} changePageNumber={setCurrentPage} />
            ))}
            </>
        )
    }
    const before = Array.from({ length: currentPage - 1 }, (_, i) => currentPage + i);

    return (
        <>
        {before.map((page) => (
            <PaginationNumber isSelected={false} isDotDotDot={false} pageNumber={page} changePageNumber={setCurrentPage} />
        ))}
        <PaginationNumber isSelected={true} isDotDotDot={false} pageNumber={currentPage} changePageNumber={setCurrentPage} />
        <PaginationNumber isSelected={false} isDotDotDot={false} pageNumber={currentPage + 1} changePageNumber={setCurrentPage} />
        <PaginationNumber isSelected={false} isDotDotDot={true} pageNumber={1} changePageNumber={setCurrentPage} />
        <PaginationNumber isSelected={false} isDotDotDot={false} pageNumber={totalPages} changePageNumber={setCurrentPage} />
        </>
    )
}

export default PaginationNumbers