import { useEffect, useState } from 'react';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import { Rating } from '@smastrom/react-rating'


import '@smastrom/react-rating/style.css'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

const Testimulials = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
      fetch("http://localhost:5000/review")
       .then(res => res.json())
       .then(data => setReviews(data))
    }, [])
    return (
        <div className='my-20'>
            <SectionTitle
            subHeading= "--What Our Client Say--"
            heading= "testimonials"
            ></SectionTitle>

<>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {
            reviews.map(review =>  <SwiperSlide
            key = {review._id}>
                
                <div className='flex flex-col items-center  my-7 mx-24'>
                
                <Rating
                      style = {{maxWidth:180}}
                      value= {review.rating}
                      readOnly
                    />
                    
                    <p className='pt-8 pb-4 text-center'>{review.details}</p>
                    <h3 className='text-amber-400 text-2xl'>{review.name}</h3>
                </div>
            </SwiperSlide>)
        }
      </Swiper>
    </>
        </div>
    );
};

export default Testimulials;