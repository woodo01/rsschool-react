import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface PaginationProps {
    totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const currentPage = Number(params.get('page')) || 1;

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(location.search);
        params.set('page', page.toString());
        navigate(`/?${params.toString()}`);
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
                        {page}
                    </button>
                ),
            )}
        </div>
    );
};

export default Pagination;
