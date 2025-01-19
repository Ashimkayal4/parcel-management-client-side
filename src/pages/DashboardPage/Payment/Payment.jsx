import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_key)
const Payment = () => {
    return (
        <div className="w-10/12 mx-auto mt-3">
            <div className="flex items-center justify-center mb-5">
                <h1 className="text-3xl font-semibold">Payment for your parcel</h1>
            </div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;