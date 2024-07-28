import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { useFetchItemDetailsQuery } from '../../redux/apiSlice.ts';

const ItemDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useFetchItemDetailsQuery(id ?? '');

    const handleClose = () => {
        const params = new URLSearchParams(location.search);
        navigate(`/?${params.toString()}`);
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
