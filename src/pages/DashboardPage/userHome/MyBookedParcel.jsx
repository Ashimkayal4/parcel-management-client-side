import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyBookedParcel = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [filterStatus, setFilterStatus] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [parcelId, setParcelId] = useState(null);

    const { data: parcels = [],refetch } = useQuery({
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

    // Handle Review Submit
    const handleSubmitReview = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

        const review = {
            name: user?.displayName,
            image: user?.photoURL,
            deliveryMenId: selectedParcel?.deliveryMenId,
            rating: formData.get('rating'),
            feedback: formData.get('feedback'),
            date: formattedDate,
            parcelId:parcelId,
        };

        axiosSecure.post('/reviews', review)
            .then(() => {

                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Your review successfully send to delivery man",
                    showConfirmButton: false,
                    timer: 1500
                });

                setShowModal(false);

            })

    };

    const handleDelete = id => {
        axiosSecure.delete(`/delete-parcel/${id}`)
            .then(() => {
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your parcel has been deleted.",
                            icon: "success"
                        });
                    }
                });

        })
    }

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

                                {
                                    parcel.status === 'Delivered' ? <>

                                        <button
                                            className='btn btn-active btn-neutral'
                                            onClick={() => {
                                                setSelectedParcel(parcel);
                                                setShowModal(true);
                                                setParcelId(parcel._id)
                                            }}
                                        >
                                            Review
                                        </button>
                                    </>
                                        : <>

                                            <div className='flex gap-2'>
                                                <Link to={`/dashboard/update/${parcel._id}`}>
                                                    <button className='btn btn-primary mb-3 ml-2'>
                                                        Update
                                                    </button>
                                                </Link>

                                                <Link to={`/dashboard/payment/${parcel._id}`}>
                                                    <button className='btn btn-success'>
                                                        Pay
                                                    </button>
                                                </Link>
                                                
                                            </div>

                                            <button onClick={()=>handleDelete(parcel._id)} className='btn btn-error'>Cancel</button>

                                        </>
                                }

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for Review */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h3 className="text-lg font-bold mb-4">Add Review</h3>
                        <form onSubmit={handleSubmitReview}>
                            <div className="mb-4">
                                <label className="block font-bold">Name:</label>
                                <input
                                    type="text"
                                    value={user?.displayName || ''}
                                    readOnly
                                    className="w-full border px-2 py-1"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-bold">Image:</label>
                                <input
                                    type="text"
                                    value={user?.photoURL || ''}
                                    readOnly
                                    className="w-full border px-2 py-1"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-bold">Delivery Man ID:</label>
                                <input
                                    type="text"
                                    value={selectedParcel?.deliveryMenId || ''}
                                    readOnly
                                    className="w-full border px-2 py-1"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-bold">Rating:</label>
                                <input
                                    type="text"
                                    name="rating"
                                    required
                                    className="w-full border px-2 py-1"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-bold">Feedback:</label>
                                <textarea
                                    name="feedback"
                                    required
                                    className="w-full border px-2 py-1"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-500 text-white px-3 py-1 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyBookedParcel;
