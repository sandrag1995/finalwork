import React, {useEffect, useState, useRef} from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import Toolbar from "../../components/finalworkcomps/Toolbar";
import SinglePerson from "../../components/finalworkcomps/messages/SinglePerson";
import ErrorPage from "./ErrorPage";
import {useSelector, useDispatch} from "react-redux";
import {setMessages} from "../../features/user";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperPlane} from "@fortawesome/free-regular-svg-icons";

const Messages = ({user, users, setUsers, selectedUser, setSelectedUser}) => {

    const [errorMsg, setErrorMsg] = useState("")

    const messageRef = useRef()
    const messages = useSelector(state => state.user.messages)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const location = useLocation();
    const selectedUsername = location.pathname.split('/').pop();


    useEffect(() => {

        if (!messages) {
            return;
        }

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
                    if (user){
                        const filteredUsers = data.data.filter((u) => u._id !== user.id && hasMessageHistory(u.username));
                        setUsers(filteredUsers);
                    }

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

    async function sendMessage(){

        const messageText = messageRef.current.value;

        if (!messageText) {
            setErrorMsg('Message must contain at least a single symbol!');
            return;
        }

        const newMessage = {
            text: messageText,
            to: selectedUser.username,
            from: user.username,
            id: user.id
        };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem("token")
                },
                body: JSON.stringify(newMessage),
            };

            const response = await fetch(`http://localhost:8000/message`, options);
            const data = await response.json();

            if(!data.error){
                dispatch(setMessages(data.data.message));
            }
                messageRef.current.value = '';
            setErrorMsg("")
    }


    if (!user){
        return (
            <div><ErrorPage/></div>
        );
    }

    return (
        <div>
            <Toolbar/>
            <div className="messaging d-flex">

                <div>
                    <h2 style={{color: "white", textAlign: "center"}}>Contacts</h2>
                    <div className="available-users flex-1">
                        {users.map((user) => (<SinglePerson key={user._id} user={user} onSelectUser={() => selectUser(user)}/>))}
                    </div>
                </div>

                <div className="message-field flex-4">
                    <h2>Your conversation history with: {selectedUser ? selectedUser.username : 'No user selected'}</h2>
                    <div className="d-flex justify-center">
                        <div className="messages p-10">

                            {selectedUser && messages ? messages.filter((message) =>
                                        (message.to === selectedUser.username && message.from === user.username) || (message.from === selectedUser.username && message.to === user.username)
                                    ).map((message, index) => (
                                        <div className={`single-message ${message.from === user.username ? "user-message" : "selected-user-message"}`} key={index}>
                                            <p>{message.text}</p>
                                        </div>
                                    ))
                                : <div>No messages to display</div>
                            }
                            <p style={{color: "red"}}><b>{errorMsg}</b></p>
                        </div>
                    </div>

                    {selectedUser? (
                        <div className="message-inputs d-flex justify-center">
                            <input type="text" placeholder="enter your message" ref={messageRef}/>
                            <button onClick={sendMessage}>Send <FontAwesomeIcon icon={faPaperPlane} /></button>
                        </div>
                    ) : (
                        <div></div>
                    )

                    }
                </div>
            </div>
        </div>
    );
};

export default Messages;