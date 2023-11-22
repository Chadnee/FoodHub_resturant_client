
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProviders';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './UseAxiosSecure';

const useAdmin = () => {

    const {user, loading} = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure();

    const {data: isAdmin, isLoading: isAdminLoading} = useQuery({
        queryKey:["isAdmin", user?.email],
        enabled: !loading,
        queryFn: async () =>{
            const res = await axiosSecure.get(`/users/admin/${user.email}` )
            console.log("is admin response",  res.data.admin)
            return res.data.admin
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;

// import { useContext } from "react";
// import { ContexM } from "../Authentication/AuProvider";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "./useAxiosSecure";
// import useAuth from "./useAuth";

// const useAdmin = () => {

//     const { user } = useAuth();

//     const [axiosSecure] = useAxiosSecure()

//     const { data: isAdmin ,isLoading:isAdminLoding} = useQuery({
//         queryKey: ['isAdmin', user?.email],
//         // fnc
//         queryFn: async () => {


//             // fetch(https://server-nine-ecru.vercel.app/user/admin/${user.email})

//             const res = await axiosSecure.get(user/admin/${user.email});

//             return res.data.admin
//         }

//     })
    
//     return  [isAdmin,isAdminLoding]


// };

// export default useAdmin;