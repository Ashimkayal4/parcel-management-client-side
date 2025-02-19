import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const ContactUs = () => {
    return (
        <div className=" bg-gray-100 py-20 px-6">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-green-600 font-bold text-lg uppercase tracking-wide">How can we help you?</h2>
                <h1 className="text-4xl font-bold mt-2 mb-4">Contact Us</h1>
                <p className="text-gray-700 max-w-2xl mx-auto">
                    We're here to assist with any inquiries or support you need. Feel free to reach out to us using the details below or send us a message.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Location Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
                    <FaMapMarkerAlt className="text-green-500 w-12 h-12 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Our Location</h3>
                    <p className="text-gray-700 text-center">Dhaka, Bangladesh</p>
                </div>

                {/* Phone Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
                    <FaPhone className="text-green-500 w-12 h-12 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                    <p className="text-gray-700">+8801990-835127</p>
                </div>

                {/* Email Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
                    <FaEnvelope className="text-green-500 w-12 h-12 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                    <a
                        href="mailto:ashimkayal4@gmail.com"
                        className="text-blue-600 underline hover:text-blue-800 transition"
                    >
                        ashimkayal4@gmail.com
                    </a>
                </div>
            </div>

            {/* Contact Form */}
            <div className="max-w-4xl mx-auto mt-16 bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Send Us a Message</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Subject"
                        className="border rounded-lg p-3 col-span-1 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <textarea
                        rows="5"
                        placeholder="Your Message"
                        className="border rounded-lg p-3 col-span-1 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-green-600 text-white py-3 rounded-lg col-span-1 md:col-span-2 hover:bg-green-700 transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;