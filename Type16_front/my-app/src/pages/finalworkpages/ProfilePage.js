import React, {useRef, useState, useEffect} from 'react';
import ErrorPage from "./ErrorPage";
import Toolbar from "../../components/finalworkcomps/Toolbar";
import Spinner from "../../components/finalworkcomps/Spinner";

import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../features/user";

const ProfilePage = () => {

    const imageRef = useRef()
    const pass1Ref = useRef()

    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const [visibleForm, setVisibleForm] = useState(false)
    const [imgError, setImgError] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    async function openForm(){
        setVisibleForm(true)
    }

    async function closeForm(){
        setVisibleForm(false)
        setImgError("")
        setErrorMsg("")
    }

    async function updatePic(){
        const image = imageRef.current.value

        if (image.length === 0) return setImgError("Don't leave empty fields!")

        const userItem = {
            username: user.username,
            image: image,
            id: user.id,
        }

        const options = {
            method: "POST",
            headers: {
                "content-type":"application/json",
                authorization: localStorage.getItem("token")
            },
            body: JSON.stringify(userItem)
        }

        const res = await fetch("http://localhost:8000/updateImage", options)
        const data = await res.json()

        if(data.error) return console.log(data.message)
        setImgError("")

        dispatch(setUser(data.data))
    }

    async function changePassword(){
        const password = pass1Ref.current.value

        if (password.length === 0) return setErrorMsg("Don't leave empty fields!")
        if (password.search(/[0-9]/) < 0) return setErrorMsg("password should contain at least one digit!")
        if (password.search(/[A-Z]/) < 0) return setErrorMsg("password should contain at least one uppercase letter!")

        const userItem = {
            username: user.username,
            password: password,
            id: user.id,
        }

        const options = {
            method: "POST",
            headers: {
                "content-type":"application/json",
                authorization: localStorage.getItem("token")
            },
            body: JSON.stringify(userItem)
        }

        const res = await fetch(`http://localhost:8000/updatePassword`, options)
        const data = await res.json()

        if(data.error) return setErrorMsg(data.message)

        dispatch(setUser(data.data))
        setErrorMsg(`Password was changed successfully!`)
    }

    if(!user){
        return (
            <div>
<ErrorPage/>
            </div>
        )
    }

    return (
        <div>
            <Toolbar user={user}/>
            {isLoading? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                    <Spinner />
                </div>

            ) : (
                <>

                    <div className="d-flex flex-wrap m-10 gap-20 profile-settings">

                        <div className="user-profile p-10">
                            <img src={user.image} alt=""/>
                            <p><b>Username</b>: {user.username}</p>
                        </div>

                        <div className="update-profile">
                            {visibleForm && <div className="form">

                                <div className="d-flex flex-end">
                                    <button onClick={closeForm}>Close</button>
                                </div>
                                <div className="m-10 update">
                                    <input type="text" placeholder="Insert new image url" ref={imageRef}/><label>{imgError}</label><br/>
                                    <button onClick={updatePic}>Save image</button>
                                </div>
                                <div className="m-10 update">
                                    <input type="text" placeholder="Enter new password" ref={pass1Ref}/><label>{errorMsg}</label><br/>
                                    <button onClick={changePassword}>Save password</button>
                                </div>

                            </div>}
                            <button className="update-profile-button" onClick={openForm}>Update profile</button>


                        </div>

                    </div>
                </>
            )}



        </div>
    );
};

export default ProfilePage;