import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaCartPlus, FaCircleDollarToSlot, FaDollarSign, FaGoogleWallet, FaPersonMilitaryRifle, FaRedditAlien, FaStar, FaWallet, FaWarehouse } from "react-icons/fa6";
import img from "../../../assets/profile/flat-lay-plate-with-toast-face-shape-with-apple.jpg"
import { FaHome } from "react-icons/fa";
import { HiMenu, HiPhoneOutgoing } from "react-icons/hi";

const UserHome = () => {

    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const userEmail = user.email;

    //find booking data by tanstact query
    const { data: booking = [] } = useQuery({
        queryKey: ['booking-stats'],
        queryFn: async () => {
            const res = await axiosSecure('/booking-stats');
            return res.data;
        }
    })


    // const bookingCountForUser = booking.filter(booking.email === userEmail).map(booking =>booking.bookingCount)
    const bookingCountForUser = booking.map(booking => {
        if (booking.email === userEmail) {
            //if(booking.bookingCount>0)
            console.log(typeof(booking.bookingCount))
            return (booking.bookingCount);
        }
    })

    //find payments data by tanstack query

    const { data: payments = [] } = useQuery({
        queryKey: ['payment-stats'],
        queryFn: async () => {
            const res = await axiosSecure('/payment-stats')
            return res.data;
        }
    })
    const paymentsCount = payments.map(payment => {
        if (payment.email === userEmail) {
            console.log(typeof(payment.paymentsQuantity))
            return (payment.paymentsQuantity);
        }
    })
    const paymentsTotalPrice = payments.map(payment => {
        if (payment.email === userEmail) {
            return (payment.totalPrice) ;
        }
    })
    
    
    const order = bookingCountForUser+paymentsCount

    return (
        <div className="h-full w-full ml-28 m-10">
            <p className='text-3xl mb-16 uppercase font-[f]'>Hey, Welcome back !!</p>

            <div className="lg:flex mb-20 md:flex justify-center gap-6">

                <div className="stat flex justify-center  items-center bg-gradient-to-r from-purple-700 to-purple-100">
                    <div className=" text-white text-[70px]">
                    <HiMenu></HiMenu>
                    </div>
                    <div className="flex flex-col ">
                        <div className="stat-value text-white text-center">326</div>
                        <div className="stat-title text-white text-3xl font-bold">Products</div>
                    </div>
                </div>

                <div className="stat flex justify-center items-center bg-gradient-to-r from-[#D3A256] to-[#FDE8C0]">
                    <div className=" text-white text-[80px]">
                      <FaHome></FaHome>
                    </div>
                    <div className="flex flex-col ">
                        <div className="stat-value text-white text-4xl text-center">50</div>
                        <div className="stat-title text-3xl text-white font-bold">Shop</div>
                    </div>
                </div>

                <div className="stat flex justify-center items-center bg-gradient-to-r from-[#FE4880] to-[#FECDE9]">
                    <div className=" text-white text-[70px]">
                       <HiPhoneOutgoing></HiPhoneOutgoing>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="stat-value text-white text-5xl text-center">+088</div>
                        <div className="stat-title text-4xl text-white font-bold">Call</div>
                    </div>
                </div>

            </div>
            <div className="md:flex lg:flex w-full">
                <div className="bg-orange-200 border-r-4 border-x-orange-400 md:w-1/2 lg:w-1/2 flex flex-col items-center">
                  <img className="rounded-full mt-11 h-48 w-48" src={img} alt="" />
                  <p className="pt-6 font-serif">{user.displayName}</p>
                </div>
                <div className="bg-[#FEF9C3] md:w-1/2  lg:w-1/2 px-28 py-20">
                        <p className="uppercase font-bold font-serif md:text-[24px] lg:text-[24px] pb-5">your activities</p>
                        <p className=" flex items-center text-[17px] gap-2 text-[#0088FE] font-serif uppercase"><FaCartPlus></FaCartPlus>{`ORDERS:${order}`}</p>
                        <p className="flex items-center gap-2 text-[17px] text-[#00C4A1] font-[sans-serif uppercase"><FaStar></FaStar> Booking: {bookingCountForUser}</p>
                        <p className="flex items-center gap-2 text-[17px] text-[#FFBB28] font-[sans-serif uppercase"> <FaWarehouse></FaWarehouse>Paid: {paymentsCount}</p>
                        <p className="flex items-center gap-2 text-[17px] text-[#FF8042] font-[sans-serif uppercase"><FaCircleDollarToSlot></FaCircleDollarToSlot> payment: ${paymentsTotalPrice}</p>
                 </div>
            </div>


        </div>
    );
};

export default UserHome;