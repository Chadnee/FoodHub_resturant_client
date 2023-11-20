import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SocialLogin from "../../Shared/SocialLogin";


const Register = () => {
    const { createUser, verifiedEmail, userProfileUpdate } = useContext(AuthContext)
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()

    const navigate = useNavigate()

    const onSubmit = (data) => {
        console.log(data)
        if(data.password !== data.confirmPassword){
            alert("password doesn't match")
            return
        }
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                userProfileUpdate(data.name)
                .then(() => {
                    const saveUser = {name: data.name, email: data.email }
                    fetch('https://food-hub-server-pi.vercel.app/users', {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(saveUser)
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId){
                            console.log("User has been updated")
                    reset();
                    Swal.fire({
                       icon: 'success',
                        title: 'User successfully added',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      navigate("/")
                        }
                    })
                    
                })
                
            })
            .catch(error => {
                console.log(error.message)
            })

    }

    //const [error, setError] = useState("")

    //const handleSignUp = event => {
    //    event.preventDefault()
    //    const form = event.target;
    //    const email = form.email.value;
    //    const password = form.password.value;
    //    const confirmPassword = form.confirmPassword.value;
    //    console.log({ email, password })
//
    //    if (password !== confirmPassword) {
    //        setError("The Password doesn't match please try again later");
    //        return;
    //    }
//
    //    createUser(email, password)
    //        .then(result => {
    //            const user = result.user;
    //            console.log(user);
    //            event.target.reset()
    //        })
    //        .catch(error => {
    //            console.log(error.message)
    //        })
//
    //    verifiedEmail()
    //        .then(result => {
    //            console.log(result.user)
    //            alert("Please verify your email and log in")
    //        })
    //        .catch(error => console.log(error.message))
    //}

    return (
        <div className='w-full h-full'>
            <div className="hero min-h-screen ">
                <div className="hero-content flex-col bg-gray-300 lg:flex-row-reverse lg:justify-center lg:gap-24 items-center">
                    <div className="text-center lg:text-left">
                        <img src="https://img.freepik.com/free-vector/green-background-chef-character-with-objects-ingredients_23-2147637817.jpg?t=st=1693595306~exp=1693595906~hmac=4eccfde023d9b4366309b1452921d830277afe8efbae87bee27adc091ee08bbd" alt="" />
                    </div>
                    <div className="card  flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body rounded-xl bg-emerald-600">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="Provide your name" className="input input-bordered" />
                                {errors.name && <span className="text-amber-800 text-[12px] font-bold">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="Provide your email address" className="input input-bordered" />
                                {errors.email && <span className="text-amber-800 text-[12px] font-bold">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password",
                                    { required: true, minLength: 6, pattern: /^(?=.*\d)(?=.*[A-Z])$/ }
                                )} name="password" placeholder="Provide a strong password" className="input input-bordered" />
                                {errors.password?.type === "required" && <p className="text-amber-800 text-[12px] font-bold">This field is required</p>}
                                {errors.password?.type === "minLength" && <p className="text-amber-800 text-[12px] font-bold">Password must be at least six characters</p>}
                                {errors.password?.type === "pattern" && <p className="text-amber-800 text-[12px] font-bold">Password must be one digit and one uppercase</p>}
                                
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" {...register("confirmPassword", { required: true })} name="confirmPassword" placeholder="Re-Enter the password" className="input input-bordered" />
                                {errors.confirmPassword && <span className="text-amber-800 text-[12px] font-bold">This field is required</span>}
                            </div>
                            
                            <div className="form-control mt-4">
                                <input type="submit" className="btn bg-emerald-800 border-0" value="Register" />
                            </div>
                            <SocialLogin></SocialLogin>
                            <div className='text-[12px] text-center mb-10 mt-3 font-[italic]'><p>Already have an account? Please <Link to='/login' className='text-white link link-hover'>Login</Link></p></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;