import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 4;

    const { data: users = [],refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    // make admin from a normal user
    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to make Admin ${user?.name} ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes make Admin ${user?.name}`
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`users/admin/${user._id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                position: "top-center",
                                icon: "success",
                                title: "Make admin successful",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })

            }
        });
   
    }

    // make delivery man
    const handleMakeDeliveryMan = (user) => {

        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to make ${user?.name} a delivery man ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes make ${user?.name} a delivery man`
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`users/deliverMan/${user._id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                position: "top-center",
                                icon: "success",
                                title: ` ${user} make delivery man successfully`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        });



   
    }




    const paginatedUsers = users.slice(
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
                        {paginatedUsers.map(user => (
                            <tr key={user._id} className="text-center">
                                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.phoneNumber || 'N/A'}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.parcelsBooked || 0}</td>
                                <td className="border border-gray-300 px-4 py-2">

                                    {
                                        user.role === 'deliveryMen' ? <button className='mr-3'>Delivery Man</button> : <button
                                            onClick={() => handleMakeDeliveryMan(user)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">
                                            Make Delivery Man
                                        </button>
                                    }

                                    {
                                        user.role === "admin" ? 'Admin' : <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                                            Make Admin
                                        </button>
                                        
                                    }

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => index + 1).map(pageNumber => (
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
