import React from 'react';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import useMenu from '../../../hooks/Usemenu';
import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';

const ManageItem = () => {

    const [menu, loading, refetch] = useMenu()
    const [axiosSecure] = useAxiosSecure();

    const handleDeleteItem = item => {
        Swal.fire({
            title: 'Are you sure to Delete the item?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                //   fetch(`http://localhost:5000/menu/${item._id}`, {
                //     method : "DELETE"
                //   })
                //   .then(res => res.json())
                //   .then(data => {
                //     console.log(data);
                axiosSecure.delete(`/menu/${item._id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            refetch();
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
        <div className='w-full md:py-20 px-10 h-full'>
            <SectionTitle subHeading="--Hurry Up--" heading="manage a item"></SectionTitle>

            <div className="overflow-x-auto ">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Dish Image</th>
                            <th>Dish Name</th>
                            <th>Price</th>
                            <th>Action</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menu.map((item, index) => <tr
                            key={item._id}>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteItem(item)} className="btn btn-ghost text-white bg-red-600"><FaTrashAlt></FaTrashAlt></button>
                            </td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageItem;