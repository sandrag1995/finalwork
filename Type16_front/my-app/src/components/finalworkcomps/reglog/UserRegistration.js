import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const UserRegistration = () => {
    const usernameRef = useRef();
    const pass1Ref = useRef();
    const pass2Ref = useRef();

    const [usernameValue, setUsernameValue] = useState('');
    const [passValue, setPassValue] = useState("")
    const [pass2Value, setPass2Value] = useState("")

    const [errorMsg, setErrorMsg] = useState('');
    const [msg, setMsg] = useState('');

    async function registerUser() {
        const username = usernameRef.current.value;
        const pass1 = pass1Ref.current.value;
        const pass2 = pass2Ref.current.value;

        if (username === '' || pass1 === '' || pass2 === '') return setErrorMsg('You cannot leave empty fields!');
        if (pass1 !== pass2) return setErrorMsg("Passwords don't match!");
        if (username.length > 20) return setErrorMsg('Username is too long!');
        if (username.length < 4) return setErrorMsg('Username is too short!');
        if (pass1.length > 20) return setErrorMsg('Password is too long!');
        if (pass1.length < 4) return setErrorMsg('Password is too short!');

        const user = {
            username: username,
            password: pass1,
        };

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        };

        const res = await fetch('http://localhost:8000/register', options);
        const data = await res.json();

        if (!data.error) {
            setErrorMsg('');
            setMsg('Registration success!');
            usernameRef.current.value = '';
            pass1Ref.current.value = '';
            pass2Ref.current.value = '';
        } else {
            setErrorMsg(data.message);
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

    const handlePass2Change = (e) =>{
        const {value} = e.target
        setPass2Value(value)
    }


    const isUsernameValid = usernameValue.length >= 4 && usernameValue.length <= 20;
    const isPassValid = passValue.length >= 4 && passValue.length <= 20 && /(?=.*\d)(?=.*[A-Z])/.test(passValue)
    const isPassMatch = passValue === pass2Value

    const usernameErrorText = () =>{
        if (!usernameValue) {
            return '';
        }
        if (usernameValue.length < 4) {
            return 'Username is too short!';
        }
        if (usernameValue.length > 20) {
            return 'Username is too long';
        }
        return '';
    }

    const passwordErrorText = () => {
        switch (true) {
            case !passValue:
                return '';
            case passValue.length < 4:
                return 'Password is too short';
            case passValue.length > 20:
                return 'Password is too long';
            case !/(?=.*\d)/.test(passValue):
                return 'Password must contain one digit';
            case !/(?=.*[A-Z])/.test(passValue):
                return 'Password must contain one uppercase letter';
            default:
                return '';
        }
    };


    const pass2ErrorText = () =>{
      switch(true){
          case !pass2Value:
              return '';
          case pass2Value !== passValue:
              return 'Passwords do not match!';
          default:
              return '';
      }
    }


    return (
        <div className="register-form p-10">
            <h1>
                Register<br/>
                <span>(if you are a new user, please register)</span>
            </h1>
            <input type="text" placeholder="Enter username" ref={usernameRef} maxLength={25} onChange={handleUsernameChange} />
            <label style={{ color: isUsernameValid ? 'green' : 'red' }}>
                {usernameValue ? (isUsernameValid ? <FontAwesomeIcon icon={faCheckCircle} className="approved"/> : usernameErrorText()) : ''}
            </label>
            <br />
            <input type="password" placeholder="Enter the password" ref={pass1Ref} maxLength={25} onChange={handlePassChange}/>
            <label style={{fontSize: "12px", color: isPassValid ? 'green' : 'red' }}>
                {passValue ? (isPassValid ? <FontAwesomeIcon icon={faCheckCircle} className="approved"/> : passwordErrorText()) : ''}
            </label>
            <br />
            <input type="password" placeholder="Repeat the password" ref={pass2Ref} maxLength={25} onChange={handlePass2Change}/>
            <label style={{fontSize: "12px", color: isPassMatch? 'green' : 'red'}}>
                {pass2Value ? (isPassMatch ? <FontAwesomeIcon icon={faCheckCircle} className="approved"/> :  pass2ErrorText()) : ''}
            </label>
            <br />
            {errorMsg ? (
                <p style={{ color: 'red' }}>{errorMsg}</p>
            ) : (
                <p style={{ color: 'green' }}>{msg}</p>
            )}
            <button onClick={registerUser}>Register</button>
        </div>
    );
};

export default UserRegistration;