import { useContext } from 'react';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Providers/AuthProviders';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';

const PaymentHistory = () => {
    const [axiosSecure] = useAxiosSecure();
    const {user} = useContext(AuthContext)

    const {data : paymentsAll = []} = useQuery({
        queryKey: ['payments-history'],
        queryFn: async() => {
            const res = await axiosSecure(`/payment-history/${user?.email}`);
            return res.data
        }
    })

    // const payments = paymentsAll.map(payment => {
    //     if(payment.email === user.email){
    //         return console.log('milece');
    //     }
    // })


    return (
        <div className='h-full w-full my-8 pl-20 pr-20'>
            <SectionTitle  subHeading="At a glance" heading="payment history"></SectionTitle>
            <div className="overflow-x-auto mt-16">
  <table className="table">
    {/* head */}
    <thead className='bg-orange-700 text-white' >
      <tr>
        <th>
          #
        </th>
        <th className='text-center'>Name</th>
        <th className='text-center'>Dish</th>
        <th className='text-center'>Category</th>
        <th className='text-center'>Date</th>
        <th className='text-center'>Price</th>
      </tr>
    </thead>
    <tbody>
       {paymentsAll.map((payments, index) => 
       <tr key = {payments._id}>
        <td>
          <label>
            {index + 1}
          </label>
        </td>
        <td className='text-center'>{payments.itemNames}</td>
        <td>
          <center>
          <div className="mask mask-squircle w-12 h-12">
                <img className='text-center' src={payments.itemImage} />
           </div>
          </center>
        </td>
        <td className='text-center'>{payments.category}</td>
        <td className='text-center'>{payments.date}</td>
        <td className='text-center'>{payments.price}</td>
      </tr>  ) }
      
    </tbody>
    
  </table>
</div>
            
        </div>
    );
};

export default PaymentHistory;