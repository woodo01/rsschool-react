import React from 'react';
import Loader from '../Loader/Loader';
import { useFetchItemDetailsQuery } from '../../redux/apiSlice.ts';
import { useRouter } from 'next/router';

const ItemDetails: React.FC = () => {
    const router = useRouter();
    const { id, ...otherQueryParams } = router.query;
    const { data, isLoading } = useFetchItemDetailsQuery(id as string);

    const handleClose = () => {
        router.push({
            pathname: `/`,
            query: { ...otherQueryParams },
        });
    };

    return (
        <div className="ItemDetails" onClick={(e) => e.stopPropagation()}>
            Details
            {isLoading ? (
                <Loader />
            ) : data ? (
                <div>{data.animal.name}</div>
            ) : (
                <p>No details available</p>
            )}
            <button onClick={handleClose}>Close</button>
        </div>
    );
};

export default ItemDetails;
