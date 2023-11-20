import { Swiper, SwiperSlide } from 'swiper/react';
import salad from '../../../assets/images/salad.jpg'
import soup from '../../../assets/images/soup.jpg'
import mutton from '../../../assets/images/mutton.jpg'
import pizza from '../../../assets/images/burger.jpg'
import burger from '../../../assets/images/pizza.jpg'
import './Category.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';


const Category = () => {
    return (
        <div>
            <SectionTitle 
            subHeading = {"--From 11.00am to 10pm--"}
            heading = {"Order Online"}>
                
            </SectionTitle>
        <div className='mx-10 my-6'>
          <Swiper
        slidesPerView={4}
        spaceBetween={10}
        autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
            <img className='h-72' src={soup} alt="" />
            <h3 className='font-extralight md:text-4xl lg:text-4xl uppercase text-center -mt-16 pb-4 text-white opacity-70'>Soup</h3>
            </SwiperSlide>
        <SwiperSlide>
            <img className='h-72' src={salad} alt="" />
            <h3 className='font-extralight md:text-4xl lg:text-4xl uppercase text-center -mt-16 text-white opacity-70'>salad</h3>
            </SwiperSlide>
        <SwiperSlide>
            <img className='h-72' src={mutton} alt="" />
            <h3 className='font-extralight md:text-4xl lg:text-4xl uppercase text-center -mt-16 text-white opacity-70'>mutton</h3>
            </SwiperSlide>
        <SwiperSlide>
            <img className='h-72' src={pizza} alt="" />
            <h3 className='md:text-4xl font-extralight lg:text-4xl uppercase text-center -mt-16 text-white opacity-70'>pizza</h3>
        </SwiperSlide>
        <SwiperSlide>
            <img className='h-72' src={burger} alt="" />
            <h3 className='md:text-4xl font-extralight lg:text-4xl uppercase text-center -mt-16 text-white opacity-70'>pizza</h3>
        </SwiperSlide>
        <SwiperSlide>
            <img className='h-72' src={salad} alt="" />
            <h3 className='md:text-4xl font-extralight lg:text-4xl uppercase text-center -mt-16 text-white opacity-70'>salad</h3>
            </SwiperSlide>
            <SwiperSlide>
            <img className='h-72' src={salad} alt="" />
            <h3 className='md:text-4xl font-extralight lg:text-4xl uppercase text-center -mt-16 text-white opacity-70'>salad</h3>
            </SwiperSlide>
        <SwiperSlide>
            <img className='h-72' src={mutton} alt="" />
            <h3 className='md:text-4xl font-extralight lg:text-4xl uppercase text-center -mt-16 text-white opacity-70'>mutton</h3>
            </SwiperSlide>
        <SwiperSlide></SwiperSlide>
       
        
      </Swiper>
        </div>
        </div>
    );
};

export default Category;