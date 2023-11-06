import React, {useState, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setUser} from "../../../features/user";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
const UserLogin = () => {
    const usernameRef = useRef()
    const pass1Ref = useRef()
    const checkRef = useRef()

    const [usernameValue, setUsernameValue] = useState("")
    const [passValue, setPassValue] = useState("")

    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate()

    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    function autoLogin() {
        const auto = checkRef.current.checked;
        localStorage.setItem("autologin", auto);

        if (auto) {
            const token = localStorage.getItem("token");
                localStorage.setItem("token", token);
        }
    }

    async function loginUser(){
        const username = usernameRef.current.value
        const password = pass1Ref.current.value
        if (username === "" || password === "") return setErrorMsg("You cannot leave empty fields!")

        const user = {
            username: username,
            password: password,
        }

        const options = {
            method: "POST",
            headers: {
                "content-type":"application/json",
            },
            body: JSON.stringify(user)
        }

        const res = await fetch("http://localhost:8000/login", options)
        const data = await res.json()

        if(!data.error) {
            localStorage.setItem("token", data.data.token)
            dispatch(setUser(data.data))
            navigate(`/${user.username}/profile`)
        } else {
            setErrorMsg(data.message)
        }
    }

    const handleUsernameChange = (e) => {
        const { value } = e.target;
        setUsernameValue(value);
    }

    const handlePassChange = (e) =>{
        const {value} = e.target
        setPassValue(value)
    }

    return (
        <div className="login-form p-10">
            <h1>Login<br/>
                <span>(for existing users)</span></h1>
            <input type="text" placeholder="Enter username" ref={usernameRef} maxLength={25} onChange={handleUsernameChange}/>
            <label>
                {usernameValue && <FontAwesomeIcon icon={faCheckCircle} className="approved" style={{color: "green"}}/>}
            </label><br/>
            <input type="password" placeholder="Enter the password" ref={pass1Ref} maxLength={25} onChange={handlePassChange}/>
            <label>
                {passValue && <FontAwesomeIcon icon={faCheckCircle} className="approved" style={{color: "green"}}/>}
            </label><br/>
            <input type="checkbox" ref={checkRef} id="auto" onChange={autoLogin}/> <label>Remember me?</label>
            <p style={{color: "red"}}>{errorMsg}</p>
            {(usernameValue || passValue) && <button onClick={loginUser}>Login</button>}
        </div>
    );
};

export default UserLogin;