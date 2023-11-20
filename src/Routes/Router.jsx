import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../Pages/Home/Home/Home';
import Menu from '../Pages/Menu/Menu/Menu';
import Order from '../Pages/Order/Order/Order';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../Layout/Dashboard';
import MyCart from '../Pages/Dashboard/myCart';
import AllUser from '../Pages/Dashboard/AllUser/AllUser';
import AddItem from '../Pages/Dashboard/AddItem/AddItem';
import AdminRoute from './AdminRoute';
import ManageItem from '../Pages/Dashboard/ManageItem/ManageItem';
import MyPayment from '../Pages/Dashboard/MyPayment/MyPayment';
import UserHome from '../Pages/Dashboard/UserHome/UserHome';
import AdminHome from '../Pages/Dashboard/AdminHome/AdminHome';
import PaymentHistory from '../Pages/Dashboard/PaymentHistory/PaymentHistory';
import ManageBookings from '../Pages/Dashboard/ManageBookings/ManageBookings';
import Review from '../Pages/Dashboard/Review/Review';

export const Router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: 'menu',
            element: <Menu></Menu>
        },
        {
            path: 'order/:category',
            element: <Order></Order>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'register',
          element: <Register></Register>
        }
      ]
    },
    {
      path: "dashboard",
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        {
          path: "userHome",
          element:<UserHome></UserHome>
        },
        { 
          path: "review",
          element:<Review></Review>
        },
        {
          path:"myCart",
          element:<MyCart></MyCart>
        },
        {
          path: "myPayment/:id",
          element:<MyPayment></MyPayment>,
          loader: ({params}) => fetch(`https://food-hub-server-pi.vercel.app/carts/myPayment/${params.id}`)
        },
        {
          path: "paymentHistory",
          element:<PaymentHistory></PaymentHistory>
        },
        {
          path: "adminHome",
          element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
         {
          path:"addItems",
          element:<AdminRoute><AddItem></AddItem></AdminRoute>
        },
        {
          path:"manageItems",
          element:<AdminRoute> <ManageItem></ManageItem></AdminRoute>
        },
        {
          path:"manageBookings",
          element:<AdminRoute><ManageBookings></ManageBookings></AdminRoute>
          
        },
        {
          path: "allUsers",
          element:<AdminRoute><AllUser></AllUser></AdminRoute>
        },
       
      ]
    }
  ]);

