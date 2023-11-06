import React, {useEffect, useState, useRef} from 'react';
import {useNavigate, useLocation} from "react-router-dom";

import Toolbar from "../../components/finalworkcomps/Toolbar";
import SinglePerson from "../../components/finalworkcomps/messages/SinglePerson";
import ErrorPage from "./ErrorPage";
import SmallSpinner from "../../components/finalworkcomps/SmallSpinner";

import {useSelector, useDispatch} from "react-redux";
import {setMessages} from "../../features/user";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperPlane} from "@fortawesome/free-regular-svg-icons";

const Messages = ({user, users, setUsers, selectedUser, setSelectedUser}) => {

    const [isLoading, setIsLoading] = useState(true)
    const [messageValue, setMessageValue]  = useState("")

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
                    setIsLoading(false);
                }
            });

    }, [location.pathname]);

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

    async function sendMessage(){

        const messageText = messageRef.current.value;

        if (!messageText) {
            return;
        }

        const newMessage = {
            text: messageText,
            to: selectedUser.username,
            from: user.username,
            timestamp: Date.now(),
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
    }

    const handleMessageText = (e) => {
        const { value } = e.target;
        setMessageValue(value);
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
                        {users.map((user) => (<SinglePerson key={user._id} user={user} onSelectUser={() => selectUser(user)} />))}
                    </div>
                </div>

                <div className="message-field flex-4">
                    <h2>Your conversation history with: {selectedUser ? selectedUser.username : 'No user selected'}</h2>
                    <div className="d-flex justify-center">
                        {isLoading ? (<SmallSpinner />
                        ) : (
                            <div className="messages p-10">
                                {selectedUser && messages ? messages.filter((message) =>
                                        (message.to === selectedUser.username && message.from === user.username) || (message.from === selectedUser.username && message.to === user.username)
                                    ).map((message, index) => (
                                        <div className={`single-message ${message.from === user.username ? "user-message" : "selected-user-message"}`} key={index}>
                                            <p>{message.text}</p>
                                            <p className="message-timestamp">
                                                {new Date(message.timestamp).toLocaleString('lt-LT', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    ))
                                    : <div>No messages to display</div>
                                }
                            </div>
                        )}
                    </div>

                    {selectedUser ? (
                        <div className="message-inputs d-flex justify-center">
                            <textarea placeholder="enter your message" ref={messageRef} onChange={handleMessageText}/>
                            {messageValue && <button onClick={sendMessage}>Send <FontAwesomeIcon icon={faPaperPlane} /></button>}
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