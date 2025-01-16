import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const MyBookedParcel = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [filterStatus, setFilterStatus] = useState('all');

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/users/${user?.email}`);
            return res.data;
        },
    });

    // Handle Status Filter
    const filteredParcels =
        filterStatus === 'all'
            ? parcels
            : parcels.filter((parcel) => parcel.status === filterStatus);

    const handleCancel =  (id) => {
    
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">My Parcels : { parcels.length}</h2>
            {/* Filter Section */}
            <div className="mb-4">
                <label className="mr-2">Filter by Status:</label>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border px-2 py-1"
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="on the way">On the Way</option>
                    <option value="delivered">Delivered</option>
                    <option value="returned">Returned</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>

            {/* Parcels Table */}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">Parcel Type</th>
                        <th className="border border-gray-300 p-2">Requested Delivery Date</th>
                        <th className="border border-gray-300 p-2">Approximate Delivery Date</th>
                        <th className="border border-gray-300 p-2">Booking Date</th>
                        <th className="border border-gray-300 p-2">Delivery Men ID</th>
                        <th className="border border-gray-300 p-2">Booking Status</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredParcels.map((parcel) => (
                        <tr key={parcel._id}>
                            <td className="border border-gray-300 p-2">{parcel.type}</td>
                            <td className="border border-gray-300 p-2">{parcel.date}</td>
                            <td className="border border-gray-300 p-2">{parcel.approximateDeliveryDate || 'N/A'}</td>
                            <td className="border border-gray-300 p-2">{new Date().toLocaleDateString()}</td>
                            <td className="border border-gray-300 p-2">{parcel.deliveryMenId || 'Not Assigned'}</td>
                            <td className="border border-gray-300 p-2">{parcel.status}</td>
                            <td className="border border-gray-300 p-2 space-x-2">
                                {/* Update Button */}
                                <button
                                    className={`px-2 py-1 text-white rounded ${parcel.status === 'pending' ? 'bg-blue-500' : 'bg-gray-400 cursor-not-allowed'
                                        }`}
                                    disabled={parcel.status !== 'pending'}
                                    onClick={() => window.location.assign(`/update-booking/${parcel._id}`)}
                                >
                                    Update
                                </button>

                                {/* Cancel Button */}
                                <button
                                    className={`px-2 py-1 text-white rounded ${parcel.status === 'pending' ? 'bg-red-500' : 'bg-gray-400 cursor-not-allowed'
                                        }`}
                                    disabled={parcel.status !== 'pending'}
                                    onClick={() => handleCancel(parcel._id)}
                                >
                                    Cancel
                                </button>

                                {/* Review Button */}
                                {parcel.status === 'delivered' && (
                                    <button
                                        className="px-2 py-1 bg-green-500 text-white rounded"
                                        onClick={() => window.location.assign(`/review/${parcel._id}`)}
                                    >
                                        Review
                                    </button>
                                )}

                                {/* Pay Button */}
                                {parcel.status === 'pending' && (
                                    <button
                                        className="px-2 py-1 bg-yellow-500 text-white rounded"
                                        onClick={() => window.location.assign(`/pay/${parcel._id}`)}
                                    >
                                        Pay
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyBookedParcel;
