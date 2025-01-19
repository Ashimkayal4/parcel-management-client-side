import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import { IoStarSharp } from 'react-icons/io5';

const MyReviews = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // Fetch delivery men data
    const { data: deliveryMen = [] } = useQuery({
        queryKey: ['deliveryMen'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
    });

    // get my review
    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myReview/${deliveryMen._id}`);
            return res.data;
        },
    });


    return (

        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">My Reviews</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {
                    reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review._id} className="border p-4 rounded shadow-lg">
                            <div className="flex items-center mb-4">
                                <img
                                    src={review.image || 'https://via.placeholder.com/150'}
                                    alt={review.name}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <h3 className="font-bold">{review.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        {review.date}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-4 flex gap-3 items-center">
                               Rating :  <IoStarSharp/> {review.rating}
                            </div>

                            <p className="text-gray-700">{review.feedback}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
        </div>

    );
};

export default MyReviews;