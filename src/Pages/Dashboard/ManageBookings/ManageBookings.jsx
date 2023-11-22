import React from 'react';
import useCart from '../../../hooks/useCart';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProviders';
import { FaCircleCheck } from 'react-icons/fa6';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageBookings = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: booking = [], refetch } = useQuery({
        queryKey: ['manage-bookings'],
        queryFn: async () => {
            const res = await axiosSecure('/manage-bookings');
            return res.data
        }
    })

    const handleDeleteBooking = (booking) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://food-hub-server-pi.vercel.app/manage-bookings/${booking._id}`, {
                    method: "DELETE"
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if(data.deletedCount>0){
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                         refetch()
                    }
                })
            
            }
          });
    }

    return (
        <div className='h-full my-10 md:px-10 w-full'>
            <div>
                <SectionTitle subHeading="---At a Glance---"
                    heading="manage bookings"></SectionTitle>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-orange-700 text-white'>
                            <tr>
                                <th>User Email</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Payment</th>
                                <th>Payment Time</th>
                                <th>Activity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                booking.map(booking => <tr key = {booking._id}>
                                <td>{booking.email}</td>
                                <td>{booking.name}</td>
                                <td>${booking.price}</td>
                                <td>{(booking?.status ==="payment_completed")? "Done" : "Pending"}</td>
                                <td>{(booking?.status ==="payment_completed")? booking.payment_date : "------"}</td>
                                <td className='text-3xl text-green-700'><FaCircleCheck></FaCircleCheck></td>
                                <td><button onClick={()=>handleDeleteBooking(booking)} className='text-orange-700 text-3xl'><FaTrashAlt></FaTrashAlt></button></td>
                            </tr> )
                            }
                            

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default ManageBookings;