import './App.css';
import RegisterLogin from "./pages/finalworkpages/RegisterLogin";
import ProfilePage from "./pages/finalworkpages/ProfilePage";
import Messages from "./pages/finalworkpages/Messages";
import MessagesNotSelected from "./pages/finalworkpages/MessagesNotSelected";
import UserPosts from "./pages/finalworkpages/UserPosts";
import AllUsers from "./pages/finalworkpages/AllUsers";
import {BrowserRouter, Route, Routes} from "react-router-dom"

import {useSelector, useDispatch} from "react-redux";
import {setPosts, setUser} from "./features/user";


import React, {useEffect, useState} from "react";
import IndexPage from "./pages/finalworkpages/IndexPage";

function App() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user)
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const posts = useSelector(state => state.user.posts)


    useEffect(() => {
        const auto = localStorage.getItem("autologin")

        if (auto === "true") {

            const options = {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    authorization: localStorage.getItem("token")
                }
            }

            fetch("http://localhost:8000/autologin", options)
                .then(res => res.json())
                .then(data => {
                    if (!data.error) {
                        dispatch(setUser(data.data))
                    }
                })
        }

    }, [])



    //// CATCH WHEN COMPONENT DESTROYED
    useEffect(() => {
        return () => {
            localStorage.setItem("token", "")
        };
    }, []);

    //// CATCH WHEN BROWSER TAB WAS CLOSED (OR BROWSER)
    window.addEventListener("beforeunload", (ev) => {
        ev.preventDefault();
        return localStorage.setItem("token", "")
    });

    useEffect(() => {
        fetch(`http://localhost:8000/getPosts`)
            .then(res => res.json())
            .then(data => {
                dispatch(setPosts(data.data));
            });
    }, [posts])

    return (

       <div>
<BrowserRouter>


    <Routes>
            <Route path="/" element={<IndexPage/>}/>

                <Route path="/:username/profile" element={<ProfilePage user={user}/>}/>
                <Route path="/messages" element={<MessagesNotSelected user={user} users={users} setUsers={setUsers} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>}/>
                <Route path="/messages/with/:selecteduser" element={<Messages user={user} users={users} setUsers={setUsers} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>}/>
                <Route path="/posts" element={<UserPosts user={user} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>}/>
                <Route path="/user-list" element={<AllUsers user={user} users={users} setUsers={setUsers} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>}/>

                <Route path="/reg-log" element={<RegisterLogin/>}/>

    </Routes>

</BrowserRouter>

        </div>
    )

}

export default App;
