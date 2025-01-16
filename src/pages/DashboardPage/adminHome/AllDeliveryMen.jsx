import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllDeliveryMen = () => {
    const axiosSecure = useAxiosSecure();

    const { data: deliveryMen = [], isLoading, isError, error } = useQuery({
        queryKey: ['deliveryMen'],
        queryFn: async () => {
            const res = await axiosSecure.get('/deliveryMen');
            return res.data;
        }
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">All Delivery Men: {deliveryMen.length}</h1>
            <div className="overflow-x-auto">
                <table className="table-auto border-collapse border border-gray-300 w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Phone Number</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Parcels Delivered</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Average Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveryMen.map((man, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{man.name || "N/A"}</td>
                                <td className="border border-gray-300 px-4 py-2">{man.phone || "N/A"}</td>
                                <td className="border border-gray-300 px-4 py-2">{man.parcelsDelivered || 0}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {man.averageReview ? man.averageReview.toFixed(1) : "N/A"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllDeliveryMen;
