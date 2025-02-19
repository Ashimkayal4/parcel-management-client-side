import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://y-omega-inky.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;