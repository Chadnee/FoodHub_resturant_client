import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import { Link, useSearchParams } from 'react-router-dom';
import MenuItem from '../../../Shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/Usemenu';

const PopularMenu = () => {

    const [menu] = useMenu()
    const popular = menu.filter(item => item.category === 'popular');
   // const [menu, setMenu] = useState([]);
//
   // useEffect(() => {
   //     fetch('/public/menu.json')
   //         .then(res => res.json())
   //         .then(data => {
   //             const popularItems = data.filter(item => item.category === "popular")
   //             setMenu(popularItems)
   //         })
   // }, [])
    return (
        <div className='flex flex-col mx-3 items-center'>
            <SectionTitle
                subHeading="--Check it Out--"
                heading="From Our Menu"
            >
            </SectionTitle>

            <div className='grid md:grid-cols-2 lg:grid-cols-2 space-y-4 gap-2'>
                {
                    popular.map(item => <MenuItem
                        key={item._id} item={item}></MenuItem>)
                }
            </div>
            <Link to = "/order/salad"><button className='btn btn-outline uppercase  text-center mt-14 mb-7 mx-auto border-0 border-b-4 marker:'>view full menu</button></Link>
            <p className='bg-black text-white px-16 py-10 mt-10 mb-16 text-3xl'>Call us: +88 0195675787</p>

        </div>
    );
};

export default PopularMenu;