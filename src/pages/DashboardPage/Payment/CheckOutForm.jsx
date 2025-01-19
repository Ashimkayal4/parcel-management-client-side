import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const CheckOutForm = () => {
    const [error, setError] = useState('')

    const [clientSecret, setClientSecret] = useState('')
    
    const stripe = useStripe();
    const elements = useElements();
    const selectParcel = useLoaderData();
    const { price } = selectParcel;
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', {price})
            .then(res => {
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure, price])



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {

            return;
        }

        const card = elements.getElement(CardElement)

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
           
            console.log('payment error', error)
            setError(error.message)
        }
        else {
            
            console.log('payment method', paymentMethod)
            setError('')
        }

        const {paymentIntent,error:confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent.status)
            
            if (paymentIntent.status === 'succeeded') {
                navigate('/dashboard/payment-success')
            }
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />

            <button className='btn btn-sm btn-primary my-5' type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className='text-red-500'>{error}</p>
        
        </form>
    );
};

export default CheckOutForm;