import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader'
const SmallSpinner = () => {
    return (
        <div style={{ width: '100px', margin: 'auto', display: 'block' }}>
            <ClipLoader color="#a0f9a3" size={100}/>
        </div>
    );
};

export default SmallSpinner;