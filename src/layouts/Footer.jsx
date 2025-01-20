
const Footer = () => {
    return (
        <div className="bg-gray-300">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-8 px-6 text-center md:text-left">
                {/* Column 1 */}
                <div>
                    <h2 className="text-orange-500 text-lg font-bold">DropZone</h2>
                    <ul className="text-sm text-gray-700 mt-2 space-y-1">
                        <li>Just the ParcelPath</li>
                        <li>The Trial Kit</li>
                        <li>Wholesale & Bulk</li>
                        <li>Teaware</li>
                    </ul>
                </div>

                {/* Column 2 */}
                <div>
                    <h2 className="text-gray-800 text-lg font-bold">Passionate</h2>
                    <ul className="text-sm text-gray-700 mt-2 space-y-1">
                        <li>Secure Delivery</li>
                        <li>100% Authentic</li>
                        <li>24/7 Support</li>
                    </ul>
                </div>

                {/* Column 3 */}
                <div>
                    <h2 className="text-gray-800 text-lg font-bold">Let's Stay Connected</h2>
                    <p className="text-sm text-gray-700 mt-2 mb-3">
                        Enter your email to unlock 10% OFF.
                    </p>
                    <div className="flex justify-center md:justify-start">
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="p-2 border border-gray-300 rounded-l-md focus:outline-none"
                        />
                        <button className="bg-green-500 text-white px-4 py-2 rounded-r-md">
                            Submit
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Bottom Section */}
            <div className="bg-gray-800 text-white py-3">
                <div className="container mx-auto text-center text-sm">
                    © 2024 DropZone.com | Terms of Service | Privacy Policy | Refund Policy | Accessibility Policy
                </div>
            </div>
        </div>
    );
};

export default Footer;
