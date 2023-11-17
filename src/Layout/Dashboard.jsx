import React from 'react';
import { FaCalendarTimes, FaHome, FaShoppingCart, FaWallet, FaClipboardList, FaBowlingBall, FaUtensils, FaBook, FaUser, FaAlignJustify } from 'react-icons/fa';
import { FaBowlFood } from "react-icons/fa6";
import { Link, Outlet } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
    const [cart] = useCart()

   // const isAdmin = true;
   const [isAdmin] = useAdmin();

    return (
        <div>
            <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col justify-center">
  <label htmlFor="my-drawer-2" className="text-white w-full bg-amber-700 ps-3 text-2xl py-2 rounded-lg drawer-button lg:hidden"><FaAlignJustify></FaAlignJustify></label>
  <Outlet></Outlet>
    
    
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 min-h-full font-semibold bg-orange-700 text-white">
      {/* Sidebar content here */}
      {isAdmin? <div>
        <li className='uppercase'> <Link to="/dashboard/Adminhome"><FaHome></FaHome>Admin Home</Link></li>
      <li className='uppercase'> <Link to="/dashboard/addItems"><FaUtensils></FaUtensils> add Items</Link></li>
      <li className='uppercase'> <Link to="/dashboard/manageItems"><FaWallet></FaWallet>Manage items</Link></li>
      <li className='uppercase'> <Link to="/dashboard/manageBookings" ><FaBook></FaBook> Manage bookings</Link></li>
      <li className='uppercase'> <Link to="/dashboard/allUsers" ><FaUser></FaUser>All USERS</Link></li>
      </div> : 
      <div>
        <li> <Link to="/dashboard/userHome"><FaHome></FaHome>User Home</Link></li>
      <li> <Link to="/dashboard/review"><FaCalendarTimes></FaCalendarTimes>Review</Link></li>
      <li> <Link to="/dashboard/paymentHistory"><FaCalendarTimes></FaCalendarTimes>Payment History</Link></li>
      <li> <Link to="/dashboard/myCart" ><FaShoppingCart></FaShoppingCart>My Cart <span className="ml-0 badge badge-primary"><FaShoppingCart></FaShoppingCart>
         +{cart? (cart.filter(raw => raw.status === 'payment_pending').length)
         : (+0)}</span></Link></li>
      </div>}
      <div className="divider "></div>
     <li> <Link to = "/"><FaHome></FaHome>Home</Link></li>
      <li> <Link to = "/menu"><FaBowlFood></FaBowlFood>Menu</Link></li>
      <li> <Link to = "/order/salad"><FaClipboardList></FaClipboardList>Order Food</Link></li>
    </ul>
  
  </div>
</div>
        </div>
    );
};

export default Dashboard;