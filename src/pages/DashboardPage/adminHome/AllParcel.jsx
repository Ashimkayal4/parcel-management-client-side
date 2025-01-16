import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllParcel = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [deliveryMen, setDeliveryMen] = useState([]);
    const [approximateDate, setApproximateDate] = useState("");

    // Fetch parcels data
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels');
            return res.data;
        }
    });

    // Fetch delivery men data for the modal dropdown
    const { data: deliveryMenList = [] } = useQuery({
        queryKey: ['deliveryMen'],
        queryFn: async () => {
            const res = await axiosSecure.get('/deliveryMen');
            setDeliveryMen(res.data);
            return res.data;
        }
    });

    const handleAssign = async () => {
        
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">All Parcels: {parcels.length}</h1>
            <div className="overflow-x-auto">
                <table className="table-auto border-collapse border border-gray-300 w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">User's Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">User's Phone</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Booking Date</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Requested Delivery Date</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Cost</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel) => (
                            <tr key={parcel._id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{parcel.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{parcel.phone}</td>
                                <td className="border border-gray-300 px-4 py-2">{parcel.date}</td>
                                <td className="border border-gray-300 px-4 py-2">{parcel.receiverName}</td>
                                <td className="border border-gray-300 px-4 py-2">${parcel.price}</td>
                                <td className="border border-gray-300 px-4 py-2">{parcel.status || "Pending"}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                                        onClick={() => setSelectedParcel(parcel)}
                                    >
                                        Manage
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {selectedParcel && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-11/12 sm:w-96">
                        <h2 className="text-lg font-bold mb-4">Manage Parcel</h2>
                        <p className="mb-2"><strong>Parcel ID:</strong> {selectedParcel._id}</p>

                        <label className="block mb-2 font-semibold">Assign Delivery Man:</label>
                        <select
                            className="w-full p-2 border rounded mb-4"
                            onChange={(e) => setDeliveryMen(e.target.value)}
                        >
                            <option value="">Select a delivery man</option>
                            {deliveryMenList.map((man) => (
                                <option key={man._id} value={man._id}>
                                    {man.name}
                                </option>
                            ))}
                        </select>

                        <label className="block mb-2 font-semibold">Approximate Delivery Date:</label>
                        <input
                            type="date"
                            className="w-full p-2 border rounded mb-4"
                            value={approximateDate}
                            onChange={(e) => setApproximateDate(e.target.value)}
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700"
                                onClick={() => setSelectedParcel(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                                onClick={handleAssign}
                            >
                                Assign
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllParcel;
