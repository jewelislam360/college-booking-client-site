import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";


const Login = () => {
    const signIn =useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate =useNavigate();
    const location =useLocation();

    const from =location.state?.from?.pathname || '/';

    const onSubmit = data => {
        signIn(data.email, data.password)
        .then(result =>{
            const loggeduser =result.user;
            console.log(loggeduser);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Successfully Login',
                showConfirmButton: false,
                timer: 1500
              });
              navigate(from, {from: location});
        })
        console.log(data)
    };

   
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col ">
                    <div className="text-center ">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" {...register("email", { required: true })} className="input input-bordered" />
                                {errors.Email && <span className="text-warning">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" {...register("password", { required: true })} className="input input-bordered" />
                                {errors.password && <span className="text-warning">This field is required</span>}
                                
                            </div>
                            
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Login" />
                                
                            </div>
                            <p>Do not have an account? <Link className='text-warning font-bold' to="/register">Sign up</Link> </p>

                        </form>
                        
                    </div>
                    
                </div>
            </div>

        </div>
    );
};

export default Login;