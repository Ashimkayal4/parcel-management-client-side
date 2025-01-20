import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AllParcel = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedParcel, setSelectedParcel] = useState(null);

    // Fetch parcels data
    const { data: parcels = [], isLoading: parcelsLoading, isError: parcelsError, refetch } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels');
            return Array.isArray(res.data) ? res.data : [];
        }
    });

    // Fetch delivery men data for the modal dropdown
    const { data: deliveryMenList = [], isLoading: menLoading, isError: menError } = useQuery({
        queryKey: ['deliveryMenList'],
        queryFn: async () => {
            const res = await axiosSecure.get('/deliveryMen');
            return Array.isArray(res.data) ? res.data : [];
        }
    });

    const { _id, } = selectedParcel || {};

    const handleSelectDeliveryMen = e => {
        e.preventDefault()
        const form = e.target;
        const date = form.date.value;
        const deliveryMenId = form.deliveryId.value;

        const selectedDeliveryMan = deliveryMenList.find(man => man._id === deliveryMenId);

        const deliveryMenName = selectedDeliveryMan?.name;
        const deliveryMenPhoto = selectedDeliveryMan?.photo;

       

        const selectInfo = {
            deliveryMenId,
            deliveryMenName,
            deliveryMenPhoto,
            date,
        }

        console.log(selectInfo)

        axiosSecure.patch(`/update/deliver/${_id}`, selectInfo)
            .then(() => {
                Swal.fire({
                    title: "Are you sure?",
                    text: "Do you want to select this delivery person?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, I want"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Confirmed!",
                            text: "Delivery man assigned successfully",
                            icon: "success"
                        });

                        refetch();
                        setSelectedParcel(null);
                    }
                });
            })
    }

    // Loading and error handling
    if (parcelsLoading || menLoading) {
        return <div>Loading...</div>;
    }

    if (parcelsError || menError) {
        return <div>Error loading data</div>;
    }

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
                                <td className="border border-gray-300 px-4 py-2">{parcel.bookingDate}</td>
                                <td className="border border-gray-300 px-4 py-2">{parcel.date}</td>
                                <td className="border border-gray-300 px-4 py-2">${parcel.price}</td>
                                <td className={`border border-gray-300 px-4 py-2 font-semibold ${parcel.status === 'pending' ? 'text-red-500' : parcel.status === 'Delivered' ? 'text-green-500' : ''}`}>
                                    {parcel.status}
                                </td>

                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        className={`px-3 py-1 rounded ${parcel.status === 'Delivered' ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
                                        onClick={() => setSelectedParcel(parcel)}
                                        disabled={parcel.status === 'Delivered'}>
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
                    <form onSubmit={handleSelectDeliveryMen} className="bg-white p-6 rounded shadow-lg w-11/12 sm:w-96">
                        <h2 className="text-lg font-bold mb-4">Manage Parcel</h2>
                        <p className="mb-2"><strong>Parcel ID:</strong> {selectedParcel._id}</p>

                        <label className="block mb-2 font-semibold">Assign Delivery Man:</label>
                        <select name='deliveryId' className="w-full p-2 border rounded mb-4">
                            <option>Select a delivery man</option>
                            {deliveryMenList.map((man) => (
                                <option key={man._id} value={man._id}>
                                    {man.name}
                                </option>
                            ))}
                        </select>

                        <label className="block mb-2 font-semibold">Approximate Delivery Date:</label>
                        <input
                            type="date"
                            name='date'
                            className="w-full p-2 border rounded mb-4"
                            required
                        />

                        <div className="flex justify-end gap-2">
                            <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700"
                                onClick={() => setSelectedParcel(null)}>
                                Cancel
                            </button>
                            <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700">
                                Assign
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AllParcel;
