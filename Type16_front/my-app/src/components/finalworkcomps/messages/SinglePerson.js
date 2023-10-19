import React from 'react';

const SinglePerson = ({user, onSelectUser}) => {

    if(!user){
        return (
            <div></div>
        )
    }

    return (
        <div className="single-person d-flex m-10 p-10 justify-center align-items-center"  onClick={onSelectUser}>
            <img src={user.image} alt=""/>
            <div>
                <p><b>Username: </b>{user.username}</p>
            </div>
        </div>
    );
};

export default SinglePerson;