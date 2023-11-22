import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';

const AllUser = () => {

    const [axiosSecure] = useAxiosSecure()
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get("/users")
        return res.data;

    })
    // const admin = users.map(user =>{if (user?.role === "admin")  console.log(user.length)})
    // console.log(admin)

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: `Do you want to make admin to ${user.name}?`,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Make'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(user._id)
                fetch(`https://food-hub-server-pi.vercel.app/users/admin/${user._id}`, {
                    method: "PATCH"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.modifiedCount) {
                            refetch()
                            Swal.fire(
                                `Yes, ${user.name} is an Admin Now`,
                            )
                        }
                    })

            }
        })




    }

    const handleDeleteAction = (user) => {

        Swal.fire({
            title: "Are you sure to delete?",
            text: "You will not be able to revert this!",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(user._id)
                fetch(`https://food-hub-server-pi.vercel.app/users/admin/${user._id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
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
        <div className='w-full px-7 mt-7 md:px-14 '>
            <SectionTitle subHeading="At a Glance" heading="All Users"></SectionTitle>
            {/* <p className=' font-bold  pt-5'>Total User: {users.length}</p> */}
            {/* <p className=' font-bold pb-5'>Admin: {users.filter(user => (user?.role === "admin").length)}</p> */}

            <div className="overflow-x-auto ">
                <table className="table mt-4">
                    {/* head */}
                    <thead className='bg-orange-700 text-white'>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => <tr
                            key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role === "admin" ? "admin" : <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost text-white bg-orange-600">
                                <FaUserShield></FaUserShield>
                            </button>}</td>
                            <td>
                                <button onClick={() => handleDeleteAction(user)} className="btn btn-ghost text-white bg-red-600"><FaTrashAlt></FaTrashAlt></button>
                            </td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;