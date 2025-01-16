import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useDeliveryMen = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();


    const { data: isDeliveryMen, isPending: isDeliveryMenLoading } = useQuery({
        queryKey: [user?.email, 'isDeliveryMen'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/deliveryMen/${user.email}`);
            return res.data?.deliveryMen;
        }
    })
    return [isDeliveryMen, isDeliveryMenLoading]
};

export default useDeliveryMen;