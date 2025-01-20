import { Link } from "react-router-dom";
import error from '../../assets/error.webp'

const ErrorElement = () => {
    return (
        <div>
            <div className='flex flex-col justify-center items-center mt-4'>
                <h1 className='text-4xl'>Oops!</h1>
                <img src={error} className='rounded-md my-6' alt="" />
                <Link to='/'>
                    <button className='btn btn-outline'>Go Home</button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorElement;