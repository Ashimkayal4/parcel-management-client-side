import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../../context/AuthProvider';
import Swal from 'sweetalert2';


const Login = () => {
    const { signInUser } = useContext(AuthContext);

    const handleSinIn = e => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(res => {
                console.log(res);
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Login successful",
                    showConfirmButton: false,
                    timer: 2000,
                });
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
                            <button className='flex gap-2 text-3xl w-full justify-center items-center border p-2 rounded-md hover:bg-gray-200'><FcGoogle /> Google</button>
                            <div className="divider mt-8">OR</div>
                        </div>
                        <form onSubmit={handleSinIn} className="card-body">
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
                            <h1 className='p-4'>Don't have an account ? <Link to='/register' className='text-red-600 font-bold'>Register</Link></h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;