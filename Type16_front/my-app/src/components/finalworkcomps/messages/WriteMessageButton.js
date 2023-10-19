import React from 'react';

const WriteMessageButton = ({handleWriteMessage}) => {
    return (
        <>
            <button onClick={handleWriteMessage}>Write a message</button>
        </>
    );
};

export default WriteMessageButton;