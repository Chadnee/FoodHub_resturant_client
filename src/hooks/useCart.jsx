import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProviders';
import useAxiosSecure from './UseAxiosSecure';

const useCart = () => {
    const {user, loading} = useContext(AuthContext);
  
    const [axiosSecure] = useAxiosSecure();
    //const token = localStorage.getItem('access-token')
    const {data: cart = [], refetch } = useQuery({
        queryKey: ['carts', user?.email],
        enabled:!loading,

      
        queryFn: async () => {
            const res = await axiosSecure(`/carts?email=${user?.email}`)
            console.log('res from axios', res)
            return res.data;
        },
        // queryFn: async () => {
        //   const res = await fetch(`http://localhost:5000/carts?email=${user?.email}` , { headers: {
        //      authorization: `bearer ${token}`
        //      }})
        //   return res.json();
        // }
      })
    
      return [cart, refetch]
};

export default useCart;

/**,
          {headers: {
            authorization: `bearer ${token}`
          }} */