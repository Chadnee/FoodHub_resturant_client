import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckOut from '../CheckOut/CheckOut';
import useCart from '../../../hooks/useCart';
import { useLoaderData } from 'react-router-dom';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const MyPayment = () => {
    const order = useLoaderData();
    const { _id, menuItemId, name, image, recipe, price, category} = order
    

    //const [cart] = useCart();
    //const price = cart.map(carts => carts.price)
    
    //const total = cart.reduce((sum, item) => sum + item.price, 0)
    //const price = parseFloat(total.toFixed(2))
    
    return (
        <div className='w-full my-32 mx-20 h-full'>
            <h3 className='text-4xl text-center uppercase text-[#eaba4a]'>Payment</h3>
             <Elements stripe={stripePromise}>
                <CheckOut _id = {_id}  menuItemId = {menuItemId} name = {name} image = {image} 
                recipe = {recipe} price = {price} category = {category}></CheckOut>
             </Elements>
             
        
        </div>
    );
};

export default MyPayment;