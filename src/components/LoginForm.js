import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { useState } from "react";

const LoginForm = () => {
    const [authErrors, setAuthErrors] = useState("");
    const navigate = useNavigate();

    const schema = Yup.object({
        email: Yup.string().email().required("Email is Required"),
        password: Yup.string().required("Password is Required"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (data) => {
        const users = JSON.parse(localStorage.getItem("users"));
        const checkedEmail = users?.find(
            (user) =>
                user.email === data.email && user.password === data.password
        );
        if (checkedEmail !== undefined) {
            localStorage.setItem("loggedinUser", JSON.stringify(checkedEmail));
            navigate("/profile")
        } else {
            setAuthErrors("Invalid user Credientials");
        }
    };

    return (
        <form className="loginContainer" onSubmit={handleSubmit(onSubmit)}>
            <div className="loginformContainer">
                <p className="invalid-user">{authErrors}</p>
                <h1>Sign In</h1>
                <div className="email">
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        {...register("email")}
                    ></input>
                    <p className="errors">{errors?.email?.message}</p>
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
                <button className="signin-btn" type="submit">Sign In</button>
                <p>
                    Don't have an account?<Link to="/Signup">Signup</Link>
                </p>
            </div>
        </form>
    );
};
export default LoginForm;
