import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const BookParcel = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()
    
    const [price, setPrice] = useState(0);
    const { user } = useAuth();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const parcelWeight = watch("parcelWeight");

    // Automatically calculate price based on parcel weight
    useEffect(() => {
        const weight = parseFloat(parcelWeight);
        if (weight === 1) {
            setPrice(50);
        } else if (weight === 2) {
            setPrice(100);
        } else if (weight > 2) {
            setPrice(150);
        } else {
            setPrice(0);
        }
    }, [parcelWeight]);

    const onSubmit = (data) => {
        const parcelInfo = {
            name: user.displayName,
            email: user.email,
            phone: data.phoneNumber,
            type: data.parcelType,
            weight: data.parcelWeight,
            receiverName: data.receiverName,
            receiverPhone: data.receiverPhone,
            address: data.deliveryAddress,
            date: data.deliveryDate,
            addressLatitude: data.latitude,
            addressLongitude: data.longitude,
            price: price

        }

        axiosSecure.post('/parcels', parcelInfo)
            .then(() => {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "parcel added successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
              
            })

    };

    return (
        <div>
            <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
                <h1 className="text-4xl flex justify-center mt-4">Book a Parcel</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body grid grid-cols-2">
                    {/* User Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            defaultValue={user?.displayName}
                            readOnly
                            className="input input-bordered"
                        />
                    </div>

                    {/* User Email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            defaultValue={user?.email}
                            readOnly
                            className="input input-bordered"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input
                            type="text"
                            {...register("phoneNumber", { required: true })}
                            placeholder="Phone Number"
                            className="input input-bordered"
                        />
                        {errors.phoneNumber && (
                            <span className="text-red-500">Phone number is required</span>
                        )}
                    </div>

                    {/* Parcel Type */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Parcel Type</span>
                        </label>
                        <input
                            type="text"
                            {...register("parcelType", { required: true })}
                            placeholder="Parcel Type"
                            className="input input-bordered"
                        />
                        {errors.parcelType && (
                            <span className="text-red-500">Parcel type is required</span>
                        )}
                    </div>

                    {/* Parcel Weight */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Parcel Weight (kg)</span>
                        </label>
                        <input
                            type="number"
                            {...register("parcelWeight", { required: true, min: 1 })}
                            placeholder="Parcel Weight"
                            className="input input-bordered"
                        />
                        {errors.parcelWeight && (
                            <span className="text-red-500">Valid parcel weight is required</span>
                        )}
                    </div>

                    {/* Receiver's Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Receiver's Name</span>
                        </label>
                        <input
                            type="text"
                            {...register("receiverName", { required: true })}
                            placeholder="Receiver's Name"
                            className="input input-bordered"
                        />
                        {errors.receiverName && (
                            <span className="text-red-500">Receiver's name is required</span>
                        )}
                    </div>

                    {/* Receiver's Phone Number */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Receiver's Phone Number</span>
                        </label>
                        <input
                            type="text"
                            {...register("receiverPhone", {
                                required: true,
                                pattern: /^[0-9]{11}$/,
                            })}
                            placeholder="Receiver's Phone Number"
                            className="input input-bordered"
                        />
                        {errors.receiverPhone && (
                            <span className="text-red-500">Valid phone number is required</span>
                        )}
                    </div>

                    {/* Delivery Address */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Delivery Address</span>
                        </label>
                        <input
                            type="text"
                            {...register("deliveryAddress", { required: true })}
                            placeholder="Delivery Address"
                            className="input input-bordered"
                        />
                        {errors.deliveryAddress && (
                            <span className="text-red-500">Delivery address is required</span>
                        )}
                    </div>

                    {/* Requested Delivery Date */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Requested Delivery Date</span>
                        </label>
                        <input
                            type="date"
                            {...register("deliveryDate", { required: true })}
                            className="input input-bordered"
                        />
                        {errors.deliveryDate && (
                            <span className="text-red-500">Delivery date is required</span>
                        )}
                    </div>

                    {/* Delivery Address Latitude */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Delivery Address Latitude</span>
                        </label>
                        <input
                            type="text"
                            {...register("latitude", { required: true })}
                            placeholder="Latitude"
                            className="input input-bordered"
                        />
                        {errors.latitude && (
                            <span className="text-red-500">Latitude is required</span>
                        )}
                    </div>

                    {/* Delivery Address Longitude */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Delivery Address Longitude</span>
                        </label>
                        <input
                            type="text"
                            {...register("longitude", { required: true })}
                            placeholder="Longitude"
                            className="input input-bordered"
                        />
                        {errors.longitude && (
                            <span className="text-red-500">Longitude is required</span>
                        )}
                    </div>

                    {/* Price */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input
                            type="text"
                            value={price}
                            readOnly
                            className="input input-bordered"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-6 col-span-2">
                        <button type="submit" className="btn btn-primary">
                            Book Parcel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookParcel;
