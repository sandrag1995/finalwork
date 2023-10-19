import React from 'react';
import { useNavigate } from 'react-router-dom';
import WriteMessageButton from "../messages/WriteMessageButton";
const SingleUser = ({user, onSelectUser}) => {
    const navigate = useNavigate();

    const handleWriteMessage = () => {
        if (onSelectUser) {
            onSelectUser();
        }
        navigate(`/messages/with/${user.username}`);
    };

    if(!user){
        return(
            <div></div>
        )
    }

    return (
        <div className="single-user-card d-flex m-10 p-10 justify-center align-items-center">
            <img src={user.image} alt=""/>
            <div>
                <p><b>Username: </b>{user.username}</p>
                <WriteMessageButton handleWriteMessage={handleWriteMessage}/>
            </div>
        </div>
    );
};

export default SingleUser;