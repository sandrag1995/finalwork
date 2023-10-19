import React, {useState} from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars} from "@fortawesome/free-solid-svg-icons";




const Toolbar = () => {
    const [user, setUser] = useState(useSelector(state => state.user.user))
    const [visibleForm, setVisibleForm] = useState(false)
    const navigate = useNavigate()
    const location = useLocation();
    function toPostsPage(){
        navigate("/posts")
    }

    function toUserProfile(){
        navigate(`/${user.username}/profile`)
    }

    function toAllUsers(){
        navigate('/user-list')
    }

    function toMessages(){
        navigate(`/messages`)
    }

    function logout(){
        setUser(null)
        localStorage.removeItem("token");
        localStorage.removeItem("autologin")
        navigate("/reg-log");
    }

    async function openForm(){
        setVisibleForm(true)
    }

    async function closeForm(){
        setVisibleForm(false)
    }

    if(!user){
        return (
            <div></div>
        )
    }


    return (
        <div className="toolbar d-flex gap-10 p-10 justify-between align-items-center">
                <div className="d-flex">
                    <img src={user.image} alt=""/>
                    <p>Hello, {user.username}</p>
                </div>
            <div className="d-flex gap-10">
                <button onClick={toUserProfile} className={location.pathname === `/${user.username}/profile` ? "active-button" : ""}>{user.username}'s Profile Page</button>
                <button onClick={toMessages} className={location.pathname === '/messages' ? "active-button" : ""}>Direct Messages</button>
                <button onClick={toPostsPage} className={location.pathname === '/posts' ? "active-button" : ""}>To Posts Page</button>
                <button onClick={toAllUsers} className={location.pathname === '/user-list' ? "active-button" : ""}>Users</button>
            </div>

            <div className="ham-button" onClick={openForm}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            {visibleForm && <div className="dropdown-menu">
                <div className="d-flex flex-end">
                    <button className="close-button" onClick={closeForm}>x</button>
                </div>
                <button onClick={toUserProfile}>{user.username}'s Profile Page</button><br/>
                <button onClick={toMessages}>Direct Messages</button><br/>
                <button onClick={toPostsPage}>To Posts Page</button><br/>
                <button onClick={toAllUsers}>Users</button>
            </div>}

            <div className="logout-button">
                <button onClick={logout}>Logout</button>
            </div>

        </div>
    );
};

export default Toolbar;