import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "./SignupForm.css";

const SignupForm = () => {
    const navigate = useNavigate();
    const [isUserExistError, setisUserExistError] = useState("");

    const onSubmit = (data) => {
        const usersdetails = JSON.parse(
            localStorage.getItem("users")
        );
        console.log(usersdetails);
        
        const isUserExist = usersdetails?.find(
            (user) => user.email === data.email
        );

        if (!isUserExist) {
            let users = undefined;
            if (usersdetails != null) {
                users = [...usersdetails, data];
            } else {
                users = [data];
            }
            localStorage.setItem("users", JSON.stringify(users));
            navigate("/")
        } else {
            setisUserExistError("Email already exists")            
        }
    };

    const schema = Yup.object({
        firstname: Yup.string().required(),
        lastname: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string()
            .required("Password is required")
            .min(4, "Password should be minimum 4 characters")
            .matches(/[0-9]/, "Password should contain atleast one number")
            .matches(/[A-Z]/, "Password should contain atleast one  ")
            .matches(/[a-z]/, "Password should contain atleast one Lowercase"),
        confirmPassword: Yup.string()
            .required("Confirm Password is Requierd")
            .oneOf(
                [Yup.ref("password")],
                "Confirm Password and Password should match"
            ),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <form className="signupcontainer" onSubmit={handleSubmit(onSubmit)}>
            <div className="signupformContainer">
                <h1>Create Your Account</h1>
                <div className="fullname-container">
                    <div className="firstname">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstname"
                            {...register("firstname")}
                        ></input>
                        <p className="errors">{errors?.firstname?.message}</p>
                    </div>
                    <div className="lastname">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastname"
                            {...register("lastname")}
                        ></input>
                        <p className="errors">{errors?.lastname?.message}</p>
                    </div>
                </div>
                <div className="email">
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        {...register("email")}
                    ></input>
                    <p className="errors">
                        {errors?.email?.message || isUserExistError}
                    </p>
                </div>
                <div className="password">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        {...register("password")}
                    ></input>
                    <p className="errors">{errors?.password?.message}</p>
                </div>
                <div className="confirmPassword">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        {...register("confirmPassword")}
                    ></input>
                    <p className="errors">{errors?.confirmPassword?.message}</p>
                </div>
                <button className="signup-btn" type="submit">
                    Register
                </button>
                <p className="login-link">
                    Aready have an account <Link to="/">Login</Link>
                </p>
            </div>
        </form>
    );
};

export default SignupForm;
