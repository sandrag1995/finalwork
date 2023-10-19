import React, {useEffect, useRef, useState} from 'react';
import {setPosts} from "../../features/user";
import {useDispatch, useSelector} from "react-redux";

import Toolbar from "../../components/finalworkcomps/Toolbar";
import SinglePost from "../../components/finalworkcomps/posts/SinglePost";
import FilterBar from "../../components/finalworkcomps/posts/FilterBar";
import PostModal from "../../components/finalworkcomps/posts/PostModal";
const UserPosts = ({user, selectedUser}) => {

    const titleRef = useRef()
    const imageRef = useRef()
    const posts = useSelector(state => state.user.posts)
    const dispatch = useDispatch()
    const [sortedPosts, setSortedPosts] = useState(posts);
    const [visibleForm, setVisibleForm] = useState(false)
    const [selectedPost, setSelectedPost] = useState(null);
    const [errorMsg, setErrorMsg] = useState("")



    useEffect(() => {
        setSortedPosts(posts);
    }, []);


    const openModal = (post) => {
        setSelectedPost(post);
    };

    const closeModal = () => {
        setSelectedPost(null);
    };
    async function openForm(){
        setVisibleForm(true)
    }

    async function closeForm(){
        setVisibleForm(false)
        setErrorMsg("")
    }

    async function makePost(){
        if(titleRef.current.value === "" || imageRef.current.value === "") return setErrorMsg("You can't leave empty fields!")

        const newPost = {
            title: titleRef.current.value,
            image: imageRef.current.value,
            likes: [],
            comments: [],
            timestamp: Date.now(),
            id: user.id
        }

        const options = {
            method: "POST",
            headers: {
                "content-type":"application/json",
                authorization: localStorage.getItem("token")
            },
            body: JSON.stringify(newPost)
        }

        const res = await fetch("http://localhost:8000/make-post", options)
        const data = await res.json()

        titleRef.current.value = "";
        imageRef.current.value = "";
        setErrorMsg("")

        dispatch(setPosts(data.data.post))

    }

    /////////Filters

    function filterLikesAsc() {
        const ascLikes = [...sortedPosts].sort((a, b) => a.likes.length - b.likes.length);
        setSortedPosts(ascLikes);
    }

    function filterLikesDesc() {
        const descLikes = [...sortedPosts].sort((a, b) => b.likes.length - a.likes.length);
        setSortedPosts(descLikes);
    }

    function filterCommentsAsc() {
        const ascComments = [...sortedPosts].sort((a, b) => a.comments.length - b.comments.length);
        setSortedPosts(ascComments);
    }

    function filterCommentsDesc() {
        const descComments = [...sortedPosts].sort((a, b) => b.comments.length - a.comments.length);
        setSortedPosts(descComments);
    }

    function filterDateAsc() {
        const ascDate = [...sortedPosts].sort((a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        setSortedPosts(ascDate);
    }

    function filterDateDesc() {
        const descDate = [...sortedPosts].sort((a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setSortedPosts(descDate);
    }

    if(!user){

        return (
            <div>
                <div className="message-container p-10">
                    <p>You are not logged in. Please <a href="/reg-log">log in</a> or <a href="/reg-log">register</a> to like, comment or filter posts.</p>
                </div>
                <div>

                    {posts.length > 0 ? (
                        <div>
                                <div className="d-flex flex-wrap post-page">
                                    {posts.map((x, i) => (<SinglePost key={i} post={x}/>))}
                                </div>
                        </div>
                    ) : (
                        <div><h1 style={{color: "white"}}>Loading posts...</h1></div>
                    )}
                </div>

            </div>
        )
    }

    return (


        <div>
            <Toolbar user={user}/>
            <FilterBar openForm={openForm} posts={posts}
                       likesAsc={filterLikesAsc} likesDesc={filterLikesDesc}
                       commentsAsc={filterCommentsAsc} commentsDesc={filterCommentsDesc}
                       dateAsc={filterDateAsc} dateDesc={filterDateDesc}/>

            {visibleForm && <div className="make-post-form p-10">
                <div className="d-flex flex-end">
                    <button className="close-button" onClick={closeForm}>x</button>
                </div>
                <input type="text" placeholder="enter post title" ref={titleRef}/><br/>
                <input type="text" placeholder="enter image url" ref={imageRef}/><br/>
                <button className="make-button" onClick={makePost}>Make a post!</button>
                <p>{errorMsg}</p>
            </div>}
                <div>
                    {posts? (
                        <div>
                            {!sortedPosts? (
                                <div className="d-flex flex-wrap post-page">
                                    {posts.map((x, i) => (<SinglePost key={i} post={x} openModal={openModal}/>))}
                                </div>
                            ):(
                                <div className="d-flex flex-wrap post-page">
                                    {sortedPosts.map((x, i) => (<SinglePost key={i} post={x} openModal={openModal} />))}
                                </div>
                            )}

                        </div>
                    ) : (
                        <div><h1 style={{color: "white"}}>Loading posts...</h1></div>
                    )}


                </div>
            {selectedPost && (
                <PostModal post={selectedPost} closeModal={closeModal} user={user} selectedUser={selectedUser} setSelectedUser={setSelectedPost}/>
            )}

        </div>

    );

};



export default UserPosts;