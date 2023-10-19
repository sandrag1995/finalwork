import React from 'react';
import UserRegistration from "../../components/finalworkcomps/reglog/UserRegistration";
import UserLogin from "../../components/finalworkcomps/reglog/UserLogin";

const RegisterLogin = () => {
    return (
        <div className="reg-log d-flex flex-wrap justify-center align-items-center gap-20">
            <UserRegistration/>
            <UserLogin/>
        </div>
    );
};

export default RegisterLogin;