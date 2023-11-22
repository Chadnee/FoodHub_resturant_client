import React from 'react';
import useCart from '../../hooks/useCart';
import { FaCcAmazonPay, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import MyPayment from './MyPayment/MyPayment';
import SectionTitle from '../../Shared/SectionTitle/SectionTitle';


const MyCart = () => {
     const [cart, refetch] = useCart()
     console.log(cart)
     const pendingCart = cart?.filter(carts =>(carts?.status === "payment_pending"))
     console.log(pendingCart.length)
     const total = pendingCart.reduce((sum, item)=> item.price+sum, 0);
     const handleDelete = raw =>{
        console.log(raw)
        Swal.fire({
            title: 'Are you sure to delete the order?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          })
          .then((result) => {
            if (result.isConfirmed) {
              fetch(`https://food-hub-server-pi.vercel.app/carts/${raw._id}`, {
                method: "DELETE",
            })
            .then(res => res.json())
            .then(data => {
                if(data.deletedCount>0){
                    refetch()
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                }
            })
            }
          })
     }
    
     return (
        <div className='w-full h-full my-7 md:px-14'>
          <SectionTitle subHeading="All are pending" heading=" my cart"></SectionTitle>
            <div className='pb-8 font-bold  flex justify-between'>
                <p>Total Order: {cart? (cart.filter(raw => raw.status === 'payment_pending').length) : 0}</p>
                <p>Payment pending: ${total}</p>
            </div>
            <div className="overflow-x-auto">
  <table className="table table-zebra w-full">
    {/* head */}
    <thead className='bg-orange-700 text-white'>
      <tr>
        <th>
          Booking_time: {}
        </th>
        <th>Dish</th>
        <th>Item name</th>
        <th>Price</th>
        <th>Action</th>
        <th>Pay</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      
      {cart.map(raw => {if(raw.status === 'payment_pending') return <tr className='space-x-8'
      key = {raw._id}>
        <td>
          {raw.booking_time}
        </td>
        <td className=''>
          <div className="flex items-center space-x-3">
              <div className="mask mask-squircle w-12 h-12">
                <img src={raw.image} alt="" />
              </div>
          </div>
        </td>
        <td>
          <p>{raw.name}</p>
        </td>
        <td>{raw.price}</td>
        <td>
          <button onClick={()=>handleDelete(raw)} className="btn btn-ghost text-[20px] bg-orange-600 text-white"><FaTrashAlt></FaTrashAlt></button>
        </td>
        <td> 
          <Link to = {`/dashboard/myPayment/${raw._id}`} className='text-[50px]'><FaCcAmazonPay></FaCcAmazonPay></Link>
        </td>
      </tr>}  
     )}
    </tbody>
  </table>
</div>

        </div>
    );
};

export default MyCart;