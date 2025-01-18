import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyDeliveryList = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch profile data
    const { data: profile = {}, isLoading: isProfileLoading } = useQuery({
        queryKey: ["profile", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
    });

    // Fetch delivery list
    const { data: deliveryList = [], isLoading: isDeliveryListLoading, refetch } = useQuery({
        queryKey: ["deliveryList", profile._id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcelDelivery/${profile._id}`);
            return res.data;
        }
    });

    // Handle Cancel
    const handleCancel = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to cancel this delivery.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, cancel it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/cancelDelivery/${id}`)
                    .then(() => {
                        Swal.fire("Cancelled!", "The delivery has been cancelled.", "success");
                        refetch();
                    });
            }
        });
    };

    // Handle Deliver
    const handleDeliver = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to mark this delivery as delivered.",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, deliver it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/deliverParcel/${id}`)
                    .then(() => {
                      
                        refetch();
                    });
            }
        });
    };

    if (isProfileLoading || isDeliveryListLoading) {
        return <progress className="progress w-56"></progress>;
    }

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">My Delivery List: {deliveryList.length}</h1>
            <div className="overflow-x-auto">
                <table className="table-auto border-collapse border border-gray-300 w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Booked User's Name</th>
                            <th className="border border-gray-300 px-4 py-2">Receiver's Name</th>
                            <th className="border border-gray-300 px-4 py-2">User's Phone</th>
                            <th className="border border-gray-300 px-4 py-2">Requested Delivery Date</th>
                            <th className="border border-gray-300 px-4 py-2">Approximate Delivery Date</th>
                            <th className="border border-gray-300 px-4 py-2">Receiver's Phone</th>
                            <th className="border border-gray-300 px-4 py-2 max-w-[150px] whitespace-normal break-words">
                                Receiver's Address
                            </th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            deliveryList.map((parcel) => (
                                <tr key={parcel._id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2">{parcel.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{parcel.receiverName}</td>
                                    <td className="border border-gray-300 px-4 py-2">{parcel.phone}</td>
                                    <td className="border border-gray-300 px-4 py-2">{parcel.date}</td>
                                    <td className="border border-gray-300 px-4 py-2">{parcel.approximateDeliveryDate}</td>
                                    <td className="border border-gray-300 px-4 py-2">{parcel.receiverPhone}</td>
                                    <td className="border border-gray-300 px-4 py-2 max-w-[150px] whitespace-normal break-words">{parcel.address}</td>
                                    <td className="border border-gray-300 px-4 py-2 space-y-2">
                                        <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 w-full">
                                            View Location
                                        </button>
                                        <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 w-full"
                                            onClick={() => handleCancel(parcel._id)} >
                                            Cancel
                                        </button>
                                        <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700 w-full"
                                            onClick={() => handleDeliver(parcel._id)}>
                                            Deliver
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyDeliveryList;
