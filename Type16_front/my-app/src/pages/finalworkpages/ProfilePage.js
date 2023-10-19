import React, {useRef, useState} from 'react';
import ErrorPage from "./ErrorPage";
import Toolbar from "../../components/finalworkcomps/Toolbar";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../features/user";

const ProfilePage = () => {

    const imageRef = useRef()
    const pass1Ref = useRef()

    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const [visibleForm, setVisibleForm] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    async function openForm(){
        setVisibleForm(true)
    }

    async function closeForm(){
        setVisibleForm(false)
        setErrorMsg("")
    }

    async function updatePic(){
        const image = imageRef.current.value

        if (image.length === 0) return setErrorMsg("Don't leave empty fields!")

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
        setErrorMsg(`Profile image was updated successfully!`)

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
            <div className="d-flex flex-wrap m-10 gap-20 profile-settings">

                <div className="user-profile p-10">
                    <img src={user.image} alt=""/>
                    <p><b>Username</b>: {user.username}</p>
                </div>

                <div className="update-profile">
                    {visibleForm && <div className="form">

                        <div className="d-flex flex-end">
                            <button className="close-button" onClick={closeForm}>x</button>
                        </div>
                        <div className="m-10">
                            <input type="text" placeholder="image url" ref={imageRef}/><label> Enter new image url</label><br/>
                            <button onClick={updatePic}>Save image</button>
                        </div>
                        <div className="m-10">
                            <input type="text" placeholder="new password" ref={pass1Ref}/><label> Enter new password</label><br/>
                            <button onClick={changePassword}>Save password</button>
                            <p style={{color: "red"}}> {errorMsg}</p>
                        </div>

                    </div>}
                    <button className="update-profile-button" onClick={openForm}>Update profile</button>


                </div>

            </div>

        </div>
    );
};

export default ProfilePage;