
import safetyIcon from '../../assets/safety-icon.png'
import fastDelivery from '../../assets/superFast.jpg'
import location from '../../assets/location.png'
const OurFeatures = () => {
    return (
        <div className="py-16 bg-gray-100">
            <div className="max-w-7xl mx-auto text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature Card 1 */}
                    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
                        <div className=" flex items-center justify-center rounded-full mb-2">
                            <img src={safetyIcon} className='h-16' alt="" />
                        </div>

                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Parcel Safety
                        </h3>
                        <p className="text-gray-600">
                            Your parcels are secured with industry-leading protocols, ensuring safe delivery every time.
                        </p>
                    </div>
                    {/* Feature Card 2 */}
                    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
                        <div className=" flex items-center justify-center rounded-full mb-2">
                            <img src={fastDelivery} className='h-16' alt="" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Super Fast Delivery
                        </h3>
                        <p className="text-gray-600">
                            Get your parcels delivered faster than ever, with real-time tracking at every step.
                        </p>
                    </div>
                    {/* Feature Card 3 */}
                    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full mb-4">
                        <img src={location} className='h-10' alt="" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Real-Time Tracking
                        </h3>
                        <p className="text-gray-600">
                            Monitor your parcels in real-time with our robust tracking system.
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default OurFeatures;