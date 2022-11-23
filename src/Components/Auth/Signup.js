import './Login.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from "react-hook-form";

const SignUpComponent = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const apiUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEX3xFQDVxcHD55udcGFLnYeVcpcSOEjU';
    const [saveMsg, setSaveMsg] = useState('');
    const onSubmit = (data) => {
            fetch(apiUrl, {
                method: 'POST',
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                    returnSecureToken: true,
                }),
                headers: {
                    'Content-Type': 'application/json',
                  },
            }

    ).then(async (res) => {
        if (res.ok) {
            setSaveMsg('User Saved Successfully');
            reset();
          return await res.json();
        } else {
          const data = await res.json();
          setSaveMsg(data.error.message);
        }
      })
    };
    const handleError = (errors) => { };

    const registerOptions = {
        firstName: { required: "First Name is required" },
        email: { required: "Email is required" },
        password: {
            required: "Password is required",
            minLength: {
                value: 8,
                message: "Password must have at least 8 characters"
            }
        }
    };

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit(onSubmit, handleError)}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign Up</h3>
                    <div className="text-center">
                        <Link className='link-primary' to={'/login'}>
                            Sign In
                        </Link>
                    </div>
                    <div className="form-group mt-3">
                        <label>First Name</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="First Name"
                            name="firstName" {...register('firstName', registerOptions.firstName)}
                        />
                        <small className="text-danger">
                            {errors?.firstName && errors.firstName.message}
                        </small>
                    </div>
                    <div className="form-group mt-3">
                        <label>Email Id</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Id"
                            name="email"
                            {...register('email', registerOptions.email)}
                        />
                        <small className="text-danger">
                            {errors?.email && errors.email.message}
                        </small>
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                            name="password"
                            {...register('password', registerOptions.password)}
                        />
                        <small className="text-danger">
                            {errors?.password && errors.password.message}
                        </small>
                    </div>
                    <small className="text-danger">
                            {saveMsg}
                            <br />
                    </small>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-1">Submit</button>
                            &nbsp;
                            <button type="button" onClick={() => reset()} className="btn btn-secondary">Reset</button>
                        </div>
                </div>
            </form>
        </div>
    );
};

export default SignUpComponent;