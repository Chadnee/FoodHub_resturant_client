import React, { useEffect, useRef, useState } from 'react';
import loginImg from "../../assets/images/login.jpg"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import SocialLogin from '../../Shared/SocialLogin';

const Login = () => {


  const {signedIn} = useContext(AuthContext)
  const captchaRef = useRef(null)
  
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/" ;

    const handleLogin = event => {
      
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log({email, password})
        
        signedIn(email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          event.target.reset();
          navigate(from , {replace:true})

        })
        .catch(error => {
          console.log(error.message)
        })
    }

    useEffect(() => {
      loadCaptchaEnginge(6); 
    },[])

    const handleValidateCaptcha = () => {
          const userCaptchaValue = captchaRef.current.value
          if(validateCaptcha(userCaptchaValue)){
          setDisabled(false);
        }
        else{
          setDisabled(true)
        }
      }
    return (
        <div className=''>
           <div className="hero bg-green-500 min-h-screen ">
  <div className="hero-content flex-col lg:flex-row px-24  mx-24 lg:justify-center lg:gap-24 items-center">
    <div className="text-center lg:text-left">
      <img src="https://img.freepik.com/free-vector/green-background-chef-character-with-objects-ingredients_23-2147637817.jpg?t=st=1693595306~exp=1693595906~hmac=4eccfde023d9b4366309b1452921d830277afe8efbae87bee27adc091ee08bbd" alt="" />
    </div>
    <div className="card  flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleLogin} className="card-body rounded-xl bg-emerald-600">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name = "email" placeholder="email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required/>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control">
          <label className="label">
          <LoadCanvasTemplate />
          </label>
          <input type="text" onBlur={handleValidateCaptcha} ref={captchaRef} name="captcha" placeholder="type the text above" className="input input-bordered" required/>
          
        </div>
        <div className="form-control mt-4">
          <input type="submit" disabled = {disabled} className = "btn bg-emerald-800 border-0" value="Login" required/>
        </div>
        <SocialLogin></SocialLogin>
         <div className='text-[12px] mb-10 mt-3 font-[italic]'><p>Haven't no account? Please <Link to = '/register' className='text-white link link-hover'>Register</Link></p></div>
      </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default Login;