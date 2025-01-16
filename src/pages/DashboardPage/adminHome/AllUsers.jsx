import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 4;

    // Fetch all users
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    // Fetch all parcels
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels');
            return res.data;
        },
    });

    //  users parcels booked count
    const usersWithParcels = users.map((user) => {
        const parcelsBooked = parcels.filter((parcel) => parcel.email === user.email).length;
        return { ...user, parcelsBooked };
    });

    // Handle making a user an admin
    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to make ${user.name} an Admin?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, make Admin`,
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`users/admin/${user._id}`).then((res) => {
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            icon: 'success',
                            title: `${user.name} is now an Admin.`,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                });
            }
        });
    };

    // Handle making a user a delivery man
    const handleMakeDeliveryMan = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to make ${user.name} a Delivery Man?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, make Delivery Man`,
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`users/deliverMan/${user._id}`).then((res) => {
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            icon: 'success',
                            title: `${user.name} is now a Delivery Man.`,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                });
            }
        });
    };

    // Paginate users for the current page
    const paginatedUsers = usersWithParcels.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">All Users: {users.length}</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Phone Number</th>
                            <th className="border border-gray-300 px-4 py-2">Parcels Booked</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers.map((user) => (
                            <tr key={user._id} className="text-center">
                                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.phoneNumber || 'N/A'}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.parcelsBooked}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {user.role === 'deliveryMen' ? (
                                        <button className="mr-3">Delivery Man</button>
                                    ) : (
                                        <button
                                            onClick={() => handleMakeDeliveryMan(user)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                                        >
                                            Make Delivery Man
                                        </button>
                                    )}

                                    {user.role === 'admin' ? (
                                        <span>Admin</span>
                                    ) : (
                                        <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(usersWithParcels.length / usersPerPage) }, (_, index) => index + 1).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`px-3 py-1 mx-1 border rounded ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllUsers;
