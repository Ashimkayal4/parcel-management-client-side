
const PricingPage = () => {
    return (
        <div className=" bg-gray-100 pt-20 px-4">
            <h1 className="text-4xl font-bold text-center mb-10">Pricing Plans</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Basic Plan */}
                <div className="rounded-2xl shadow-lg p-6 bg-white flex flex-col items-center">
                    <h2 className="text-2xl font-semibold mb-4">Basic</h2>
                    <p className="text-3xl font-bold text-purple-600 mb-4">650 taka / month</p>
                    <ul className="text-gray-700 space-y-2 mb-6 text-center">
                        <li> 5 parcels per month</li>
                        <li> Basic support</li>
                        <li> Tracking updates</li>
                    </ul>
                    <button className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition">
                        Choose Plan
                    </button>
                </div>

                {/* Standard Plan */}
                <div className="rounded-2xl shadow-lg p-6 bg-white flex flex-col items-center">
                    <h2 className="text-2xl font-semibold mb-4">Standard</h2>
                    <p className="text-3xl font-bold text-purple-600 mb-4">2500 taka / month</p>
                    <ul className="text-gray-700 space-y-2 mb-6 text-center">
                        <li> 20 parcels per month</li>
                        <li> Priority support</li>
                        <li> Real-time tracking</li>
                        <li> Delivery notifications</li>
                    </ul>
                    <button className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition">
                        Choose Plan
                    </button>
                </div>

                {/* Premium Plan */}
                <div className="rounded-2xl shadow-lg p-6 bg-white flex flex-col items-center">
                    <h2 className="text-2xl font-semibold mb-4">Premium</h2>
                    <p className="text-3xl font-bold text-purple-600 mb-4">4000 taka / month</p>
                    <ul className="text-gray-700 space-y-2 mb-6 text-center">
                        <li> Unlimited parcels</li>
                        <li> 24/7 support</li>
                        <li> Advanced tracking</li>
                        <li> Custom notifications</li>
                        <li> Dedicated manager</li>
                    </ul>
                    <button className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition">
                        Choose Plan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;