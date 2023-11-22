import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import useCart from '../../../hooks/useCart';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CheckOut = ({ _id, menuItemId, name, image, recipe, price, category }) => {
  const [refetch] = useCart();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('')

  // Create a new Date object
  const currentDate = new Date();

  // Get day, month, and year
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Note: Months are zero-based, so we add 1
  const year = currentDate.getFullYear();

  // Format the date as "day/month/year"
  const formatedDate = day + '/' + month + '/' + year;

  useEffect(() => {
    console.log(price);
    axiosSecure.post('/create-payment-intent', { price })
      .then(res => {
        console.log(res.data.clientSecret)
        setClientSecret(res.data.clientSecret);
      })
  }, [price, axiosSecure])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    })
    if (error) {
      console.log('error', error)
      setCardError(error.message)
    }
    else {
      setCardError("")
      console.log('payment method', paymentMethod)
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous"
          },
        },
      },
    );

    if (confirmError) {
      console.log(confirmError)
    }
    console.log('payment-intent', paymentIntent)
    setProcessing(false);
    if (paymentIntent.status === 'succeeded') {
      setTransactionId(paymentIntent.id)
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,

        quantity: 1,
        date: formatedDate,
        //date: new Date(),
        items: _id,
        itemNames: name,
        itemImage: image,
        menuItems: menuItemId,
        category: category,
        status: "service pending",

      }
      axiosSecure.post(`/payments/${_id}`, payment)
        .then(res => {
          console.log(res.data);
          if (res.data.insertedId) {
            console.log("data is inserted")
            
            Swal.fire({
              icon: "success",
              title: "Your payment has been success & see your activity",
              showConfirmButton: false,
              timer: 1500
            });
            navigate('/dashboard/userHome')
          }
        })
    }
  }
  return (
    <div className='flex flex-col  m-20'>
      <form onSubmit={handleSubmit}>
        <CardElement
          className='mb-20'
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
        <div className='text-center'>
          <button className=' btn btn-sm btn-primary px-10' type="submit" disabled={!stripe || !clientSecret || processing}>
            Pay
          </button>
        </div>
      </form>
      {cardError && <p className='text-orange-700'>{cardError}</p>}
      {transactionId && <p className='text-green-500'> Transaction complete with transactionId: {transactionId}</p>}

    </div>
  );
};

export default CheckOut;