import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronUp, faChevronDown} from "@fortawesome/free-solid-svg-icons";

const FilterBar = ({openForm, likesAsc, likesDesc, commentsAsc, commentsDesc, dateAsc, dateDesc}) => {

    const [openFilter, setOpenFilter] = useState(null);

    const toggleFilterForm = (filterType) => {
        if (openFilter === filterType) {
            setOpenFilter(null);
        } else {
            setOpenFilter(filterType);
        }
    };

    const closeFilterForm = () => {
        setOpenFilter(null);
    };


    return (

        <div className="filter-bar d-flex m-10">
            <p>Sort by: </p>
            <div className="d-flex gap-10 filter-buttons">
                <button onClick={() => toggleFilterForm("comments")}>Comments</button>
                {openFilter === "comments" && (
                    <div className="comment-amount">
                        <div className="d-flex flex-end">
                            <button className="close-button" onClick={closeFilterForm}>x</button>
                        </div>
                        <div className="d-flex flex-column justify-center align-items-center">
                            <button onClick={commentsAsc}>Comments <FontAwesomeIcon icon={faChevronUp} /></button>
                            <button onClick={commentsDesc}>Comments <FontAwesomeIcon icon={faChevronDown} /></button>
                        </div>

                    </div>
                )}

                <button onClick={() => toggleFilterForm("likes")}>Likes</button>
                {openFilter === "likes" && (
                    <div className="like-amount">
                        <div className="d-flex flex-end">
                            <button className="close-button" onClick={closeFilterForm}>x</button>
                        </div>
                        <div className="d-flex flex-column justify-center align-items-center">
                            <button onClick={likesAsc}>Likes <FontAwesomeIcon icon={faChevronUp}/></button>
                            <button onClick={likesDesc}>Likes <FontAwesomeIcon icon={faChevronDown} /></button>
                        </div>

                    </div>
                )}

                <button onClick={() => toggleFilterForm("date")}>Date</button>
                {openFilter === "date" && (
                    <div className="time-amount">
                        <div className="d-flex flex-end">
                            <button className="close-button" onClick={closeFilterForm}>x</button>
                        </div>
                        <div className="d-flex flex-column justify-center align-items-center">
                            <button onClick={dateAsc}>Time <FontAwesomeIcon icon={faChevronUp}/></button>
                            <button onClick={dateDesc}>Time <FontAwesomeIcon icon={faChevronDown} /></button>
                        </div>

                    </div>
                )}
            </div>
            <button className="create-button" onClick={openForm}>Create post</button>
        </div>

    );
};

export default FilterBar;