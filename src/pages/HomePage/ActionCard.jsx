import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ActionCard = () => {
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels');
            return res.data;
        }
    });


    const { data: users = [], } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });


    return (
        <div className="py-16 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Action Card 1 */}
                    <div className="p-6 bg-orange-400 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="text-lg font-semibold text-gray-900">
                                <h3 className="text-2xl">Total Parcels Booked</h3>
                            </div>
                            <p className="text-2xl">{parcels.length}</p>
                        </div>
                    </div>

                    <div className="p-6 bg-sky-400 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="text-lg font-semibold text-gray-900">
                                <h3 className="text-2xl">Total Parcels Delivered</h3>
                            </div>
                            <p className="text-2xl"></p>
                        </div>
                    </div>

                   
                    <div className="p-6 bg-green-300 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="text-lg font-semibold text-gray-900">
                                <h3 className="text-2xl">Total Users</h3>
                            </div>
                            <p className="text-2xl">{users.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActionCard;
