import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from "react-router-dom";

import Toolbar from "../../components/finalworkcomps/Toolbar";
import SinglePerson from "../../components/finalworkcomps/messages/SinglePerson";
import ErrorPage from "./ErrorPage";
import SmallSpinner from "../../components/finalworkcomps/SmallSpinner";

import {useDispatch, useSelector} from "react-redux";
import {setMessages} from "../../features/user";
const MessagesNotSelected = ({user, users, setUsers, setSelectedUser}) => {

    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()
    const messages = useSelector(state => state.user.messages)
    const dispatch = useDispatch()
    const location = useLocation();
    const selectedUsername = location.pathname.split('/').pop();

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
                        const filteredUsers = data.data.filter((u) => u._id !== user.id && hasMessageHistory(u.username));
                        setUsers(filteredUsers);
                    }
                    setIsLoading(false);
                }
            });

    }, [user, messages]);

    const hasMessageHistory = (username) => {
        return messages.some((message) =>
            (message.to === username && message.from === user.username) ||
            (message.from === username && message.to === user.username)
        );
    };

    useEffect(() =>{
        const options = {
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: localStorage.getItem("token"),
            },
        };
        fetch(`http://localhost:8000/getMessages`, options)
            .then(res => res.json())
            .then(data => {
                dispatch(setMessages(data.data));
                setIsLoading(false);
            });
    }, [messages])


    useEffect(() => {
        const foundUser = users.find((u) => u.username === selectedUsername);
        if (foundUser) {
            setSelectedUser(foundUser);
        }
    }, [selectedUsername, users, setSelectedUser]);



    function selectUser(user) {
        setSelectedUser(user);
        navigate(`/messages/with/${user.username}`)

    }



    if (!user){
        return (
            <div><ErrorPage/></div>
        );
    }

    return (
        <div>
            <Toolbar />
            <div className="messaging d-flex">
                <div>
                    <h2 style={{ color: "white", textAlign: "center" }}>Contacts</h2>
                    <div className="available-users flex-1">
                        {isLoading ? (<SmallSpinner/>
                        ) : (
                            users.map((user) => (<SinglePerson key={user._id} user={user} onSelectUser={() => selectUser(user)} />))
                        )}
                    </div>
                </div>

                <div className="message-field flex-4">
                    <h2>Please select any person from your contacts to message them</h2>
                    <div className="d-flex justify-center">
                        <div className="messages p-10">
                            <div>No messages to display</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessagesNotSelected;