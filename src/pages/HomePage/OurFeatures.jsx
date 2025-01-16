import safetyIcon from '../../assets/safety-icon.png';
import fastDelivery from '../../assets/superFast.jpg';
import location from '../../assets/location.png';

const OurFeatures = () => {
    return (
        <div className="py-16">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-semibold text-gray-900 mb-8">Our Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature Card 1 */}
                    <div className="bg-white shadow-xl rounded-lg p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
                        <div className="flex items-center justify-center rounded-full mb-4 bg-indigo-100 p-4">
                            <img src={safetyIcon} className="h-16" alt="Parcel Safety" />
                        </div>

                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Parcel Safety</h3>
                        <p className="text-gray-600 text-sm">
                            Your parcels are secured with industry-leading protocols, ensuring safe delivery every time.
                        </p>
                    </div>
                    {/* Feature Card 2 */}
                    <div className="bg-white shadow-xl rounded-lg p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
                        <div className="flex items-center justify-center rounded-full mb-4 bg-green-100 p-4">
                            <img src={fastDelivery} className="h-16" alt="Super Fast Delivery" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Super Fast Delivery</h3>
                        <p className="text-gray-600 text-sm">
                            Get your parcels delivered faster than ever, with real-time tracking at every step.
                        </p>
                    </div>
                    {/* Feature Card 3 */}
                    <div className="bg-white shadow-xl rounded-lg p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full mb-4 bg-blue-100 p-4">
                            <img src={location} className="h-10" alt="Real-Time Tracking" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Real-Time Tracking</h3>
                        <p className="text-gray-600 text-sm">
                            Monitor your parcels in real-time with our robust tracking system.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurFeatures;
