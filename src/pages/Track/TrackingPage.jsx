import { useState } from "react";

const TrackingPage = () => {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [trackingInfo, setTrackingInfo] = useState(null);
    const [message, setMessage] = useState("");

    const handleTrack = (e) => {
        e.preventDefault();

        if (!trackingNumber.trim()) {
            setMessage("Please enter a tracking number.");
            setTrackingInfo(null);
            return;
        }

        if (trackingNumber === "12345") {
            setTrackingInfo({
                status: "In Transit",
                location: "Chattogram, Bangladesh",
                estimatedDelivery: "2025-02-25",
            });
            setMessage("");
        } else {
            setTrackingInfo(null);
            setMessage("No parcel found with this tracking number.");
        }
    };

    return (
        <div className=" py-36 flex flex-col items-center justify-center bg-gray-100 px-4">
            <h1 className="text-3xl font-bold text-green-600 mb-4">Track Your Parcel</h1>

            <form onSubmit={handleTrack} className="flex w-full max-w-md">
                <input
                    type="text"
                    placeholder="Enter tracking number"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="flex-1 border p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 rounded-r-md hover:bg-green-700"
                >
                    Track
                </button>
            </form>

            {
                message && (
                <p className="text-red-600 mt-4">{message}</p>
                )
            }

            {trackingInfo && (
                <div className="bg-white shadow-md rounded-lg p-6 mt-6 w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-4">Tracking Details</h2>
                    <p><strong>Status:</strong> {trackingInfo.status}</p>
                    <p><strong>Current Location:</strong> {trackingInfo.location}</p>
                    <p><strong>Estimated Delivery:</strong> {trackingInfo.estimatedDelivery}</p>
                </div>
            )}
        </div>
    );
};

export default TrackingPage;
