import { Link, NavLink } from "react-router-dom";
import logo from '../assets/images.jpg'
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { IoNotificationsSharp } from "react-icons/io5";

const Navbar = () => {
    const { user, signOutUser, setUser } = useContext(AuthContext);

    const logOut = () => {
        signOutUser()
            .then(res => {
                Swal.fire({
                    position: "top-center",
                    icon: "error",
                    title: "LogOut successful",
                    showConfirmButton: false,
                    timer: 2000,
                });
                setUser(res.user);
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div>
            <div className="navbar bg-base-100 justify-between">
                <div className="">
                    <img className="w-10 h-10 rounded-full" src={logo} alt="" />
                    <h1 className="text-xl ml-2">DropZone</h1>
                </div>
                <div>
                    <Link to='/'><h1 className=" p-2 hover:bg-slate-200 rounded-md font-semibold">Home</h1></Link>
                </div>
                <div>
                    <h1 className="text-2xl"><IoNotificationsSharp/></h1>
                </div>
                <div>

                    {
                        !user && <Link to="/login"><button className="btn">Login</button></Link>
                    }

                </div>
                
                {
                    user && <div className="flex-none gap-2">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <a>Profile</a>
                                </li>
                                <li><NavLink to="/dashboard">Dashboard</NavLink></li>

                                <li><button onClick={logOut}>LogOut</button></li>

                            </ul>
                        </div>
                    </div>
              }
            </div>
        </div>
    );
};

export default Navbar;