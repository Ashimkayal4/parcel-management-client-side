import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllDeliveryMen = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch delivery men data
    const { data: deliveryMen = [], isLoading, isError, error } = useQuery({
        queryKey: ['deliveryMen'],
        queryFn: async () => {
            const res = await axiosSecure.get('/deliveryMen');
            console.log(res.data); // Log to check the response format
            return res.data;
        },
    });

    // Fetch delivered parcels data
    const { data: deliverComplete = [] } = useQuery({
        queryKey: ['deliverComplete'],
        queryFn: async () => {
            const res = await axiosSecure.get('/deliverComplete');
            return res.data;
        },
    });

    // Loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Error state
    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">
                All Delivery Men: {Array.isArray(deliveryMen) ? deliveryMen.length : 0}
            </h1>
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
                        {Array.isArray(deliveryMen) && deliveryMen.length > 0 ? (
                            deliveryMen.map((man) => {
                                // Count the number of parcels delivered by this delivery man
                                const parcelsDelivered = deliverComplete.filter(
                                    (parcel) => parcel.deliveryMenId === man._id
                                ).length;

                                return (
                                    <tr key={man._id} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2">
                                            {man.name || 'N/A'}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {man.phone || 'N/A'}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {parcelsDelivered}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">N/A</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4">No delivery men found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllDeliveryMen;
