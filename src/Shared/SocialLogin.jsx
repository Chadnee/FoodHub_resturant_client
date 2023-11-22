import { useContext } from "react";
import { FaGofore } from "react-icons/fa";
import { AuthContext } from "../Providers/AuthProviders";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = () => {
    const { googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                const savedUser = {name: loggedUser.displayName, email: loggedUser.email}
                fetch("https://food-hub-server-pi.vercel.app/users", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(savedUser)
                })
                .then(res => res.json())
                .then(data => {
                    if(data.insertedId){
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'User successfully added',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                })
                navigate(from , {replace:true})
            })
            .catch(error =>
                console.log(error.message))

    }
    return (
        <div>
            <div className="divider"></div>

            <div className="text-center">
                <div onClick={handleGoogleLogin} className="btn bg-white text-black btn-circle text-[30px] btn-outline">
                    <FaGofore></FaGofore>
                </div>

            </div>
        </div>
    );
};

export default SocialLogin;