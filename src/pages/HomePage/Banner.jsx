import React from 'react';

const Banner = () => {
    return (
        <div className="relative bg-cover bg-center h-screen flex items-center justify-center text-white bg-banner">
            <div className="absolute inset-0 bg-gray-800 bg-opacity-50"></div>
            <div className="z-10 text-center px-6 md:px-12 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Reliable Parcel Management at Your Fingertips
                </h1>
                <p className="text-lg md:text-xl mb-8">
                    Track, manage, and ensure secure delivery of your parcels with ease.
                </p>
                <div className="flex justify-center">
                    <input
                        type="text"
                        placeholder="Enter tracking number..."
                        className="w-2/3 md:w-1/3 px-4 py-2 rounded-l-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-r-lg font-semibold">
                        Track
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Banner;