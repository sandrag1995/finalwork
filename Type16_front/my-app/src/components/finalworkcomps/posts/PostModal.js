import React, {useState, useEffect} from 'react';
import WriteMessageButton from "../messages/WriteMessageButton";
import { useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import { setPosts} from '../../../features/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faThumbsUp, faThumbsDown} from "@fortawesome/free-regular-svg-icons";
const PostModal = ({ post, closeModal, user}) => {

    const dispatch = useDispatch();

    const [commentValue, setCommentValue] = useState("")
    const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(post.likes.includes(user.username));
    const navigate = useNavigate();
    const [likesCount, setLikesCount] = useState(post.likes.length);

    const [comments, setComments] = useState(post.comments);


    const likePost = async () =>{
        if (!user.username) {
            console.error('User username is undefined');
            return;
        }

        const response = await fetch(`http://localhost:8000/like/${post._id}/${user.username}`);
        const data = await response.json();

        if (!data.error) {

            setIsLikedByCurrentUser(!isLikedByCurrentUser);
            setLikesCount((prevLikesCount) => isLikedByCurrentUser ? prevLikesCount - 1 : prevLikesCount + 1);
            dispatch(setPosts(data.data));

        } else {
            console.error('Failed to like/unlike the post');
        }

    }

    const comment = async () =>{


        if (!commentValue) return console.error('Comment text is empty');

        const newComment = {
            text: commentValue,
            postId: post._id,
            postedBy: user.username,
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem("token")
            },
            body: JSON.stringify(newComment),
        };

        const response = await fetch(`http://localhost:8000/comment`, options);
        const data = await response.json();

        if (!data.error) {
            setComments([...comments, newComment]);
            dispatch(setPosts(data.data));

        } else {
            console.log('Failed to add comment');
        }
        setCommentValue("")
    }

    useEffect(() => {
        setComments(post.comments);
    }, [post.comments]);



    const postDate = new Date(post.timestamp);

    const formattedDate = postDate.toLocaleDateString('lt-LT', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Europe/Vilnius',
    });

    const isCurrentUserAuthor = user.username === post.username;
    const handleWriteMessage = () => {
        navigate(`/messages/with/${post.username}`);
    };

    const handleCommentChange = (e) =>{
        const{value} = e.target
        setCommentValue(value)
    }


    return (
        <div className="modal">
                <div className="d-flex flex-end m-10">
                    <button onClick={closeModal}>Close Post</button>
                </div>

                <div className="sections d-flex flex-wrap">

                    <div className="section-1 flex-1">
                        <p>Date was published: {formattedDate}</p>
                        <div className="modal-content d-flex flex-wrap">
                            <img src={post.image} alt={post.title} />
                            <div className="post-info">
                                <h2>{post.title}</h2>
                                <div className="user-card">
                                    <p>Post owner:</p>
                                    <div className="d-flex">
                                        <img src={user.image} alt="" />
                                        <p>{post.username}</p>
                                    </div>
                                    {!isCurrentUserAuthor && (<WriteMessageButton handleWriteMessage={handleWriteMessage}/>)}
                                </div>

                                <p>Likes: {likesCount}</p>

                                <button onClick={likePost}>
                                    {isLikedByCurrentUser ? "Unlike " : "Like "}
                                    <FontAwesomeIcon icon={isLikedByCurrentUser ? faThumbsDown : faThumbsUp} style={{color: isLikedByCurrentUser ? "red" : "blue", fontSize: "20px",}}/>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="section-2 flex-1">
                        <p>Comments: {comments.length}</p>
                            <div className="comment-inputs d-flex flex-column">
                                <textarea placeholder="Leave a comment" onChange={handleCommentChange}/>
                                {commentValue && <button onClick={comment} className="comment-btn">Comment</button>}
                            </div>
                                {comments.length > 0 ? (
                                    <div className="comments">
                                        {comments.map((comment, i) => (
                                            <div className="comment p-10" key={i}>
                                                <span style={{fontWeight: "700"}}>{comment.postedBy}: </span><span className="comment-text">{comment.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="comments">No comments yet...</div>
                                )}
                    </div>

                </div>





        </div>
    );
};

export default PostModal;