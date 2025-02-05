import React from 'react';
import parcelLottie from '../../assets/lottie/parcel.json';
import Lottie from 'lottie-react';

const Banner = () => {
    return (
        <div className="relative bg-cover bg-center lg:h-screen max-sm:h-[650px] flex items-center justify-center text-black">
            <div className="absolute inset-0 pointer-events-none">
                <Lottie
                    animationData={parcelLottie}
                    loop
                    autoplay
                    className="w-full lg:h-full object-cover opacity-70 transform translate-y-20"
                />
            </div>

            {/* Overlay for Dim Effect */}
            <div className="absolute inset-0 bg-gray-800 bg-opacity-10"></div>

            {/* Foreground Content */}
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
