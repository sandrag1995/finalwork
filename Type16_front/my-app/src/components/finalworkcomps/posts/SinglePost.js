import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faComment, faThumbsUp} from "@fortawesome/free-regular-svg-icons";

const SinglePost = ({post, openModal}) => {

    return (
        <div className="single-post p-10 m-10" >
            <img src={post.image} alt="" onClick={() => openModal(post)}/>
            <p><b>Title: </b> {post.title}</p>
            <p><b><FontAwesomeIcon icon={faThumbsUp} style={{color: "#a0f9a3", fontSize: "20px"}}/></b>: {post.likes.length} <b><FontAwesomeIcon icon={faComment} style={{color: "indianred", fontSize: "20px"}}/>:</b> {post.comments.length}</p>
        </div>
    );
};

export default SinglePost;