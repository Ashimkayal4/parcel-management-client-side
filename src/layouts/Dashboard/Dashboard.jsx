import { useEffect } from "react";
import { BsBoxSeamFill } from "react-icons/bs";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaBox, FaHome, FaListUl, FaUserCircle, FaUsers } from "react-icons/fa";
import { FcRating, FcStatistics } from "react-icons/fc";
import { MdAddChart } from "react-icons/md";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useDeliveryMen from "../../hooks/useDeliveryMen";

const Dashboard = () => {
    const [isAdmin] = useAdmin();

    const [isDeliveryMen] = useDeliveryMen();
    
    const navigate = useNavigate();

    useEffect(() => {
        if (isAdmin) {
            navigate("/dashboard/adminHome/statistic");
        } else if (isDeliveryMen) {
            navigate("/dashboard/deliverHome/myDeliveryList");
        } else {
            navigate("/dashboard/usersHome/myProfile");
        }
    }, [isAdmin, isDeliveryMen, navigate]);

    return (
        <div className="w-11/12 mx-auto flex">
            <div className="w-64 min-h-screen bg-orange-400">
                {isAdmin && (
                    <ul className="menu p-4 gap-5">
                        <li>
                            <NavLink to="/dashboard/adminHome/statistic">
                                <FcStatistics /> Statistic
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/adminHome/allParcel">
                                <FaBox /> All parcel
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/adminHome/allDeliveryMen">
                                <CiDeliveryTruck /> All delivery men
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/adminHome/allUsers">
                                <FaUsers /> All users
                            </NavLink>
                        </li>
                        <div className="divider"></div>
                        <li>
                            <NavLink to="/">
                                <FaHome /> Home
                            </NavLink>
                        </li>
                    </ul>
                )}

                {isDeliveryMen && !isAdmin && (
                    <ul className="menu p-4 gap-5">
                        <li>
                            <NavLink to="/dashboard/deliverHome/myDeliveryList">
                                <FaListUl /> My delivery list
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/deliveryHome/myReviews">
                                <FcRating /> My reviews
                            </NavLink>
                        </li>
                        <div className="divider"></div>
                        <li>
                            <NavLink to="/">
                                <FaHome /> Home
                            </NavLink>
                        </li>
                    </ul>
                )}

                {!isAdmin && !isDeliveryMen && (
                    <ul className="menu p-4 gap-5">
                        <li>
                            <NavLink to="/dashboard/usersHome/bookParcel">
                                <MdAddChart /> Book a parcel
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/usersHome/myParcel">
                                <BsBoxSeamFill /> My parcel
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/usersHome/myProfile">
                                <FaUserCircle /> My profile
                            </NavLink>
                        </li>
                        <div className="divider"></div>
                        <li>
                            <NavLink to="/">
                                <FaHome /> Home
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>

            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
