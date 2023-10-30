import './App.css';
import React, {useEffect, useState} from "react";
import IndexPage from "./pages/finalworkpages/IndexPage";
import RegisterLogin from "./pages/finalworkpages/RegisterLogin";
import ProfilePage from "./pages/finalworkpages/ProfilePage";
import Messages from "./pages/finalworkpages/Messages";
import MessagesNotSelected from "./pages/finalworkpages/MessagesNotSelected";
import UserPosts from "./pages/finalworkpages/UserPosts";
import AllUsers from "./pages/finalworkpages/AllUsers";

import {BrowserRouter, Route, Routes} from "react-router-dom"


import {useSelector, useDispatch} from "react-redux";
import { setUser} from "./features/user";

function App() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user)
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);


    useEffect(() => {
        const auto = localStorage.getItem("autologin")
        const token = localStorage.getItem("token");
        if (auto === "true" && token) {
            const options = {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    authorization: token
                }
            }


            fetch("http://localhost:8000/autologin", options)
                .then(res => res.json())
                .then(data => {
                    if (!data.error) {
                        localStorage.setItem("token", data.data.token);
                        dispatch(setUser(data.data))
                    }
                })
        }

    }, [dispatch])

    // CATCH WHEN BROWSER TAB WAS CLOSED (OR BROWSER)
    window.addEventListener("beforeunload", (ev) => {
        ev.preventDefault();
        return localStorage.setItem("token", "")
    });

    //// CATCH WHEN COMPONENT DESTROYED
    useEffect(() => {
        return () => {
            localStorage.setItem("token", "")
        };
    }, []);





    return (

        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<IndexPage/>}/>
                    <Route path="/reg-log" element={<RegisterLogin/>}/>
                    <Route path="/:username/profile" element={<ProfilePage/>}/>
                    <Route path="/messages" element={<MessagesNotSelected user={user} users={users} setUsers={setUsers} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>}/>
                    <Route path="/messages/with/:selecteduser" element={<Messages user={user} users={users} setUsers={setUsers} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>}/>
                    <Route path="/posts" element={<UserPosts user={user} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>}/>
                    <Route path="/user-list" element={<AllUsers user={user} users={users} setUsers={setUsers} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )

}

export default App;
