
import { FaCamera } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();


    // Fetch profile data
    const { data: profile = {}, } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
    });


    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>
            <div className="flex flex-col items-center space-y-6">
       
                <div className="relative">
                    <img
                        src={profile?.photo}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
                    />
                    <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer">
                        <input type="file" className="hidden" accept="image/*" />
                        <FaCamera />
                    </label>
                </div>

                
                <div className="text-center">
                    <h2 className="text-2xl font-semibold">{profile.name}</h2>
                    <p className="text-gray-500">{profile.email}</p>
                </div>

             
                <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition">
                    Update Profile
                </button>
            </div>
        </div>
    );
};

export default MyProfile;
