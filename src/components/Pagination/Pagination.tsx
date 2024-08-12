import React from 'react';
import { useRouter } from 'next/router';

interface PaginationProps {
    totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
    const router = useRouter();
    const currentPage = Number(router.query.page) || 1;

    const handlePageChange = (page: number) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page: page.toString() },
        });
    };

    return (
        <div className="Pagination">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        disabled={page === currentPage}
                    >
                        Page {page}
                    </button>
                ),
            )}
        </div>
    );
};

export default Pagination;
