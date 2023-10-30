import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronUp, faChevronDown} from "@fortawesome/free-solid-svg-icons";

const FilterBar = ({openForm, likesAsc, likesDesc, commentsAsc, commentsDesc, dateAsc, dateDesc}) => {

    const [isCommentsAscVisible, setCommentsAscVisible] = useState(true);
    const [isCommentsDescVisible, setCommentsDescVisible] = useState(false);

    const [isLikesAscVisible, setLikesAscVisible] = useState(true);
    const [isLikesDescVisible, setLikesDescVisible] = useState(false);

    const [isDateAscVisible, setDateAscVisible] = useState(true);
    const [isDateDescVisible, setDateDescVisible] = useState(false);


    const handleClickComments = (filterType) => {
        if (filterType === 'asc') {
            setCommentsAscVisible(!isCommentsAscVisible);
            setCommentsDescVisible(isCommentsAscVisible);
            commentsAsc();
        } else if (filterType === 'desc') {
            setCommentsDescVisible(!isCommentsDescVisible);
            setCommentsAscVisible(isCommentsDescVisible);
            commentsDesc();
        }
    };

    const handleClickLikes = (filterType) =>{
        if (filterType === 'asc') {
            setLikesAscVisible(!isLikesAscVisible);
            setLikesDescVisible(isLikesAscVisible);
            likesAsc();
        } else if (filterType === 'desc') {
            setLikesDescVisible(!isLikesDescVisible);
            setLikesAscVisible(isLikesDescVisible);
            likesDesc();
        }
    }

    const handleClickDate = (filterType) =>{
        if (filterType === 'asc') {
            setDateAscVisible(!isDateAscVisible);
            setDateDescVisible(isDateAscVisible);
            dateAsc();
        } else if (filterType === 'desc') {
            setDateDescVisible(!isDateDescVisible);
            setDateAscVisible(isDateDescVisible);
            dateDesc();
        }
    }


    return (

        <div className="filter-bar d-flex m-10">
            <p>Sort by: </p>
            <div className="d-flex gap-10 filter-buttons">

                        <div className="d-flex flex-column justify-center align-items-center">
                            {isCommentsAscVisible && (
                                <div className="d-flex flex-column justify-center align-items-center">
                                    <button onClick={() => handleClickComments('asc')}>Comments <FontAwesomeIcon icon={faChevronUp} /></button>
                                </div>
                            )}

                            {isCommentsDescVisible && (
                                <div className="d-flex flex-column justify-center align-items-center">
                                    <button onClick={() => handleClickComments('desc')}>Comments <FontAwesomeIcon icon={faChevronDown} /></button>
                                </div>
                            )}
                        </div>


                        <div className="d-flex flex-column justify-center align-items-center">
                            {isLikesAscVisible && (<div className="d-flex justify-center align-items-center">
                                <button onClick={() => handleClickLikes('asc')}>Likes <FontAwesomeIcon icon={faChevronUp}/></button>
                            </div>)}

                            {isLikesDescVisible && (<div className="d-flex justify-center align-items-center">
                                <button onClick={() => handleClickLikes('desc')}>Likes <FontAwesomeIcon icon={faChevronDown}/></button>
                            </div>)}
                        </div>


                        <div className="d-flex flex-column justify-center align-items-center">
                            {isDateAscVisible && (<div className="d-flex justify-center align-items-center">
                                <button onClick={() => handleClickDate('asc')}>Time <FontAwesomeIcon icon={faChevronUp}/></button>
                            </div>)}

                            {isDateDescVisible && (<div className="d-flex justify-center align-items-center">
                                <button onClick={() => handleClickDate('desc')}>Time <FontAwesomeIcon icon={faChevronDown}/></button>
                            </div>)}
                        </div>

            </div>
            <button className="create-button" onClick={openForm}>Create post</button>
        </div>

    );
};

export default FilterBar;