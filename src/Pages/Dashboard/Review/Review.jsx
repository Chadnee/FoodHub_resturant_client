import React from 'react';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProviders';
import ReactStars from "react-rating-stars-component";
import useCart from '../../../hooks/useCart';
import Swal from 'sweetalert2';

const Review = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
     
    const ratingChanged = (newRating) => {
        return newRating;
    };
   
    console.log(ratingChanged);

    const onSubmit = data => {
        const { favouriteDish, suggestion, details } = data;
        
        const reviewAdded = { name: user.displayName, favouriteDish, suggestion, details, rating: ratingChanged }
        console.log(reviewAdded);
        axiosSecure.post('/reviewAdded', reviewAdded)
            .then(res => {
                console.log(res.data)
                if(res.data.insertedId){
                    reset()
                    Swal.fire({
                        icon: "success",
                        title: "Thanks for providing a precious review",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            })
    }


    return (
        <div className='h-full w-full my-7 md:px-16 px-7'>
            <SectionTitle subHeading="Give a review" heading="short Review"></SectionTitle>
            <div className='text[30px] text-center flex flex-col items-center mb-7'>
            <ReactStars
            className =""
               count={5}
                onChange={ratingChanged}
                size={60}
                activeColor="#ffd700"
            />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-[#E8E8E8] rounded-lg'>
                <div className="form-control mx-10 pt-7 ">
                    <label className="label">
                        <span className="label-text text-slate-600 font-bold">Which is your favourite dish?</span>
                    </label>
                    <input type="text" {...register("favouriteDish", { required: true })} placeholder="Food you liked most" className="input input-bordered w-full " />
                </div>
                <div className="form-control mx-10 pt-7 ">
                    <label className="label">
                        <span className="label-text text-slate-600 font-bold ">Do you have any suggestion for us?</span>
                    </label>
                    <input type="text" {...register("suggestion", { required: true })} placeholder=" valuable suggestion shortly" className="input input-bordered w-full " />
                </div>
                <div className="form-control mx-10 pt-7 ">
                    <label className="label">
                        <span className="label-text text-slate-600 font-bold">Kindly express your feelings in a short way</span>
                    </label>
                    <input type="text" {...register("details", { required: true })} placeholder="Review details" className="input input-bordered h-24 w-full " />
                </div>
                <div className="label-text mx-10 font-bold">
                    <input className='bg-amber-800 text-white rounded-lg py-2 px-7 my-10' type="submit" value="Send review" />
                </div>
            </form>
        </div>
    );
};

export default Review;