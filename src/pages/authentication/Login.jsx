import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';


const Login = () => {
    const { signInUser, googleSignIn, setUser } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSinIn = e => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(res => {
                setUser(res.user);
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Login successful",
                    showConfirmButton: false,
                    timer: 2000,
                });

                navigate(from, { replace: true });
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(res => {
                setUser(res.user)

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
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className='px-5 pt-5'>
                            <button onClick={handleGoogleLogin} className='text-3xl w-full btn btn-outline'><FcGoogle /> Google</button>

                            <div className="divider mt-5">or</div>
                        </div>
                        <form onSubmit={handleSinIn} className="px-6">
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
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <div>
                            <h1 className='pb-4 px-4'>Don't have an account ? <Link to='/register' className='text-red-600 font-bold'>Register</Link></h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;