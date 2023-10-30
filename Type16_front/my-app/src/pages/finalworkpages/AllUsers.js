import React, {useEffect, useState} from 'react';

import Toolbar from "../../components/finalworkcomps/Toolbar";
import SingleUser from "../../components/finalworkcomps/SingleUser/SingleUser";
import ErrorPage from "./ErrorPage";
import Spinner from "../../components/finalworkcomps/Spinner";

const AllUsers = ({user, users, setUsers, setSelectedUser}) => {

    const [isLoading, setIsLoading] = useState(true)

    const fetchAllUsers = async () =>{
        setIsLoading(true)

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
                setIsLoading(false)
            });


    }

    useEffect(() => {


        fetchAllUsers()
// eslint-disable-next-line
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

            {!isLoading ?  <div className="all-users d-flex flex-wrap">
                {users.map((user, i) => (
                    <SingleUser key={i} user={user} onSelectUser={() => selectUser(user)}/>
                ))}
            </div> : <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <h1 style={{color: "white"}}>Users are still loading...</h1>
                    <Spinner/>
            </div>}

        </div>
    );
};

export default AllUsers;