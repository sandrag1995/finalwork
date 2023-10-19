import React, {useState, useRef} from 'react';


const UserRegistration = () => {

    const usernameRef = useRef()
    const pass1Ref = useRef()
    const pass2Ref = useRef()

    const [errorMsg, setErrorMsg] = useState("")
    const [msg, setMsg] = useState()
    async function registerUser(){

        const username = usernameRef.current.value
        const pass1 = pass1Ref.current.value
        const pass2 = pass2Ref.current.value

        if (username === "" || pass1 === "" || pass2 === "") return setErrorMsg("You cannot leave empty fields!")
        if(pass1 !== pass2) return setErrorMsg("Passwords don't match!")
        if (username.length > 20) return setErrorMsg("Username is too long!")
        if (username.length < 4) return setErrorMsg("Username is too short!")
        if (pass1.length > 20) return setErrorMsg("Password is too long!")
        if (pass1.length < 4) return setErrorMsg("Password is too short!")



        const user = {
            username: username,
            password: pass1,
        }

        const options = {
            method: "POST",
            headers: {
                "content-type":"application/json",
            },
            body: JSON.stringify(user)
        }

        const res = await fetch("http://localhost:8000/register", options)
        const data = await res.json()

        if(!data.error){
            setErrorMsg("")
            setMsg("Registration success!")
        } else {
            setErrorMsg(data.message)
        }

        usernameRef.current.value = ""
        pass1Ref.current.value = ""
        pass2Ref.current.value = ""

    }

    return (
        <div className="register-form p-10">
            <h1>Register <span>(if you are a new user, please register)</span></h1>
            <input type="text" placeholder="Username" ref={usernameRef} maxLength={25}/><label> : Enter username</label><br/>
            <input type="password" placeholder="Password" ref={pass1Ref} maxLength={25}/><label> : Enter password</label><br/>
            <input type="password" placeholder="Repeat the password" ref={pass2Ref} maxLength={25}/><label> : Repeat password</label><br/>
            {errorMsg? <p style={{color: "red"}}>{errorMsg}</p> :
                <p style={{color: "green"}}>{msg}</p>
            }
            <button onClick={registerUser}>Register</button>
        </div>
    );
};

export default UserRegistration;