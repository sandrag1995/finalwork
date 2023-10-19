import React, {useEffect} from 'react';

import Toolbar from "../../components/finalworkcomps/Toolbar";
import SingleUser from "../../components/finalworkcomps/SingleUser/SingleUser";
import ErrorPage from "./ErrorPage";


const AllUsers = ({user, users, setUsers, selectedUser, setSelectedUser}) => {


    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: localStorage.getItem("token"),
            },
        };

        fetch("http://localhost:8000/getAllUsers", options)
            .then((res) => res.json())
            .then((data) => {
                if (!data.error) {
                    if(user){
                        const filteredUsers = data.data.filter((u) => u._id !== user.id);
                        setUsers(filteredUsers);
                    }

                }
            });
    }, [user]);

    function selectUser(user) {
            setSelectedUser(user);
    }


    if (!user){
        return (
            <div><ErrorPage/></div>
        );
    }


    return (
        <div>
            <Toolbar user={user}/>
            <div className="all-users d-flex flex-wrap">
                {users.map((user, i) => (
                    <SingleUser key={i} user={user} onSelectUser={() => selectUser(user)}/>
                ))}
            </div>
        </div>
    );
};

export default AllUsers;