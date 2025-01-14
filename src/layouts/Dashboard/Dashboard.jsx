import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="w-11/12 mx-auto flex">
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4 gap-5">
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/bookParcel">Book a parcel</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myParcel">My parcel</NavLink>
                    </li>
                    <li><NavLink to="/dashboard/myProfile">My profile</NavLink></li>
                </ul>
            </div>

            <div className="flex-1">
                <Outlet></Outlet>
            </div>
            
        </div>
    );
};

export default Dashboard;