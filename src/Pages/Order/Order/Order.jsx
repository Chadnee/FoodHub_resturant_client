import React, { useState } from 'react';
import coverOrder from "../../../assets/shop/banner2.jpg"
import { Parallax } from 'react-parallax';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../hooks/Usemenu';
import FoodOrder from './FoodOrder';
import { useParams } from 'react-router-dom';

const Order = () => {
    //snFWkm2ytCTOecHK
    //food-hub

    const categories = ['salad', 'pizza', 'soup', 'dessert']
    const {category} = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);

    const [menu] = useMenu();
   
    console.log(category);

    const desserts = menu.filter(item => item.category === "dessert")
    const pizza = menu.filter(item => item.category === "pizza")
    const salad = menu.filter(item => item.category === "salad")
    const soup = menu.filter(item => item.category === "soup")
    return (
        <div>
            <Parallax
                bgImage={coverOrder}
                bgImageAlt="our shop"
                strength={-200}
                className='mb-12'
            >
                <div className="hero h-[500px]">
                    <div className="hero-overlay "></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md bg-black bg-opacity-40 py-8 px-24">
                            <h1 className="mb-5 text-white uppercase text-5xl font-bold">Our shop</h1>
                            <p className="mb-5">Quaerat fugiat ut assumenda.</p>

                        </div>
                    </div>
                </div>
            </Parallax>

            <Tabs className="mb-10" defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList className="mt-10 mb-7 items-center mx-auto flex justify-center gap-4 font-serif uppercase">
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soups</Tab>
                    <Tab>Desserts</Tab>
                </TabList>
                <TabPanel><FoodOrder items={salad}></FoodOrder></TabPanel>
                <TabPanel><FoodOrder items={pizza}></FoodOrder></TabPanel>
                <TabPanel><FoodOrder items={soup}></FoodOrder></TabPanel>
                <TabPanel><FoodOrder items={desserts}></FoodOrder></TabPanel>
                </Tabs>
            
        </div>
    );
};

export default Order;