import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";




const Register = () => {
    const createUser  =useContext(AuthContext);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    
    const navigate =useNavigate();
    const onSubmit = data =>{

        createUser(data.email, data.password)
        .then(result =>{
            const loggeduser =result.user;
            console.log(loggeduser);

            updateUserProfile(data.name, data.photoURL)
            .then(data=>{
                if(data.insertedId){
                    reset()
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Successfully Sign up',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      navigate('/')

                }
            })
                
                
            .catch(error=>console.log(error))
            
        })
        

        console.log(data)
    };
    return (
        <div>
            <div className="hero min-h-screen bg-base-200 mt-20 ">
                <div className="hero-content flex-col ">
                    <div className="text-center ">
                        <h1 className="text-5xl font-bold ">Register now!</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="taxt" placeholder="name" {...register("name", { required: true })} className="input input-bordered" />
                                {errors.name && <span className="text-warning">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" placeholder="photo URL" {...register("photoURL", { required: true })} className="input input-bordered" />
                                {errors.name && <span className="text-warning">Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" {...register("email", { required: true })} className="input input-bordered" />
                                {errors.email && <span className="text-warning">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                
                                  })} className="input input-bordered" />
                                {errors.password?.type === 'required' && <p className='text-warning'>password is required</p>}
                                {errors.password?.type === 'minLength' && <p className='text-warning'>password must be 6 character </p>}
                                {errors.password?.type === 'maxLength' && <p className='text-warning'>password must be less then 20 character</p>}
                                {errors.password?.type === 'pattern' && <p className='text-warning'>password must be One uppercase one lowercase one number & one special character </p>}
                               

                            </div>
                            {/* <div className="form-control">
                                <label className="label">
                                    <span className="label-text">confirm password</span>
                                </label>
                                <input type="text" placeholder="confirm password" {...register("password", { required: true })} className="input input-bordered" />
                                {errors.text && <span className="text-warning">Password is required</span>}

                            </div> */}

                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Register" />

                            </div>
                            <p>Already have an a account? <Link className='text-warning font-bold' to="/login">Login</Link> </p>

                        </form>
                        
                    </div>
                    
                </div>
            </div>
            
        </div>
    );
};

export default Register;