import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import moment from 'moment';
import img1 from '../../../assets/images/soup.jpg'
import './Featured.css'
const Featured = () => {
    return (
        <div className='back-img flex flex-col items-center text-white bg-fixed my-10 pt-10 pb-14'>
            <SectionTitle
            subHeading="--Check it Out"
            heading="from our menu">
             </SectionTitle>
             <div className='w-2/3 mx-auto mb-8 md:flex md:justify-center justify-start py-8 md:px-16 lg:px-16 items-center gap-8'>
               <img className='w-[320px] border-white h-[250px]' src={img1} alt="" />
               <div>
                <p>{moment().format('MMMM D, YYYY,')};</p>
                <p className='uppercase'>How Much Items Do You Get?</p>
                <p className='text-sm'>We made a comprehensive list of fine dining restaurants in Dhaka City by checking Google Maps and other sources so you don’t have to! We gathered all the results in one place and ranked</p>
               <button className='btn bg-black text-white mt-4 ml-0 '>Order Now</button>
               </div>
             </div>
        </div>
    );
};

export default Featured;