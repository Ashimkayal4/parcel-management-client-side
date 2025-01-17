import { FcGoogle } from 'react-icons/fc';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import Lottie from 'lottie-react';
import registerLottie from '../../assets/lottie/register.json'

const Register = () => {
    const { createUser, googleSignIn, setUser, updatePro, user } = useAuth();

    const axiosPublic = useAxiosPublic()

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleCreateUser = e => {
        e.preventDefault()
        const form = e.target
        const photo = form.photo.value
        const name = form.name.value;
        const phone = form.phone.value;
        const email = form.email.value
        const password = form.password.value;
        const role = form.role.value;

        createUser(email, password)
            .then(res => {
                const newUser = res.user;
                updatePro({ displayName: name, photoURL: photo })
                    .then(() => {
                        const userInfo = {
                            name,
                            email,
                            photo,
                            phone,
                            role
                        }

                        axiosPublic.post('/users', userInfo)
                            .then(() => {
                                setUser({ ...newUser, displayName: name, photoURL: photo })
                                Swal.fire({
                                    position: "top-center",
                                    icon: "success",
                                    title: "Registration successful",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                navigate(location?.state ? location.state : '/')
                            })

                    })
                    .catch(err => {
                        console.log(err)
                    })

            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(res => {
                setUser(res.user);

                const loggedInUser = res.user;
                const userInfo = {
                    name: loggedInUser.displayName,
                    email: loggedInUser.email,
                    photo: loggedInUser.photoURL,
                    role: 'user',
                };

                axiosPublic.post('/users', userInfo)
                    .then(() => {
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: "Login successful",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        navigate(from, { replace: true });
                })
                
            
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                      
                      
                        <Lottie animationData={registerLottie}></Lottie>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className='px-5 pt-5'>
                            <button onClick={handleGoogleLogin} className='text-3xl w-full btn btn-outline'><FcGoogle /> Google</button>
                            
                            <div className="divider mt-5">or</div>
                        </div>
                        <form onSubmit={handleCreateUser} className="px-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="name" name='name' className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" name='photo' placeholder="photo url" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Role</span>
                                </label>
                                <select name="role" className="input input-bordered">
                                    <option value="user">user</option>
                                    <option value="deliveryMen">delivery Man</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone Number</span>
                                </label>
                                <input type="text" name='phone' placeholder="phone" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                        </form>
                        <div>
                            <h1 className='pb-4 px-4'>Already have an account ? <Link to='/login' className='text-red-600 font-bold'>Login</Link></h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;