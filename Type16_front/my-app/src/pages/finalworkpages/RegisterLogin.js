import React, {useState, useEffect} from 'react';
import UserRegistration from "../../components/finalworkcomps/reglog/UserRegistration";
import UserLogin from "../../components/finalworkcomps/reglog/UserLogin";
import Spinner from "../../components/finalworkcomps/Spinner";
const RegisterLogin = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="reg-log d-flex flex-wrap justify-center align-items-center gap-20">
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <UserRegistration />
                    <UserLogin />
                </>
            )}
        </div>
    );
};

export default RegisterLogin;