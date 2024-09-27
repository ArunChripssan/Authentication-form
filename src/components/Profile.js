import React, { useEffect } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("loggedinUser"));

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user]);

    return (
        <div className="container">
            <div className="logoutbtn-container">
                <button className="logout-btn" onClick={() => navigate("/")}>
                    Logout
                </button>
            </div>
            <div className="profile">
                <h2>Profile</h2>
                <p>
                    UserName : {user?.firstname} {user?.lastname}
                </p>
                <p>Email : {user?.email}</p>
            </div>
        </div>
    );
};

export default Profile;
