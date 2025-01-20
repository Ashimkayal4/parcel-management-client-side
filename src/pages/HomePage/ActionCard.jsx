import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ActionCard = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch all counts in a single query to reduce multiple requests
    
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['counts'],
        queryFn: async () => {
            const resUsers = await axiosSecure.get('/users-counts');
            const resParcels = await axiosSecure.get('/parcels-counts');
            const resDeliverComplete = await axiosSecure.get('/deliverComplete');
            return {
                usersCount: resUsers?.data?.usersCount || 0,
                parcelsCount: resParcels?.data?.parcelsCount || 0,
                deliverComplete: resDeliverComplete?.data || [],
            };
        },
    });

    if (isLoading) {
        return <div>Loading data...</div>;
    }

    if (isError) {
        return <div>Error: {error?.message || 'Something went wrong'}</div>;
    }

    const { usersCount, parcelsCount, deliverComplete } = data;

    return (
        <div className="py-4 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Action Card 1 */}
                    <div className="p-6 bg-orange-400 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="text-lg font-semibold text-gray-900">
                                <h3 className="text-2xl">Total Parcels Booked</h3>
                            </div>
                            <p className="text-3xl font-bold">{parcelsCount}</p>
                        </div>
                    </div>

                    {/* Action Card 2 */}
                    <div className="p-6 bg-sky-400 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="text-lg font-semibold text-gray-900">
                                <h3 className="text-2xl">Total Parcels Delivered</h3>
                            </div>
                            <p className="text-3xl font-bold">{deliverComplete.length}</p>
                        </div>
                    </div>

                    {/* Action Card 3 */}
                    <div className="p-6 bg-green-300 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="text-lg font-semibold text-gray-900">
                                <h3 className="text-2xl">Total Users</h3>
                            </div>
                            <p className="text-3xl font-bold">{usersCount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActionCard;
