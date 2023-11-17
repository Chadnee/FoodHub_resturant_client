import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProviders';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useCart from '../../../hooks/useCart';

const ItemFood = ({item}) => {
    const {name, image, price, recipe, _id, category} = item
    const {user} = useContext(AuthContext)
    const [, refetch] = useCart();

    const Navigate = useNavigate();
    const location = useLocation();

    const handleAddCart = (item) => {
        console.log(item)
        if(user){
            const orderItem = {menuItemId: _id , name, image, price, recipe, category, email: user.email, status: 'payment_pending', booking_time: new Date()}
            fetch("http://localhost:5000/carts", {
                method: "POST",
                headers: {
                    "content-type" : "application/json"
                },
                body: JSON.stringify(orderItem)
            })
            .then(res => res.json())
            .then(data => {
                if(data.insertedId){
                    refetch()
                    Swal.fire({
                        title: 'Food added to the cart',
                        showClass: {
                          popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                          popup: 'animate__animated animate__fadeOutUp'
                        }
                      })
                }
               })
        }
        else{
            Swal.fire({
                title: 'Please log in to order the food',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Navigate("/login", {state: {from:location}})
                }
              })
        }

    }
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={image} alt="Shoes" /></figure>
                <p className='absolute right-7 top-4 bg-black text-white px-4 pb-1'>${price}</p>
                <div className="card-body text-center ">
                    <h2 className=" text-2xl font-bold">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-center">
                        <button onClick={()=>handleAddCart(item)} className="btn mt-4 uppercase border-0 bg-gray-200 border-[#BB8506] text-center px-10 border-b-4  btn-outline text-[#BB8506]">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemFood;