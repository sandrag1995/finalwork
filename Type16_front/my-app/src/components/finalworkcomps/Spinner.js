import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader'
const Spinner = () => {
    return (
        <div style={{ width: '100px', margin: 'auto', display: 'block' }}>
            <ClipLoader color="#a0f9a3" size={200}/>
        </div>
    );
};

export default Spinner;