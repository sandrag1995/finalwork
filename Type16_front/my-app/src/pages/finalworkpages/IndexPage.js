import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IndexPage = () => {
    const navigate = useNavigate();
    const [hoveredText, setHoveredText] = useState('');
    const imageMap = {
        'M': 'https://pythondiaryblog.files.wordpress.com/2017/01/mongodb.png',
        'E': 'https://cdn.icon-icons.com/icons2/2699/PNG/512/expressjs_logo_icon_169185.png',
        'R': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png',
        'N': 'https://vistaran-tech.s3.ap-south-1.amazonaws.com/wp-content/uploads/2022/05/13104926/nodejs-logo.png',
    };

    function toRegLog() {
        navigate('/reg-log');
    }

    const handleSpanMouseEnter = (text) => {
        setHoveredText(text);
    };

    const handleSpanMouseLeave = () => {
        setHoveredText('');
    };

    return (
        <div className="index-page d-flex flex-column justify-center align-items-center" style={{ height: '100vh' }}>
            <img src={imageMap[hoveredText]} alt="" className="logo"/>
            <h1>My Final
                <span onMouseEnter={() => handleSpanMouseEnter('M')} onMouseLeave={handleSpanMouseLeave}> M</span>
                <span onMouseEnter={() => handleSpanMouseEnter('E')} onMouseLeave={handleSpanMouseLeave}>E</span>
                <span onMouseEnter={() => handleSpanMouseEnter('R')} onMouseLeave={handleSpanMouseLeave}>R</span>
                <span onMouseEnter={() => handleSpanMouseEnter('N')} onMouseLeave={handleSpanMouseLeave}>N </span>
                 Project Page</h1><br />
            <button onClick={toRegLog}>Enter the Page</button>
        </div>
    );
};

export default IndexPage;