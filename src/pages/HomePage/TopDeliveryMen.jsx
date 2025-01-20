import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const TopDeliveryMen = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch data from multiple endpoints
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['topDeliveryMenData'],
        queryFn: async () => {
            const [deliverComplete, allReview] = await Promise.all([
                axiosSecure.get('/deliverComplete').then((res) => res.data),
                axiosSecure.get('/allReview').then((res) => res.data),
            ]);
            return { deliverComplete, allReview };
        },
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    // Initialize parcel count and review data
    const parcelCount = {};
    const reviewData = {};

    // Count parcels delivered by each delivery man
    data.deliverComplete.forEach((parcel) => {
        const { deliveryMenId, deliveryMenName, deliveryMenPhoto } = parcel;
        if (deliveryMenId) {
            parcelCount[deliveryMenId] = (parcelCount[deliveryMenId] || 0) + 1;
            if (!reviewData[deliveryMenId]) {
                reviewData[deliveryMenId] = { totalRating: 0, count: 0, deliveryMenName, deliveryMenPhoto };
            }
        }
    });

    // Calculate average rating for each delivery man
    data.allReview.forEach((review) => {
        const { deliveryMenId, rating } = review;
        if (deliveryMenId && reviewData[deliveryMenId]) {
            reviewData[deliveryMenId].totalRating += parseFloat(rating);
            reviewData[deliveryMenId].count += 1;
        }
    });

    // Combine parcel count and average rating data, sort by parcel count and average rating
    const topDeliveryMen = Object.entries(reviewData)
        .map(([id, { deliveryMenName, deliveryMenPhoto, totalRating, count }]) => ({
            id,
            deliveryMenName,
            deliveryMenPhoto,
            parcelCount: parcelCount[id] || 0,
            averageRating: totalRating / count || 0,
        }))
        .sort((a, b) => b.parcelCount - a.parcelCount || b.averageRating - a.averageRating)
        .slice(0, 3);

    return (
        <div className="p-6 bg-white shadow-md">
            <h2 className="text-3xl font-bold mb-4 flex justify-center">Top 3 Delivery Men</h2>
            <div className="lg:grid lg:grid-cols-3 gap-6">
                {topDeliveryMen.map((man) => (
                    <div
                        key={man.id}
                        className="bg-gradient-to-t from-blue-50 to-blue-200 rounded-lg shadow-lg overflow-hidden flex flex-col"
                    >
                        <div className="relative flex-1">
                            <img
                                src={man.deliveryMenPhoto}
                                alt={man.deliveryMenName}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                        </div>
                        <div className="p-4 flex flex-col justify-between items-center text-center space-y-2">
                            <h3 className="text-lg font-semibold">{man.deliveryMenName || 'Unknown'}</h3>
                            <p className="text-gray-600">Parcels Delivered : <span className='font-bold'>{man.parcelCount}</span></p>
                            <p className=" text-gray-600">Average Rating :<span className='font-bold'> {man.averageRating.toFixed(2)}</span></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopDeliveryMen;
