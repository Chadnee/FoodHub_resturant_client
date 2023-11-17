import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaBowlRice, FaCarSide, FaMoneyCheckDollar, FaUserLarge } from "react-icons/fa6";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid,  PieChart, Pie, ResponsiveContainer  } from 'recharts';

const AdminHome = () => {
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure('/admin-stats');
            return res.data;
        }

    })

    const { data: chartData = [] } = useQuery({
        queryKey: ['chart-data'],
        queryFn: async () => {
            const res = await axiosSecure('/order-stats');
            return res.data;
        }
    })
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    //pie-chart 
  



    // const customers = stats.find( customer => customer.users?.role!=="admin")
    // console.log(customers);
    return (
        <div className="h-full mt-10">
            <p className='text-3xl mb-20 uppercase font-[f]'>Hi, Welcome back</p>

            <div className="lg:flex mb-20 md:flex justify-center gap-4">

                <div className="stat flex justify-center  items-center bg-gradient-to-r from-purple-700 to-purple-100">
                    <div className=" text-white text-[90px]">
                        <FaMoneyCheckDollar></FaMoneyCheckDollar>
                    </div>
                    <div className="flex flex-col ">
                        <div className="stat-value text-white text-center">${stats.revenue}</div>
                        <div className="stat-title text-white font-bold">Revenue</div>
                    </div>
                </div>

                <div className="stat flex justify-center items-center bg-gradient-to-r from-[#D3A256] to-[#FDE8C0]">
                    <div className=" text-white text-[70px]">
                        <FaUserLarge></FaUserLarge>
                    </div>
                    <div className="flex flex-col ">
                        <div className="stat-value text-white text-center">{stats.users}</div>
                        <div className="stat-title text-white font-bold">Customers</div>
                    </div>
                </div>

                <div className="stat flex justify-center items-center bg-gradient-to-r from-[#FE4880] to-[#FECDE9]">
                    <div className=" text-white text-[70px]">
                        <FaBowlRice></FaBowlRice>
                    </div>
                    <div className="flex flex-col ">
                        <div className="stat-value text-white text-center">{stats.products}</div>
                        <div className="stat-title text-white font-bold">Menu Items</div>
                    </div>
                </div>

                <div className="stat flex justify-center items-center bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF]">
                    <div className=" text-white text-[70px]">
                        <FaCarSide></FaCarSide>
                    </div>
                    <div className="flex flex-col ">
                        <div className="stat-value text-white text-center">{stats.orders}</div>
                        <div className="stat-title text-white font-bold">Orders</div>
                    </div>
                </div>

            </div>

            <div className="flex justify-center">
                <div className="w-1/2">
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis chartDKey="category" />
                        <YAxis />
                        <Bar dataKey="total" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
               
            </div>
        </div>
    );
};


export default AdminHome;