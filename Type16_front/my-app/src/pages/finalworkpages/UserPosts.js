import React, {useEffect, useRef, useState} from 'react';
import {setPosts} from "../../features/user";
import {useDispatch, useSelector} from "react-redux";

import Toolbar from "../../components/finalworkcomps/Toolbar";
import SinglePost from "../../components/finalworkcomps/posts/SinglePost";
import FilterBar from "../../components/finalworkcomps/posts/FilterBar";
import PostModal from "../../components/finalworkcomps/posts/PostModal";
import Spinner from "../../components/finalworkcomps/Spinner";
const UserPosts = ({user, selectedUser}) => {
    const posts = useSelector(state => state.user.posts)
    const titleRef = useRef()
    const imageRef = useRef()
    const dispatch = useDispatch()
    const [sortedPosts, setSortedPosts] = useState(posts);
    const [visibleForm, setVisibleForm] = useState(false)
    const [selectedPost, setSelectedPost] = useState(null);
    const [errorMsg, setErrorMsg] = useState("")

    const [isLoading, setIsLoading] = useState(true)
    const [currentFilter, setCurrentFilter] = useState('default');
    const getAllPosts = async () => {
        const options = {
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: localStorage.getItem("token"),
            },
        };


            const res = await fetch(`http://localhost:8000/getPosts`, options);
            const data = await res.json();
            dispatch(setPosts(data.data));
            setSortedPosts(data.data);
            setIsLoading(false);

    };

    useEffect(() => {
        getAllPosts();
        // eslint-disable-next-line
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

    const makePost = async () => {
        const title = titleRef.current.value
        const image = imageRef.current.value
        if(title === "" || image === "") return setErrorMsg("You can't leave empty fields!")

        const newPost = {
            title: title,
            image: image,
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

    function filterPosts(posts, filterType) {
        switch (filterType) {
            case 'likesAsc':
                return posts.slice().sort((a, b) => a.likes.length - b.likes.length);
            case 'likesDesc':
                return posts.slice().sort((a, b) => b.likes.length - a.likes.length);
            case 'commentsAsc':
                return posts.slice().sort((a, b) => a.comments.length - b.comments.length);
            case 'commentsDesc':
                return posts.slice().sort((a, b) => b.comments.length - a.comments.length);
            case 'dateAsc':
                return posts.slice().sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
            case 'dateDesc':
                return posts.slice().sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
            default:
                return posts;
        }
    }

    const applyFilter = (filterType) => {
        setCurrentFilter(filterType);
        const filteredPosts = filterPosts(posts, filterType);
        setSortedPosts(filteredPosts);
    };

    if(!user){

        return (
            <div>
                <div className="message-container p-10">
                    <p>You are not logged in. Please <a href="/reg-log">log in</a> or <a href="/reg-log">register</a> to like, comment or filter posts.</p>
                </div>
                <div>
                    <div className="d-flex flex-wrap post-page">
                                    {posts.map((x, i) => (<SinglePost key={i} post={x}/>))}
                    </div>
                </div>

            </div>
        )
    }

    return (


        <div>
            <Toolbar user={user}/>

                <FilterBar
                    openForm={openForm}
                    likesAsc={() => applyFilter('likesAsc')}
                    likesDesc={() => applyFilter('likesDesc')}
                    commentsAsc={() => applyFilter('commentsAsc')}
                    commentsDesc={() => applyFilter('commentsDesc')}
                    dateAsc={() => applyFilter('dateAsc')}
                    dateDesc={() => applyFilter('dateDesc')}
                />
                {!isLoading? <div>
            {visibleForm && <div className="make-post-form p-10">
                <div className="d-flex flex-end">
                    <button className="close-button" onClick={closeForm}>Close</button>
                </div>
                <input type="text" placeholder="enter post title" ref={titleRef}/><br/>
                <input type="text" placeholder="enter image url" ref={imageRef}/><br/>
                <button className="make-button" onClick={makePost}>Make a post!</button>
                <p>{errorMsg}</p>
            </div>}
                <div>
                            {sortedPosts? (
                                    <div className="d-flex flex-wrap post-page">
                                        {sortedPosts.map((x, i) => (<SinglePost key={i} post={x} openModal={openModal} />))}
                                    </div>

                            ):(
                                <div className="d-flex flex-wrap post-page">
                                    {posts.map((x, i) => (<SinglePost key={i} post={x} openModal={openModal}/>))}
                                </div>
                            )}
                </div>
            {selectedPost && (
                <PostModal post={selectedPost} closeModal={closeModal} user={user} selectedUser={selectedUser} setSelectedUser={setSelectedPost}/>
            )}
            </div>
                :
                <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                    <h1 style={{color: "white"}}>Posts are still loading...</h1>
                    <Spinner/>
                </div>}

        </div>

    );

};



export default UserPosts;