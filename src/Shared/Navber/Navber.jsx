
import img from '../../assets/images/restaurant.png'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import { FaClipboardList, FaHome, FaShoppingCart, FaSignal } from 'react-icons/fa';
import useCart from '../../hooks/useCart';
import { FaBowlFood, FaChartSimple } from 'react-icons/fa6';
import useAdmin from '../../hooks/useAdmin';
const Navber = () => {


  const { user, logOut } = useContext(AuthContext)
  const [cart] = useCart();
  const [isAdmin] = useAdmin();

  const handleLogout = () => {
    logOut()
      .then(() => { })
      .catch(error => console.log(error))
  }
  const navList = <>
    <li className='text-white font-semibold'><Link to="/"><FaHome></FaHome>Home</Link></li>
    <li className='text-white font-semibold'><Link to="/menu"><FaBowlFood></FaBowlFood>Our Menu</Link></li>
    <li className='text-white font-semibold'><Link to="/order/salad"><FaClipboardList></FaClipboardList>Order Food</Link></li>
    {isAdmin ?
      <li className='text-white font-semibold'><Link to='/dashboard/adminHome'><FaClipboardList></FaClipboardList>Dashboard</Link></li>
      : <div className='flex '>
        <li className='text-white font-semibold'><Link to='/dashboard/userHome'><FaClipboardList></FaClipboardList>Dashboard</Link></li>
        <li className='text-white font-semibold'>
          <Link to="/dashboard/myCart" >

            <div className="badge badge-primary"><FaShoppingCart></FaShoppingCart>
              +{cart ? (cart.filter(raw => raw.status === 'payment_pending').length)
                : (0)}
            </div>

          </Link>
        </li>
      </div>
    }
    {
      user ?
        <div className='md:flex '>
          <li className='text-white font-semibold text-center ps-1'> <Link>{user.displayName}</Link></li>
          <button onClick={handleLogout} className="btn px-2 btn-sm ml-3">Sign out</button>
        </div> :
        <div className='md:flex'>
          <li className='text-white font-semibold'><Link to='/login'><FaSignal></FaSignal>Login</Link></li>
          <li className='text-white font-semibold'><Link to='/register'><FaChartSimple></FaChartSimple>Register</Link></li>
        </div>
    }


  </>
  return (
    <div>
      <div className="navbar z-10  fixed max-w-screen-xl  bg-black bg-opacity-40">
        <div className="navbar-start">
          <div className="dropdown text-white">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm  dropdown-content mt-3 z-[1] p-2 shadow bg-orange-700 rounded-box w-52">
              {navList}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl"><span className='text-orange-700'>Food<span className='text-white font-bold'>H</span>ub</span> <img className='h-5' src={img} alt="" /></a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navList}
          </ul>
        </div>
        <div className="navbar-end">
          
        </div>
      </div>
    </div>
  );
};

export default Navber;