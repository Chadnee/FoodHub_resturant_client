import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import About from '../About/About';
import PopularMenu from '../PopularMenu/PopularMenu';
import Featured from '../Featured/Featured';
import Testimulials from '../Testimonials/Testimulials';
import CardProduct from '../CardProduct/CardProduct';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
             <Helmet>
                <title className="text-orange-600">FOOD-HUB | Home</title>
            </Helmet>
           <Banner></Banner>
           <Category></Category>
           <About></About>
           <PopularMenu></PopularMenu>
           <Featured></Featured>
           <Testimulials></Testimulials>
           <CardProduct></CardProduct>
        </div>
    );
};

export default Home;