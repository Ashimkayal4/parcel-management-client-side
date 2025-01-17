import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';

const MyBookedParcel = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [filterStatus, setFilterStatus] = useState('all');

    const { data: parcels = [], } = useQuery({
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



    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">My Parcels : {parcels.length}</h2>
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

                                <Link to={`/dashboard/update/${parcel._id}`}>
                                    <button className='btn btn-primary mb-3 ml-2'>
                                        Update
                                    </button>
                                </Link>

                                {/* Cancel Button */}
                                <button className='btn btn-error' onClick={() => handleCancel(parcel._id)}>
                                    Cancel
                                </button>

                                {/* Review Button */}
                                {parcel.status === 'delivered' && (
                                    <button>
                                        Review
                                    </button>
                                )}

                                {/* Pay Button */}
                                {parcel.status === 'pending' && (
                                    <button>
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
