import { FaCamera } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const { register, handleSubmit, reset } = useForm();

    // Fetch profile data
    const { data: profile = {},refetch } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
    });

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }

        // Upload image to ImgBB
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        });

        if (res.data.success) {
            // Update profile data with image URL
            const updatedUserData = {
                photo: res.data.data.display_url,
            };

            const updateRes = await axiosSecure.patch(`/user-photo/${user?.email}`, updatedUserData);

            if (updateRes.data.modifiedCount > 0) {
                // Success popup
                reset();
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Profile updated successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }

    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>
            <div className="flex flex-col items-center space-y-6">

                <div>
                    <img
                        src={profile?.photo}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
                    />
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-semibold">{profile.name}</h2>
                    <p className="text-gray-500">{profile.email}</p>
                </div>

                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
                        <div className="form-control">
                            <label className="flex items-center gap-2 bg-blue-500 text-white rounded-md p-2 cursor-pointer">
                                <input
                                    type="file"
                                    {...register("image", { required: true })}
                                    className="hidden"
                                />
                                <FaCamera />
                                Upload Picture
                            </label>
                        </div>

                        <div className="form-control">
                            <button className="btn">
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
